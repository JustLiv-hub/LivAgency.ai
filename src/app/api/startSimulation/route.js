import scenarios from '@/lib/scenarios';

export async function GET() {
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

  return new Response(JSON.stringify({ scenario }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
