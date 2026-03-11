import { useState } from "react";
import { motion } from "framer-motion";
import { validateAnswer } from "@/lib/antiCheat";
import { Lock, Unlock, Building2, Users, Scale, ShieldAlert } from "lucide-react";

interface Puzzle2Props {
  onSolve: (evidenceValue: string) => void;
  onError: () => void;
}

interface GridItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  display: string;
}

const Puzzle2GridDecipher = ({ onSolve, onError }: Puzzle2Props) => {
  const gridItems: GridItem[] = [
    { id: "qh", label: "Quốc hội", icon: <Users className="w-8 h-8" />, display: "QH" },
    { id: "cp", label: "Chính phủ", icon: <Building2 className="w-8 h-8" />, display: "CP" },
    { id: "ta", label: "Tòa án", icon: <Scale className="w-8 h-8" />, display: "TA" },
    { id: "vks", label: "Viện kiểm sát", icon: <ShieldAlert className="w-8 h-8" />, display: "VKS" },
    { id: "useless1", label: "Decoy 1", icon: <Users className="w-8 h-8" />, display: "?" },
    { id: "useless2", label: "Decoy 2", icon: <Building2 className="w-8 h-8" />, display: "?" },
    { id: "useless3", label: "Decoy 3", icon: <Scale className="w-8 h-8" />, display: "?" },
    { id: "useless4", label: "Decoy 4", icon: <ShieldAlert className="w-8 h-8" />, display: "?" },
    { id: "useless5", label: "Decoy 5", icon: <Users className="w-8 h-8" />, display: "?" },
  ];

  const correctSequence = ["qh", "cp", "ta"];
  const [clickedSequence, setClickedSequence] = useState<string[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [disabledItems, setDisabledItems] = useState<Set<string>>(new Set());

  const handleItemClick = (itemId: string) => {
    if (disabledItems.has(itemId) || isSolved) return;

    const expectedIndex = clickedSequence.length;
    const expectedItem = correctSequence[expectedIndex];

    if (itemId === expectedItem) {
      // Correct click
      const newSequence = [...clickedSequence, itemId];
      setClickedSequence(newSequence);
      setDisabledItems((prev) => new Set([...prev, itemId]));

      if (newSequence.length === correctSequence.length) {
        // Solved
        setIsSolved(true);
        onSolve("QH|CP|TA");
      }
    } else {
      // Wrong click - reset
      setIsShaking(true);
      setAttempts(attempts + 1);
      setClickedSequence([]);
      setDisabledItems(new Set());
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
            POWER FLOW AUTHENTICATED
          </h3>
          <p className="text-terminal-green text-sm">
            Legislative → Executive → Judicial chain verified.
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
        <h2 className="text-2xl font-bold terminal-glow">THE GRID DECIPHER</h2>
        <p className="text-terminal-green/60 text-sm">
          &gt; Puzzle 2: Slides 4-7 - Power Structure
        </p>
      </div>

      {/* Instructions - Minimal Detail */}
      <div className="bg-terminal-black border border-terminal-green/30 p-4 rounded-none space-y-2">
        <p className="text-terminal-amber text-sm leading-relaxed">
          &gt; Click the icons in the correct operational sequence.
        </p>
        <p className="text-terminal-green text-xs">
          Three elements must be activated in the proper power flow order from the briefing.
        </p>
      </div>

      {/* Progress */}
      {clickedSequence.length > 0 && (
        <div className="text-center space-y-2">
          <p className="text-terminal-green text-sm">Progress: {clickedSequence.length}/3</p>
          <div className="flex justify-center gap-2">
            {clickedSequence.map((id, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-terminal-amber/30 border border-terminal-amber rounded flex items-center justify-center text-terminal-amber text-xs font-bold"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3x3 Grid - No Labels to Prevent Answer Leaking */}
      <div className="grid grid-cols-3 gap-4">
        {gridItems.map((item) => {
          const isSelected = clickedSequence.includes(item.id);
          const isDisabled = disabledItems.has(item.id);

          return (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              whileHover={{ scale: isDisabled ? 1 : 1.05 }}
              whileTap={{ scale: isDisabled ? 1 : 0.95 }}
              disabled={isSolved || isDisabled}
              className={`aspect-square rounded border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 p-2 ${
                isSelected
                  ? "border-terminal-amber bg-terminal-amber/10 text-terminal-amber"
                  : isDisabled
                    ? "border-terminal-green/20 bg-terminal-black/50 text-terminal-green/40 cursor-not-allowed"
                    : "border-terminal-green/30 bg-terminal-black text-terminal-green hover:border-terminal-green/50"
              }`}
            >
              <div>{item.icon}</div>
              {isSelected && (
                <span className="text-xs font-bold text-terminal-amber">
                  {clickedSequence.indexOf(item.id) + 1}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Attempt Counter */}
      {attempts > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-terminal-amber text-sm font-bold animate-flicker"
        >
          ✗ SEQUENCE BROKEN × {attempts} | GRID RESET
        </motion.p>
      )}

      {/* Instructions */}
      <p className="text-center text-terminal-green/60 text-xs">
        [Click icons in correct order: Legislative → Executive → Judicial]
      </p>
    </div>
  );
};

export default Puzzle2GridDecipher;
