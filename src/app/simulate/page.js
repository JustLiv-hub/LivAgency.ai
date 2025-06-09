'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function Simulator() {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const chatterId = typeof window !== 'undefined' ? localStorage.getItem('chatterId') : null;

  useEffect(() => {
    fetch('/api/startSimulation')
      .then(res => res.json())
      .then(data => {
        console.log('📦 Scenario loaded:', data); // optional debug log
        if (data && data.scenario) {
          setScenario(data.scenario);
          setMessages([{ sender: 'fan', text: data.scenario.fanIntro }]);
        } else {
          console.error('❌ Invalid scenario structure:', data);
        }
      });
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !scenario) return;

    const newMessages = [...messages, { sender: 'chatter', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chatResponse', {
      method: 'POST',
      body: JSON.stringify({
        scenarioId: scenario.id,
        fanPersona: scenario.fanPersona,
        chatterInput: input,
        messageHistory: newMessages
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    setMessages([...newMessages, { sender: 'fan', text: data.reply }]);
    setMessageCount(prev => prev + 1);
    setLoading(false);

    if (messageCount + 1 >= 6 && messageCount + 1 <= 10) {
      await fetch('/api/completeSession', {
        method: 'POST',
        body: JSON.stringify({
          chatterId,
          scenarioId: scenario.id,
          messages: [...newMessages, { sender: 'fan', text: data.reply }],
          completed: true
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      alert('✅ Scenario complete. Submitted to Admin.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">ChatCoach AI Simulator</h1>

      <div className="bg-gray-800 rounded-lg p-4 mb-4 h-[400px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'chatter' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
              msg.sender === 'chatter' ? 'bg-purple-600' : 'bg-gray-600'
            }`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-grow px-4 py-2 rounded-md text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Type your reply..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-md"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>

      {/* Action bar */}
      <div className="flex gap-4 mt-4 justify-start items-center text-sm text-white opacity-90">
      {/* Image */}
       <button title="Image Upload">
        <Image src="/icons/image-icon.png" alt="Image" width={24} height={24} />
        </button>

  {/* GIF */}
   <button title="Send GIF">
    <Image src="/icons/gif-icon.png" alt="GIF" width={24} height={24} />
  </button>

  {/* Microphone */}
  <button title="Send Voice">
    <Image src="/icons/mic-icon.png" alt="Mic" width={24} height={24} />
  </button>

  {/* Vault */}
  <button title="Vault">
    <Image src="/icons/vault-icon.png" alt="Vault" width={24} height={24} />
  </button>

  {/* Price */}
  <button title="Set Message Price">
    <Image src="/icons/price-icon.png" alt="Price" width={24} height={24} />
  </button>

  {/* Tag Creator */}
  <button title="Tag Other Creator">
    <Image src="/icons/tag-icon.png" alt="Tag" width={24} height={24} />
  </button>
</div>

    </div>
  );
}
