import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

interface FolderState {
  id: number;
  title: string;
  clue: string;
  correctAnswer: string;
  content: string;
  unlocked: boolean;
}

interface EvidenceFolderProps {
  folder: FolderState;
  folderIndex: number;
  onUnlock: (folderId: number) => void;
  playErrorSound: () => void;
  playSuccessSound: () => void;
  isSequential: boolean;
}

const EvidenceFolder = ({
  folder,
  folderIndex,
  onUnlock,
  playErrorSound,
  playSuccessSound,
  isSequential,
}: EvidenceFolderProps) => {
  const [input, setInput] = useState("");
  const [showClue, setShowClue] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.toLowerCase().trim() === folder.correctAnswer.toLowerCase()) {
      playSuccessSound();
      onUnlock(folder.id);
      setInput("");
    } else {
      setIsShaking(true);
      playErrorSound();
      setAttempts(attempts + 1);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (!isSequential) {
    return (
      <div className="crt-frame p-6 opacity-50">
        <div className="flex items-center gap-4">
          <Lock className="w-8 h-8 text-terminal-green" />
          <div>
            <h2 className="text-xl font-bold terminal-glow">LOCKED - AWAITING PREVIOUS UNLOCK</h2>
            <p className="text-sm terminal-glow text-opacity-60">
              {folder.title}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (folder.unlocked) {
    return (
      <div className="crt-frame p-6 md:p-8 border-terminal-green/70 bg-terminal-black/50">
        <div className="flex items-start gap-4 mb-4">
          <Unlock className="w-8 h-8 text-terminal-amber flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-xl font-bold terminal-amber-glow">{folder.title}</h2>
            <p className="text-sm terminal-glow text-opacity-60">UNLOCKED</p>
          </div>
        </div>

        <div className="bg-terminal-black border border-terminal-green/30 p-4 md:p-6 rounded-none space-y-4">
          <p className="terminal-glow text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            &gt; {folder.content}
          </p>
          <p className="text-terminal-amber text-xs font-bold opacity-70">
            [FILE DECRYPTED]
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`crt-frame p-6 md:p-8 border-2 border-terminal-green/70 transition-all duration-300 ${
        isShaking ? "animate-shake" : ""
      }`}
    >
      <div className="flex items-start gap-4 mb-6">
        <Lock className="w-8 h-8 text-terminal-green flex-shrink-0 mt-1 animate-pulse" />
        <div className="flex-1">
          <h2 className="text-xl font-bold terminal-glow">{folder.title}</h2>
          <p className="text-sm terminal-glow text-opacity-60">Status: LOCKED</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Clue Section */}
        <div className="bg-terminal-black border border-terminal-green/30 p-4 rounded-none">
          <button
            onClick={() => setShowClue(!showClue)}
            className="text-terminal-green hover:text-terminal-amber transition-colors flex items-center gap-2 mb-2"
          >
            <span className="text-lg">▶</span>
            <span className="text-sm font-bold">REVIEW CLUE</span>
          </button>

          {showClue && (
            <p className="terminal-glow text-sm md:text-base leading-relaxed pl-6 animate-pulse">
              &gt; {folder.clue}
            </p>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-terminal-green text-xs font-bold mb-2">
              &gt; ENTER KEY TERM:
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type the key term..."
              className="w-full px-4 py-3 font-terminal text-base"
              autoFocus
              disabled={folder.unlocked}
            />
          </div>

          {attempts > 0 && (
            <p className="text-terminal-amber text-sm font-bold animate-flicker">
              &gt; ACCESS DENIED × {attempts} | RETRY
            </p>
          )}

          <button
            type="submit"
            disabled={folder.unlocked}
            className="btn-terminal w-full text-sm md:text-base py-3"
          >
            &gt; SUBMIT KEY
          </button>
        </form>
      </div>
    </div>
  );
};

export default EvidenceFolder;
