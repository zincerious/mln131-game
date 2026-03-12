import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FinalSubmissionProps {
  completionTime: number | null;
  onSubmit?: (answer: string) => void;
  isSubmitting?: boolean;
}

const FinalSubmission = ({
  completionTime,
  onSubmit,
  isSubmitting = false,
}: FinalSubmissionProps) => {
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  // Completed game screen
  if (completionTime !== null) {
    return (
      <div className="min-h-screen bg-terminal-black flex items-center justify-center p-4">
        <div className="crt-frame w-full max-w-2xl p-8 md:p-12 space-y-8">
          {/* Trophy Animation */}
          <div className="text-center">
            <Trophy className="w-24 h-24 mx-auto text-terminal-amber animate-glow mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold terminal-amber-glow tracking-wider">HỒ SƠ KẾT THÚC</h1>
            <div className="h-1 bg-gradient-to-r from-terminal-green via-terminal-amber to-terminal-green mx-auto w-48 mt-4"></div>
          </div>

          {/* Completion Stats */}
          <div className="space-y-4 bg-terminal-black border-2 border-terminal-green/50 p-6 md:p-8">
            <div className="text-center space-y-2">
              <p className="text-terminal-green text-sm font-bold">&gt; THỜI GIAN HOÀN THÀNH ĐIỀU TRA</p>
              <p className="text-terminal-amber font-mono text-4xl md:text-5xl font-bold">
                {Math.floor(completionTime / 60)}m {(completionTime % 60).toString().padStart(2, "0")}s
              </p>
            </div>

            <div className="border-t border-terminal-green/30 pt-6">
              <p className="text-terminal-green text-xs font-bold text-center mb-4">&gt; TÓM TẮT CUỐI CÙNG</p>
              <p className="text-terminal-amber text-center font-mono text-sm md:text-base leading-relaxed">"Dân biết, dân bàn, dân làm, dân kiểm tra"</p>
              <p className="text-terminal-green text-xs text-center mt-4 text-opacity-60">[Nhân dân biết, nhân dân bàn, nhân dân làm, nhân dân kiểm tra]</p>
            </div>
          </div>

          {/* Recognition */}
          <div className="bg-terminal-black border border-terminal-amber p-4 text-center space-y-2">
            <p className="text-terminal-amber font-bold text-sm">★ THÀNH TỰU ĐIỀU TRA VIÊN ★</p>
            <p className="text-terminal-green text-xs">Điều tra hoàn tất xuất sắc.</p>
          </div>

          {/* Final oral question - always visible on master/completed screen */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-terminal-black border border-terminal-green/20 p-4 max-h-56 overflow-auto text-terminal-green text-xs">
            <h4 className="text-terminal-amber font-bold mb-2">Câu hỏi chính (miệng)</h4>
            <div className="space-y-2 leading-relaxed">
            </div>
          </motion.div>

          {/* Actions */}
          <div className="space-y-3">
            <button onClick={() => navigate("/")} className="btn-terminal w-full text-lg md:text-xl py-4">&gt; TRỞ VỀ TRANG CHỦ</button>
            <button onClick={() => window.location.reload()} className="btn-terminal w-full text-lg md:text-xl py-4 border-terminal-amber">&gt; BẮT ĐẦU LẠI</button>
          </div>

          <p className="text-center text-terminal-green text-xs text-opacity-60">[Cảm ơn bạn đã chơi - Trình Giải Mã Hồ Sơ]</p>
        </div>

        <audio
          ref={audioRef}
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBg=="
        />
      </div>
    );
  }

  // Final puzzle input screen
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = "Dân biết, dân bàn, dân làm, dân kiểm tra";

    if (input.toLowerCase().includes("dân biết")) {
      setIsCorrect(true);
      setShowResult(true);
      playVictorySound();
      if (onSubmit) {
        setTimeout(() => {
          onSubmit(input);
        }, 1000);
      }
    } else {
      setIsCorrect(false);
      setShowResult(true);
      playErrorSound();
      setTimeout(() => {
        setShowResult(false);
        setInput("");
      }, 2000);
    }
  };

  const playVictorySound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;

      // Victory melody: E, G, C (high notes)
      const notes = [
        { freq: 329.63, time: 0 },    // E
        { freq: 392.0, time: 0.2 },   // G
        { freq: 523.25, time: 0.4 },  // C high
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

  return (
    <div className="crt-frame p-6 md:p-8 border-2 border-terminal-amber">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b border-terminal-amber pb-4">
          <p className="text-terminal-amber font-bold text-sm mb-2">&gt; BÀI CUỐI</p>
          <h2 className="text-2xl md:text-3xl font-bold terminal-amber-glow">LỜI KẾT LUẬN</h2>
        </div>

        {/* Puzzle Instructions */}
        <div className="bg-terminal-black border border-terminal-amber/50 p-4 space-y-3">
          <p className="text-terminal-amber text-sm md:text-base leading-relaxed">&gt; Để kết thúc vụ án, xác định bốn nguyên tắc định hướng quản trị được trình bày trong bài thuyết trình:</p>
          <p className="text-terminal-green text-xs font-mono">[Kiến thức | Thảo luận | Hành động | Kiểm tra]</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-terminal-amber text-xs font-bold mb-2">&gt; NHẬP CÂU KẾT LUẬN CUỐI:</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập câu kết luận đầy đủ..." className="w-full px-4 py-3 font-terminal text-base h-24 resize-none" disabled={isSubmitting} />
          </div>

          {/* Result Display */}
          {showResult && (
            <div
              className={`p-4 border-2 text-center animate-pulse ${
                isCorrect
                  ? "bg-terminal-black/50 border-terminal-green text-terminal-green"
                  : "bg-terminal-black/50 border-terminal-amber text-terminal-amber"
              }`}
            >
              <p className="font-bold">{isCorrect ? "✓ ĐÚNG - VỤ ÁN HOÀN THÀNH!" : "✗ SAI - VUI LÒNG THỬ LẠI"}</p>
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="btn-terminal w-full text-base md:text-lg py-3 border-terminal-amber">&gt; GỬI CÂU KẾT LUẬN</button>
        </form>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default FinalSubmission;
