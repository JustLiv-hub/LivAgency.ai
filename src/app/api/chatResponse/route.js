import { OpenAI } from 'openai';
import { getScenarioById } from '@/lib/scenarios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { scenarioId, chatterInput, messageHistory, fanPersona } = await req.json();

    if (!scenarioId || !chatterInput || !messageHistory) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const scenario = getScenarioById(scenarioId);
    if (!scenario) {
      return new Response(JSON.stringify({ error: 'Invalid scenario ID' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const historyString = messageHistory
      .map((m) => `${m.sender === 'chatter' ? 'Chatter' : 'Fan'}: ${m.text}`)
      .join('\n');

    const prompt = `
You are roleplaying as a ${fanPersona}.
You're flirty, skeptical, and resistant to spending — but convincible with the right charm.
Keep messages natural, short (1–2 lines), seductive, and grammatically sound.

Scenario Context: ${scenarioId}
Conversation so far:
${historyString}
Chatter: ${chatterInput}
Fan:
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are simulating a resistant fan in an adult chatroom training simulator.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.85,
      max_tokens: 120,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return new Response(JSON.stringify({ error: 'No reply generated' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('🔥 chatResponse error:', err);
    return new Response(JSON.stringify({ error: 'Chat AI failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
