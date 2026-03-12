interface ProgressBarProps {
  unlockedCount: number;
  totalCount: number;
}

const ProgressBar = ({ unlockedCount, totalCount }: ProgressBarProps) => {
  const percentage = (unlockedCount / totalCount) * 100;

  return (
    <div className="crt-frame p-4 md:p-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-terminal-green font-bold text-sm">&gt; BẰNG CHỨNG ĐÃ THU:</p>
          <p className="text-terminal-amber font-bold text-sm">
            {unlockedCount}/{totalCount}
          </p>
        </div>

        <div className="w-full h-8 bg-terminal-black border-2 border-terminal-green/50 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-terminal-green via-terminal-amber to-terminal-green transition-all duration-500 flex items-center justify-center"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 10 && (
              <span className="text-terminal-black text-xs font-bold">
                {Math.floor(percentage)}%
              </span>
            )}
          </div>

          {/* Scanning effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none animate-pulse"></div>
        </div>

        <p className="text-terminal-green/60 text-xs font-mono">
          [{Array(totalCount).fill("█").join("")}]
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
