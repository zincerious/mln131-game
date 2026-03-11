import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  startTime: number | null;
}

const Timer = ({ startTime }: TimerProps) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const seconds = Math.floor((now - startTime) / 1000);
      setElapsedSeconds(seconds);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const formatTime = (m: number, s: number) => {
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="crt-frame p-4 md:p-6">
      <div className="flex items-center gap-4">
        <Clock className="w-8 h-8 text-terminal-amber animate-pulse" />
        <div className="flex-1">
          <p className="text-terminal-green font-bold text-sm">
            &gt; TIME ELAPSED:
          </p>
          <p className="text-terminal-amber font-mono text-2xl md:text-3xl font-bold tracking-wider">
            {formatTime(minutes, seconds)}
          </p>
        </div>
      </div>

      {/* Visual timer indicator */}
      <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-terminal-amber to-transparent opacity-50"></div>
    </div>
  );
};

export default Timer;
