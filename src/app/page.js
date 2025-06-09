'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [chatterId, setChatterId] = useState('');
  const router = useRouter();

  const startSimulation = () => {
    if (!chatterId.trim()) return alert('Please enter your Chatter ID');
    localStorage.setItem('chatterId', chatterId);
    router.push('/simulate');
  };

  return (
    <>
      <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
        If this is red, Tailwind is working ✅
      </div>
  
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4">💬 LivAgencyAI Simulator</h1>
        <p className="mb-6 text-lg text-center max-w-xl text-gray-300">
          Enter your Chatter ID to begin a live simulation session. Practice, respond, and get AI-powered feedback.
        </p>
  
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm">
          <input
            className="flex-grow px-4 py-2 rounded-md text-black w-full outline-none"
            type="text"
            value={chatterId}
            onChange={(e) => setChatterId(e.target.value)}
            placeholder="Enter your Chatter ID"
          />
          <button
            onClick={startSimulation}
            className="bg-purple-700 hover:bg-purple-600 px-6 py-2 rounded-md font-semibold shadow-md text-white whitespace-nowrap"
          >
            Start Simulation
          </button>
        </div>
      </div>
    </>
  );
}