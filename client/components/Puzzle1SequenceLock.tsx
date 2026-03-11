import { useState } from "react";
import { motion } from "framer-motion";
import { validateAnswer } from "@/lib/antiCheat";
import { Lock, Unlock } from "lucide-react";

interface Puzzle1Props {
  onSolve: (evidenceValue: string) => void;
  onError: () => void;
}

const Puzzle1SequenceLock = ({ onSolve, onError }: Puzzle1Props) => {
  const [inputs, setInputs] = useState<string[]>(["", "", "", ""]);
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value.toUpperCase().slice(0, 2);
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    const combined = inputs.join("-");
    if (validateAnswer("puzzle1", combined)) {
      setIsSolved(true);
      onSolve(combined);
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
        className="crt-frame p-8 border-terminal-green/70"
      >
        <div className="text-center space-y-4">
          <Unlock className="w-12 h-12 text-terminal-amber mx-auto" />
          <h3 className="text-xl font-bold terminal-amber-glow">
            SEQUENCE LOCK DISENGAGED
          </h3>
          <p className="text-terminal-green text-sm">
            Access granted. Core principles verified.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={`crt-frame p-8 space-y-6 border-terminal-green/70 ${
        isShaking ? "animate-shake" : ""
      }`}
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <Lock className="w-8 h-8 text-terminal-green mx-auto animate-pulse" />
        <h2 className="text-2xl font-bold terminal-glow">THE SEQUENCE LOCK</h2>
        <p className="text-terminal-green/60 text-sm">
          &gt; Puzzle 1: Slides 1-3 - Core Principles
        </p>
      </div>

      {/* Instructions - Minimal Detail */}
      <div className="bg-terminal-black border border-terminal-green/30 p-4 rounded-none">
        <p className="text-terminal-amber text-sm leading-relaxed">
          &gt; Enter the four-element cipher key from the briefing materials.
        </p>
        <p className="text-terminal-green text-xs mt-2">
          Each circle requires a two-character code. Order matters.
        </p>
      </div>

      {/* Input Circles - No Labels to Prevent Answer Leaking */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {inputs.map((_, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Circular Input */}
            <div className="relative w-24 h-24">
              <input
                type="text"
                value={inputs[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength={2}
                placeholder=""
                className="w-full h-full rounded-full text-center font-bold text-lg border-2 border-terminal-green/50 focus:border-terminal-amber focus:outline-none bg-terminal-black text-terminal-green"
                disabled={isSolved}
              />
              <div className="absolute inset-0 rounded-full border-2 border-terminal-green/20 pointer-events-none"></div>
            </div>

            {/* Index Indicator Only */}
            <p className="text-terminal-green/40 text-xs font-mono">
              [{index + 1}]
            </p>
          </motion.div>
        ))}
      </div>

      {/* Combined Display - Hidden if not all filled */}
      {inputs.every((i) => i.length === 2) && (
        <div className="text-center">
          <p className="text-terminal-amber font-mono text-2xl font-bold tracking-wider">
            {inputs.join("-")}
          </p>
        </div>
      )}

      {/* Attempt Counter */}
      {attempts > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-terminal-amber text-sm font-bold animate-flicker"
        >
          ✗ INCORRECT SEQUENCE × {attempts}
        </motion.p>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSolved || inputs.some((i) => i.length !== 2)}
        className="btn-terminal w-full text-base py-3"
      >
        &gt; UNLOCK SEQUENCE
      </button>

      <p className="text-center text-terminal-green/40 text-xs">
        [Enter all four codes to proceed]
      </p>
    </div>
  );
};

export default Puzzle1SequenceLock;
