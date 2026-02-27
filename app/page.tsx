"use client";

import { useState, useEffect } from "react";

export default function Game() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // --- GAME STATE ---
  const [day, setDay] = useState(1);
  const [energy, setEnergy] = useState(3);
  const [codeQuality, setCodeQuality] = useState(0);
  const [sanity, setSanity] = useState(100);
  const [caffeine, setCaffeine] = useState(0);
  const [similarity, setSimilarity] = useState(0);

  const [logs, setLogs] = useState([
    "> Dr. Keno expects a flawless build.",
    "> Final Project Assigned.",
    "> System Initialized."
  ]);

  const [isGameOver, setIsGameOver] = useState(false);
  const [endMessage, setEndMessage] = useState("");

  const addLog = (message: string) => {
    setLogs((prevLogs) => [message, ...prevLogs].slice(0, 6)); 
  };

  useEffect(() => {
    if (similarity > 30) {
      setIsGameOver(true);
      setEndMessage("SYSTEM ALERT: Turnitin report flagged massive similarities. Dr. Keno summoned you to his office. Instant Failure.");
    } else if (sanity <= 0) {
      setIsGameOver(true);
      setEndMessage("Burnout achieved. You stared at a missing semicolon for 6 hours and lost your mind.");
    } else if (day > 14) {
      setIsGameOver(true);
      if (codeQuality >= 150) {
        setEndMessage(`Victory! You submitted a stellar project. Dr. Keno gave you an A.`);
      } else {
        setEndMessage("Deadline passed. Your code barely compiled. Prepare for the retake.");
      }
    }
  }, [sanity, day, codeQuality, similarity]);

  // --- LOGIC: Action Functions ---
  const writeCode = () => {
    if (energy > 0) {
      new Audio('/keyboard.mp3').play();
      const newSanity = sanity - 15;
      if (newSanity <= 30 && newSanity > 0) new Audio('/alert.mp3').play();

      setEnergy(energy - 1);
      setCodeQuality(codeQuality + 15);
      setSanity(newSanity);
      addLog("> Wrote boilerplate. Steady progress, but tedious.");
    }
  };

  const debugCode = () => {
    if (energy > 0) {
      new Audio('/keyboard.mp3').play();
      setEnergy(energy - 1);
      
      const success = Math.random() > 0.4; 
      if (success) {
        setCodeQuality(codeQuality + 30);
        addLog("> SUCCESS: Squashed a massive bug! Code feels cleaner.");
      } else {
        const newSanity = sanity - 30;
        if (newSanity <= 30 && newSanity > 0) new Audio('/alert.mp3').play();

        setSanity(newSanity);
        addLog("> ERROR: Fixed one bug, created three more. Sanity plummets.");
      }
    }
  };

  const promptAI = () => {
    new Audio('/keyboard.mp3').play(); 
    setCodeQuality(codeQuality + 40);
    const riskSpike = Math.floor(Math.random() * 6) + 10; 
    const newSimilarity = similarity + riskSpike;
    
    if (newSimilarity >= 25 && newSimilarity <= 30) new Audio('/alert.mp3').play();

    setSimilarity(newSimilarity);
    addLog(`> Used ChatGPT. Code works flawlessly. Similarity spiked by ${riskSpike}%.`);
  };

  const drinkCoffee = () => {
    if (caffeine < 3) {
      new Audio('/sip.mp3').play();
      const newSanity = sanity - 10;
      if (newSanity <= 30 && newSanity > 0) new Audio('/alert.mp3').play();

      setEnergy(energy + 2);
      setCaffeine(caffeine + 1);
      setSanity(newSanity);
      addLog("> Chugged espresso. I can hear colors.");
    }
  };

  const sleep = () => {
    new Audio('/snore.mp3').play();
    setDay(day + 1);
    setEnergy(3);
    setSanity(100);
    setCaffeine(0);
    if (similarity > 0) setSimilarity(Math.max(0, similarity - 5)); 
    addLog(`> Day ${day} concluded. Passed out. Edited some AI code while half-asleep.`);
  };

  const restartGame = () => {
    setDay(1); setEnergy(3); setCodeQuality(0); setSanity(100); setCaffeine(0); setSimilarity(0);
    setIsGameOver(false);
    setLogs(["> System Initialized.", "> Ready to try again."]);
  };

  // --- RENDER ---
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono">
        
        {/* Main Start Screen Content */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-5xl font-bold text-blue-500 mb-8 tracking-widest drop-shadow-lg">CS SURVIVAL SIM</h1>
          <p className="text-slate-400 mb-12 max-w-md text-center">Manage your energy. Write clean code. Do not lose your sanity.</p>
          <button 
            onClick={() => setHasStarted(true)}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105 border border-blue-400"
          >
            INITIALIZE SYSTEM
          </button>
        </div>

        {/* NEW: Start Screen Footer */}
        <div className="pb-8 flex flex-col items-center space-y-3 opacity-60 hover:opacity-100 transition-opacity">
          <p className="text-slate-500 text-sm tracking-wide">Made by Francis Enakeno</p>
          <div className="flex items-center justify-center text-slate-500 text-xs">
            <span>Road to</span>
            {/* Logo size increased to h-10 */}
            <img src="/tc-logo.png" alt="Team Chaos Logo" className="h-20 ml-3" />
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-mono flex flex-col items-center relative">
      
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-lg max-w-lg shadow-2xl relative w-full">
            <h2 className="text-2xl font-bold text-blue-400 mb-4 border-b border-slate-700 pb-2">How to Survive</h2>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p><strong className="text-white">The Goal:</strong> Survive 14 days and reach at least <strong className="text-green-400">150 Code Quality</strong> before the final deadline to pass.</p>
              <p><strong className="text-purple-400">Sanity:</strong> Writing and debugging drains your mind. If this hits 0%, you burn out and fail immediately.</p>
              <p><strong className="text-red-400">Turnitin (Similarity):</strong> Using ChatGPT gives massive code boosts for zero energy, but if your similarity score exceeds 30%, Dr. Keno will expel you. Sleep to slightly reduce this score.</p>
              <p><strong className="text-orange-400">Energy:</strong> You have 3 actions per day. Sleep to reset, or chug coffee for temporary energy (at the cost of your sanity).</p>
            </div>
            <button 
              onClick={() => setShowHelp(false)}
              className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded transition-colors"
            >
              Resume Grind
            </button>
          </div>
        </div>
      )}

      <audio src="/bgm.mp3" autoPlay loop className="hidden" />

      <div className="w-full max-w-5xl flex flex-col flex-grow">
        <header className="flex flex-col md:flex-row justify-between items-center border-b border-slate-700 pb-4 mb-8 gap-4">
          
          <div className="flex items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-400 flex items-center gap-3">
                Day {day} / 14
              </h1>
              <p className="text-slate-400 mt-1">Energy: <span className="text-white font-bold">{energy}</span></p>
            </div>
            <button 
              onClick={() => setShowHelp(true)}
              className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all shadow-lg"
              title="How to play"
            >
              i
            </button>
          </div>
          
          <div className="flex gap-4 text-sm bg-slate-900 p-4 rounded-lg border border-slate-800 shadow-md">
            <div className="flex flex-col items-center w-24">
              <span className="text-slate-400 uppercase tracking-wider text-xs mb-1">Code Quality</span>
              <span className="text-2xl font-bold text-green-400">{codeQuality}</span>
            </div>
            <div className="flex flex-col items-center w-24">
              <span className="text-slate-400 uppercase tracking-wider text-xs mb-1">Sanity</span>
              <span className={`text-2xl font-bold ${sanity <= 30 ? 'text-red-500 animate-pulse' : 'text-purple-400'}`}>
                {sanity}%
              </span>
            </div>
            <div className="flex flex-col items-center w-24">
              <span className="text-slate-400 uppercase tracking-wider text-xs mb-1">Similarity</span>
              <span className={`text-2xl font-bold ${similarity >= 25 ? 'text-red-500 animate-pulse' : similarity >= 15 ? 'text-yellow-400' : 'text-slate-300'}`}>
                {similarity}%
              </span>
            </div>
          </div>
        </header>

        {isGameOver ? (
          <div className="bg-slate-900 border border-slate-700 p-12 rounded-lg text-center shadow-2xl mt-12">
            <h2 className="text-4xl font-bold mb-6 text-white">SYSTEM HALTED</h2>
            <p className="text-xl text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">{endMessage}</p>
            <p className="text-2xl font-bold text-green-400 mb-12">Final Code Quality: {codeQuality}</p>
            <button 
              onClick={restartGame}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-lg transition-transform hover:scale-105"
            >
              Initialize New Run
            </button>
          </div>
        ) : (
          <main className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            
            <div className="border border-slate-800 p-6 rounded-lg bg-slate-900 shadow-xl">
              <h2 className="text-xl mb-4 border-b border-slate-700 pb-2 font-semibold">Daily Actions</h2>
              <div className="space-y-3 flex flex-col">
                
                <button 
                  onClick={writeCode}
                  disabled={energy <= 0}
                  className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors disabled:opacity-50 flex justify-between items-center group"
                >
                  <span className="font-semibold group-hover:text-green-400">💻 Write Boilerplate</span>
                  <span className="text-xs text-slate-400">(-1 NRG, -15% Sanity, +15 Code)</span>
                </button>

                <button 
                  onClick={debugCode}
                  disabled={energy <= 0}
                  className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-purple-900/50 rounded transition-colors disabled:opacity-50 flex justify-between items-center group relative overflow-hidden"
                >
                  <span className="font-semibold group-hover:text-purple-400 relative z-10">🐛 Debug Code (Risky!)</span>
                  <span className="text-xs text-slate-400 relative z-10">(-1 NRG, High Reward or -30% Sanity)</span>
                </button>

                <button 
                  onClick={promptAI}
                  className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-teal-900/50 rounded transition-colors flex justify-between items-center group"
                >
                  <span className="font-semibold group-hover:text-teal-400 text-teal-200">🤖 Prompt ChatGPT</span>
                  <span className="text-xs text-teal-400/70">(0 NRG, +40 Code, Raises Similarity!)</span>
                </button>

                <button 
                  onClick={drinkCoffee}
                  disabled={caffeine >= 3}
                  className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors disabled:opacity-50 flex justify-between items-center group"
                >
                  <span className="font-semibold group-hover:text-orange-400">☕ Chug Coffee</span>
                  <span className="text-xs text-slate-400">(+2 NRG, -10% Sanity)</span>
                </button>

                <button 
                  onClick={sleep}
                  className="w-full text-left px-4 py-3 bg-blue-900/50 hover:bg-blue-800/80 border border-blue-700 rounded transition-colors mt-6 flex justify-between items-center"
                >
                  <span className="font-semibold text-blue-200">🛌 End Day</span>
                  <span className="text-xs text-blue-300">(Reset NRG, -5% Similarity)</span>
                </button>

              </div>
            </div>

            <div className="border border-slate-800 p-6 rounded-lg bg-slate-900 shadow-xl flex flex-col">
              <h2 className="text-xl mb-4 border-b border-slate-700 pb-2 font-semibold">Terminal Log</h2>
              <div className="flex-1 text-sm space-y-2 overflow-hidden bg-slate-950 p-4 rounded border border-slate-800">
                {logs.map((log, index) => (
                  <p key={index} className={index === 0 ? "text-green-400 font-semibold" : "text-slate-600"}>
                    {log}
                  </p>
                ))}
                <p className="animate-pulse text-green-500 mt-2">{">"} _</p>
              </div>
            </div>

          </main>
        )}

        <footer className="mt-16 border-t border-slate-800 pt-8 pb-4 text-center space-y-4">
          <p className="text-slate-600 text-sm tracking-wide">Made by Francis Enakeno</p>
          <div className="flex items-center justify-center text-slate-500 text-xs">
            <span>Road to</span>
            {/* Logo size increased to h-10 */}
            <img src="/tc-logo.png" alt="Team Chaos Logo" className="h-20 ml-3 opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        </footer>

      </div>
    </div>
  );
}