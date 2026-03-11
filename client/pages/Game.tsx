import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Puzzle1SequenceLock from "../components/Puzzle1SequenceLock";
import Puzzle2GridDecipher from "../components/Puzzle2GridDecipher";
import Puzzle3WordSearch from "../components/Puzzle3WordSearch";
import Puzzle4MasterKey from "../components/Puzzle4MasterKey";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import { Trophy, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Evidence {
  puzzle1?: string;
  puzzle2?: string;
  puzzle3?: string;
  puzzle4?: string;
}

const Game = () => {
  const navigate = useNavigate();
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [evidence, setEvidence] = useState<Evidence>({});
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const puzzles = [
    {
      id: 1,
      title: "The Sequence Lock",
      subtitle: "Slides 1-3: Core Principles",
      component: Puzzle1SequenceLock,
      key: "puzzle1" as const,
    },
    {
      id: 2,
      title: "The Grid Decipher",
      subtitle: "Slides 4-7: Power Structure",
      component: Puzzle2GridDecipher,
      key: "puzzle2" as const,
    },
    {
      id: 3,
      title: "Word Search",
      subtitle: "Slides 8-9: Hidden Keywords",
      component: Puzzle3WordSearch,
      key: "puzzle3" as const,
    },
    {
      id: 4,
      title: "The Master Key",
      subtitle: "Slide 10: Final Synthesis",
      component: Puzzle4MasterKey,
      key: "puzzle4" as const,
    },
  ];

  const handlePuzzleSolve = (puzzleKey: string, value: string) => {
    setEvidence((prev) => ({
      ...prev,
      [puzzleKey]: value,
    }));

    if (currentPuzzle === puzzles.length - 1) {
      // Game complete
      const endTime = Date.now();
      const timeInSeconds = Math.floor((endTime - (startTime || 0)) / 1000);
      setCompletionTime(timeInSeconds);
      setIsGameComplete(true);
      playVictorySound();
    } else {
      // Move to next puzzle
      setTimeout(() => {
        setCurrentPuzzle(currentPuzzle + 1);
      }, 1000);
    }
  };

  const handleGameStart = () => {
    setGameStarted(true);
    setStartTime(Date.now());
  };

  const playVictorySound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;

      // Victory melody: E, G, C (high notes)
      const notes = [
        { freq: 329.63, time: 0 },
        { freq: 392.0, time: 0.2 },
        { freq: 523.25, time: 0.4 },
      ];

      notes.forEach(({ freq, time }) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, now + time);
        gain.gain.exponentialRampToValueAtTime(0.01, now + time + 0.3);
        osc.start(now + time);
        osc.stop(now + time + 0.3);
      });
    } catch (e) {
      console.log("Audio not available");
    }
  };

  const playErrorSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 200;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log("Audio not available");
    }
  };

  // Intro Screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-terminal-black flex items-center justify-center p-4">
        <div className="crt-frame w-full max-w-3xl p-8 md:p-12">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-black terminal-glow tracking-widest">
                CLASSIFIED
              </h1>
              <div className="h-1 bg-gradient-to-r from-terminal-green via-terminal-amber to-terminal-green mx-auto w-48"></div>
              <h2 className="text-2xl md:text-4xl font-bold terminal-amber-glow">
                CASE FILE DECODER
              </h2>
              <p className="text-lg md:text-xl terminal-glow text-opacity-80">
                ESPIONAGE INVESTIGATION PROTOCOL
              </p>
            </div>

            {/* Mission Briefing */}
            <div className="bg-terminal-black border-2 border-terminal-green/50 p-6 space-y-4">
              <p className="terminal-glow text-sm md:text-base leading-relaxed">
                &gt; OPERATIVE: You have been selected for a classified mission.
              </p>
              <p className="terminal-glow text-sm md:text-base leading-relaxed">
                &gt; OBJECTIVE: Solve four interconnected puzzles using clues from the briefing.
              </p>
              <p className="terminal-glow text-sm md:text-base leading-relaxed">
                &gt; CHALLENGE: Each puzzle unveils evidence for the final authentication.
              </p>
              <p className="terminal-glow text-sm md:text-base leading-relaxed">
                &gt; WARNING: Failed attempts will reset security gates. Proceed with caution.
              </p>
            </div>

            {/* Mission Briefing Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-terminal-black border border-terminal-green/30 p-3">
                <p className="text-terminal-amber font-bold mb-2">▸ PUZZLE 1</p>
                <p className="text-terminal-green">Sequence Lock</p>
              </div>
              <div className="bg-terminal-black border border-terminal-green/30 p-3">
                <p className="text-terminal-amber font-bold mb-2">▸ PUZZLE 2</p>
                <p className="text-terminal-green">Grid Decipher</p>
              </div>
              <div className="bg-terminal-black border border-terminal-green/30 p-3">
                <p className="text-terminal-amber font-bold mb-2">▸ PUZZLE 3</p>
                <p className="text-terminal-green">Word Search</p>
              </div>
              <div className="bg-terminal-black border border-terminal-green/30 p-3">
                <p className="text-terminal-amber font-bold mb-2">▸ PUZZLE 4</p>
                <p className="text-terminal-green">Master Key</p>
              </div>
            </div>

            <button
              onClick={handleGameStart}
              className="btn-terminal w-full text-lg md:text-xl py-4 font-bold tracking-wider"
            >
              ▶ INITIATE OPERATION
            </button>

            <p className="text-center terminal-glow text-xs text-opacity-60">
              [CLEAR LEVEL 5 SECURITY AUTHENTICATION REQUIRED]
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Completion Screen
  if (isGameComplete && completionTime !== null) {
    return (
      <div className="min-h-screen bg-terminal-black flex items-center justify-center p-4">
        <div className="crt-frame w-full max-w-2xl p-8 md:p-12 space-y-8">
          {/* Trophy Animation */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Trophy className="w-24 h-24 mx-auto text-terminal-amber animate-glow mb-4" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black terminal-amber-glow tracking-wider">
              MISSION COMPLETE
            </h1>
            <div className="h-1 bg-gradient-to-r from-terminal-green via-terminal-amber to-terminal-green mx-auto w-48 mt-4"></div>
          </div>

          {/* Completion Stats */}
          <div className="space-y-4 bg-terminal-black border-2 border-terminal-amber/50 p-6 md:p-8">
            <div className="text-center space-y-2">
              <p className="text-terminal-amber text-sm font-bold">
                &gt; OPERATION DURATION
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-terminal-green font-mono text-4xl md:text-5xl font-bold"
              >
                {Math.floor(completionTime / 60)}m {(completionTime % 60).toString().padStart(2, "0")}s
              </motion.p>
            </div>

            <div className="border-t border-terminal-amber/30 pt-6">
              <p className="text-terminal-amber text-xs font-bold text-center mb-4">
                &gt; EVIDENCE COLLECTED
              </p>
              <div className="space-y-3">
                {evidence.puzzle1 && (
                  <div className="text-center">
                    <p className="text-terminal-green text-xs">✓ Core Principles</p>
                    <p className="text-terminal-amber font-mono text-sm">{evidence.puzzle1}</p>
                  </div>
                )}
                {evidence.puzzle2 && (
                  <div className="text-center">
                    <p className="text-terminal-green text-xs">✓ Power Structure</p>
                    <p className="text-terminal-amber font-mono text-sm">{evidence.puzzle2}</p>
                  </div>
                )}
                {evidence.puzzle3 && (
                  <div className="text-center">
                    <p className="text-terminal-green text-xs">✓ Hidden Keyword</p>
                    <p className="text-terminal-amber font-mono text-sm">"{evidence.puzzle3}"</p>
                  </div>
                )}
                {evidence.puzzle4 && (
                  <div className="text-center border-t border-terminal-amber/30 pt-3">
                    <p className="text-terminal-amber text-xs font-bold">✓ MASTER KEY AUTHENTICATED</p>
                    <p className="text-terminal-green font-mono text-lg font-bold">{evidence.puzzle4}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recognition */}
          <div className="bg-terminal-black border-2 border-terminal-amber p-4 text-center space-y-2 animate-pulse">
            <p className="text-terminal-amber font-bold">
              ★ CLASSIFIED CLEARANCE GRANTED ★
            </p>
            <p className="text-terminal-green text-xs">
              All four puzzles solved. Security protocols bypassed.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="btn-terminal w-full text-lg md:text-xl py-4"
            >
              &gt; RETURN TO BASE
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-terminal w-full text-lg md:text-xl py-4 border-terminal-amber"
            >
              &gt; START NEW OPERATION
            </button>
          </div>

          <p className="text-center text-terminal-green text-xs text-opacity-60">
            [CLASSIFIED INVESTIGATION COMPLETE]
          </p>
        </div>
      </div>
    );
  }

  // Main Game Screen
  const CurrentPuzzle = puzzles[currentPuzzle].component;
  const currentPuzzleData = puzzles[currentPuzzle];

  return (
    <div className="min-h-screen bg-terminal-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="crt-frame p-6 md:p-8 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold terminal-glow tracking-widest">
              CASE FILE DECODER
            </h1>
            <p className="text-xs md:text-sm terminal-glow text-opacity-60 mt-2">
              PUZZLE {currentPuzzle + 1} OF {puzzles.length}
            </p>
          </div>
        </div>

        {/* Progress and Timer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProgressBar unlockedCount={currentPuzzle} totalCount={puzzles.length} />
          <Timer startTime={startTime} />
        </div>

        {/* Current Puzzle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPuzzle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentPuzzle === 0 && (
              <Puzzle1SequenceLock
                onSolve={(value) => handlePuzzleSolve("puzzle1", value)}
                onError={playErrorSound}
              />
            )}

            {currentPuzzle === 1 && (
              <Puzzle2GridDecipher
                onSolve={(value) => handlePuzzleSolve("puzzle2", value)}
                onError={playErrorSound}
              />
            )}

            {currentPuzzle === 2 && (
              <Puzzle3WordSearch
                onSolve={(value) => handlePuzzleSolve("puzzle3", value)}
                onError={playErrorSound}
              />
            )}

            {currentPuzzle === 3 && (
              <Puzzle4MasterKey
                evidence={evidence}
                onSolve={(value) => handlePuzzleSolve("puzzle4", value)}
                onError={playErrorSound}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Loading Indicator */}
        {isGameComplete && !completionTime && (
          <div className="crt-frame p-8 text-center space-y-4">
            <Loader className="w-8 h-8 text-terminal-amber animate-spin mx-auto" />
            <p className="text-terminal-glow">Finalizing investigation...</p>
          </div>
        )}
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default Game;
