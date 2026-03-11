import { useState } from "react";
import { motion } from "framer-motion";
import { validateAnswer } from "@/lib/antiCheat";
import { Lock, Unlock, AlertCircle } from "lucide-react";

interface Puzzle3Props {
  onSolve: (evidenceValue: string) => void;
  onError: () => void;
}

const Puzzle3WordSearch = ({ onSolve, onError }: Puzzle3Props) => {
  const [input, setInput] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Censored text with placeholder
  const fullText =
    "Đảng là [...]. Đây là nguyên tắc cơ bản của hệ thống chính trị.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAnswer("puzzle3", input)) {
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
        className="crt-frame p-8 border-terminal-green/70"
      >
        <div className="text-center space-y-4">
          <Unlock className="w-12 h-12 text-terminal-amber mx-auto" />
          <h3 className="text-xl font-bold terminal-amber-glow">
            CENSORSHIP BYPASSED
          </h3>
          <p className="text-terminal-green text-sm">
            Hidden keyword recovered: "{input}"
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
        <AlertCircle className="w-8 h-8 text-terminal-green mx-auto animate-pulse" />
        <h2 className="text-2xl font-bold terminal-glow">WORD SEARCH</h2>
        <p className="text-terminal-green/60 text-sm">
          &gt; Puzzle 3: Slides 8-9 - Hidden Keywords
        </p>
      </div>

      {/* Instructions - Minimal Detail */}
      <div className="bg-terminal-black border border-terminal-green/30 p-4 rounded-none space-y-3">
        <p className="text-terminal-amber text-sm leading-relaxed">
          &gt; Recover the censored phrase from the briefing.
        </p>
        <p className="text-terminal-green text-xs">
          A critical phrase was spoken during the presentation but removed from written materials.
        </p>
      </div>

      {/* Censored Text Display */}
      <div className="bg-terminal-black border border-terminal-green/30 p-6 rounded-none space-y-4">
        <p className="text-terminal-green text-base leading-relaxed font-mono">
          {fullText}
        </p>

        {/* Censored Box */}
        <div className="text-center">
          <div className="inline-block bg-terminal-amber/20 border-2 border-dashed border-terminal-amber/50 px-6 py-3 rounded-none font-mono">
            <span className="text-terminal-amber font-bold text-lg">████████████</span>
          </div>
        </div>

        {/* Reveal Hint Button */}
        <div className="text-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-terminal-amber hover:text-terminal-green text-xs underline transition-colors"
          >
            {showHint ? "HIDE HINT" : "REVEAL CRYPTIC HINT"}
          </button>
        </div>

        {/* Hint */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-terminal-black border border-terminal-amber/50 p-3 rounded-none"
          >
            <p className="text-terminal-amber text-xs text-center font-mono">
              ▸ Đâu là "kim chỉ nam" của chúng ta?
            </p>
            <p className="text-terminal-green text-xs text-center mt-2">
              [What guides us like a compass?]
            </p>
          </motion.div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-terminal-green text-xs font-bold mb-2">
            &gt; ENTER THE HIDDEN KEYWORD:
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the censored phrase..."
            className="w-full px-4 py-3 font-terminal text-base"
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
            ✗ INCORRECT PHRASE × {attempts}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={isSolved || input.length === 0}
          className="btn-terminal w-full text-base py-3"
        >
          &gt; DECRYPT PHRASE
        </button>
      </form>

      <p className="text-center text-terminal-green/40 text-xs">
        [Case-insensitive matching. Recover the hidden keyword.]
      </p>
    </div>
  );
};

export default Puzzle3WordSearch;
