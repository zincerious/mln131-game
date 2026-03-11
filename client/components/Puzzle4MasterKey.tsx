import { useState } from "react";
import { motion } from "framer-motion";
import { validateAnswer } from "@/lib/antiCheat";
import { Lock, Unlock, KeyRound } from "lucide-react";

interface Puzzle4Props {
  evidence: {
    puzzle1?: string;
    puzzle2?: string;
    puzzle3?: string;
  };
  onSolve: (evidenceValue: string) => void;
  onError: () => void;
}

const Puzzle4MasterKey = ({ evidence, onSolve, onError }: Puzzle4Props) => {
  const [input, setInput] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAnswer("puzzle4", input)) {
      setIsSolved(true);
      onSolve(input);
    } else {
      setIsShaking(true);
      setAttempts(attempts + 1);
      onError();
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (isSolved) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="crt-frame p-8 border-terminal-amber/70 space-y-4"
      >
        <div className="text-center space-y-4">
          <KeyRound className="w-12 h-12 text-terminal-amber mx-auto animate-glow" />
          <h3 className="text-2xl font-bold terminal-amber-glow">
            MASTER KEY ACCEPTED
          </h3>
          <p className="text-terminal-green text-sm">
            All security protocols have been bypassed.
          </p>
        </div>

        <div className="bg-terminal-black border border-terminal-amber/30 p-4 space-y-2">
          <p className="text-terminal-amber font-mono text-center font-bold text-lg">
            {input}
          </p>
          <p className="text-terminal-green text-xs text-center">
            Code: Thủ tướng Chính phủ + 3 branches of power
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={`crt-frame p-8 space-y-6 border-terminal-amber/70 ${
        isShaking ? "animate-shake" : ""
      }`}
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <Lock className="w-8 h-8 text-terminal-amber mx-auto animate-pulse" />
        <h2 className="text-2xl font-bold terminal-amber-glow">THE MASTER KEY</h2>
        <p className="text-terminal-amber/60 text-sm">
          &gt; Puzzle 4: Slide 10 - Final Synthesis
        </p>
      </div>

      {/* Critical Instructions */}
      <div className="bg-terminal-black border-2 border-terminal-amber p-4 rounded-none space-y-3 animate-pulse">
        <p className="text-terminal-amber font-bold text-sm">
          ⚠ FINAL AUTHENTICATION REQUIRED
        </p>
        <p className="text-terminal-green text-xs leading-relaxed">
          Synthesize evidence from all previous puzzles. The master code combines:
        </p>
        <ul className="text-terminal-green text-xs space-y-1 ml-4">
          <li>• Abbreviation of the Prime Minister's position</li>
          <li>• Number of government branches</li>
        </ul>
      </div>

      {/* Evidence Analysis */}
      <div>
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="text-terminal-amber hover:text-terminal-green text-xs underline transition-colors w-full text-left"
        >
          {showAnalysis ? "▼ HIDE EVIDENCE ANALYSIS" : "▶ REVIEW COLLECTED EVIDENCE"}
        </button>

        {showAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 space-y-3 bg-terminal-black border border-terminal-green/30 p-4"
          >
            {evidence.puzzle1 && (
              <div className="text-xs space-y-1">
                <p className="text-terminal-amber font-bold">
                  ✓ Puzzle 1 - Core Principles:
                </p>
                <p className="text-terminal-green ml-4">{evidence.puzzle1}</p>
              </div>
            )}

            {evidence.puzzle2 && (
              <div className="text-xs space-y-1">
                <p className="text-terminal-amber font-bold">
                  ✓ Puzzle 2 - Power Structure:
                </p>
                <p className="text-terminal-green ml-4">
                  {evidence.puzzle2} (3 branches)
                </p>
              </div>
            )}

            {evidence.puzzle3 && (
              <div className="text-xs space-y-1">
                <p className="text-terminal-amber font-bold">
                  ✓ Puzzle 3 - Hidden Keyword:
                </p>
                <p className="text-terminal-green ml-4">"{evidence.puzzle3}"</p>
              </div>
            )}

            <div className="border-t border-terminal-green/20 pt-3 text-terminal-amber text-xs">
              <p className="font-bold mb-2">SYNTHESIS HINT:</p>
              <p className="text-terminal-green">
                The PM's abbreviation (TT) + position (CP) + number of branches (3)
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-terminal-amber text-xs font-bold mb-2">
            &gt; ENTER THE MASTER KEY CODE:
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="TTCP3"
            className="w-full px-4 py-3 font-terminal text-base tracking-widest text-center"
            autoFocus
            disabled={isSolved}
          />
        </div>

        {/* Attempt Counter */}
        {attempts > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-terminal-amber text-sm font-bold animate-flicker text-center"
          >
            ✗ INVALID MASTER KEY × {attempts}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={isSolved || input.length === 0}
          className="btn-terminal w-full text-base py-3 border-terminal-amber"
        >
          &gt; AUTHENTICATE MASTER KEY
        </button>
      </form>

      <p className="text-center text-terminal-green/40 text-xs">
        [Enter the synthesized code to complete the investigation]
      </p>
    </div>
  );
};

export default Puzzle4MasterKey;
