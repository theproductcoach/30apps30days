"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const vibeLabels = ["Practical", "Creative", "Wild", "Crazy"];

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [appType, setAppType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");
  const [vibe, setVibe] = useState(1);

  const generateIdea = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vibe }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate idea");
      }

      const data = await response.json();

      let count = 0;
      const maxSpins = 10;

      const spin = () => {
        count++;
        if (count < maxSpins) {
          setAppType(
            data.type
              .split("")
              .sort(() => Math.random() - 0.5)
              .join("")
          );
          setPurpose(
            data.purpose
              .split(" ")
              .sort(() => Math.random() - 0.5)
              .join(" ")
          );
          setTimeout(spin, 100);
        } else {
          setAppType(data.type);
          setPurpose(data.purpose);
          setIsGenerating(false);
        }
      };

      spin();
    } catch (err) {
      setError("Failed to generate idea. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 gap-8">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
        Generate App Ideas
      </h1>

      <div className="w-full max-w-3xl flex flex-col items-center gap-4">
        <p className="text-white font-bold text-xl mb-2">{vibeLabels[vibe]}</p>
        <div className="w-full max-w-lg flex items-center gap-4 px-4">
          <input
            type="range"
            min="0"
            max="3"
            value={vibe}
            onChange={(e) => setVibe(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500 hover:accent-violet-400 transition-all"
            step="1"
          />
        </div>
        <div className="w-full max-w-lg flex justify-between px-4">
          {vibeLabels.map((label, index) => (
            <span
              key={label}
              className={`text-base font-medium ${
                index === vibe ? "text-violet-400" : "text-slate-400"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-8 shadow-inner border border-slate-700/50 max-w-3xl w-full">
        <div className="flex flex-col items-center gap-6 text-2xl md:text-4xl text-white text-center">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span>Create a</span>
            <motion.div
              key={appType}
              className="bg-slate-800 px-6 py-3 rounded-lg border border-violet-500/20 min-w-[200px]"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-violet-400 font-semibold">
                {appType || "\u00A0"}
              </span>
            </motion.div>
            <span>app</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span>that</span>
            <motion.div
              key={purpose}
              className="bg-slate-800 px-6 py-3 rounded-lg border border-violet-500/20 min-w-[400px]"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-violet-400 font-semibold">
                {purpose || "\u00A0"}
              </span>
            </motion.div>
          </div>
        </div>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      </div>

      <div className="mt-8">
        <button
          onClick={generateIdea}
          disabled={isGenerating}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-500 rounded-xl blur-sm opacity-70 group-hover:opacity-90 transition duration-200" />
          <div className="relative px-12 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl leading-none flex items-center">
            <span className="text-slate-100 font-semibold text-xl transition duration-200 group-hover:-translate-y-1">
              {isGenerating ? "Generating..." : "Generate"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
