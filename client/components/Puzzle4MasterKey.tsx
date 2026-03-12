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

  const normalizeAnswer = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalized = normalizeAnswer(input || "");
    if (normalized === "ND3PL") {
      setIsSolved(true);
      onSolve("MASTER_UNLOCK");
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
          <h3 className="text-2xl font-bold terminal-amber-glow">🎉 HỒ SƠ ĐÃ ĐƯỢC GIẢI</h3>
          <p className="text-terminal-green text-sm">Bạn đã chứng minh rằng:</p>
        </div>

        <div className="bg-terminal-black border border-terminal-amber/30 p-4 space-y-2 text-terminal-green text-sm">
          <ul className="list-disc ml-4 space-y-1">
            <li>Quyền lực thuộc về <span className="text-terminal-amber font-bold">Nhân dân</span></li>
            <li>Được thực hiện bởi <span className="text-terminal-amber font-bold">3</span> cơ quan chính (Lập pháp, Hành pháp, Tư pháp)</li>
            <li>Toàn bộ hệ thống vận hành bằng <span className="text-terminal-amber font-bold">Pháp luật</span></li>
          </ul>
          <div className="text-terminal-amber font-mono text-center font-bold text-lg mt-3">ND3PL</div>
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
        <h2 className="text-2xl font-bold terminal-amber-glow">CHÌA KHÓA CHUNG</h2>
        <p className="text-terminal-amber/60 text-sm">&gt; Bài 4: Slide 10 - Tổng hợp cuối</p>
      </div>

      {/* Critical Instructions */}
      <div className="bg-terminal-black border-2 border-terminal-amber p-4 rounded-none space-y-3 animate-pulse">
        <p className="text-terminal-amber font-bold text-sm">⚠ YÊU CẦU XÁC THỰC CUỐI</p>
        <p className="text-terminal-green text-xs leading-relaxed">Tổng hợp các bằng chứng từ các bài trước. Mã tổng hợp gồm:</p>
        <ul className="text-terminal-green text-xs space-y-1 ml-4">
          <li>• Chữ viết tắt của chủ thể quyền lực</li>
          <li>• Số lượng cơ quan thực hiện quyền lực</li>
          <li>• Từ khóa trung tâm của nguyên tắc quản lý</li>
        </ul>
      </div>

      {/* Evidence Analysis */}
      <div>
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="text-terminal-amber hover:text-terminal-green text-xs underline transition-colors w-full text-left"
        >
          {showAnalysis ? "▼ ẨN PHÂN TÍCH BẰNG CHỨNG" : "▶ XEM LẠI BẰNG CHỨNG ĐÃ THU"}
        </button>

        {showAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 space-y-3 bg-terminal-black border border-terminal-green/30 p-4"
          >
            {evidence.puzzle1 && (
              <div className="text-xs space-y-1">
                <p className="text-terminal-amber font-bold">✓ Bài 1 - Nguyên tắc cốt lõi:</p>
                <p className="text-terminal-green ml-4">{evidence.puzzle1}</p>
              </div>
            )}

            {evidence.puzzle2 && (
              <div className="text-xs space-y-1">
                <p className="text-terminal-amber font-bold">✓ Bài 2 - Cơ cấu quyền lực:</p>
                <p className="text-terminal-green ml-4">{evidence.puzzle2} (3 cơ quan)</p>
              </div>
            )}

            {evidence.puzzle3 && (
              <div className="text-xs space-y-1">
                <p className="text-terminal-amber font-bold">✓ Bài 3 - Từ khóa trung tâm:</p>
                <p className="text-terminal-green ml-4">"{evidence.puzzle3}"</p>
              </div>
            )}

            <div className="border-t border-terminal-green/20 pt-3 text-terminal-amber text-xs">
              <p className="font-bold mb-2">GỢI Ý TỔ HỢP (Viết tắt):</p>
              <p className="text-terminal-green">Chủ thể + Số cơ quan + Nguyên tắc</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-terminal-amber text-xs font-bold mb-2">&gt; NHẬP MÃ CHÌA KHÓA:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
            ✗ MÃ KHÔNG HỢP LỆ × {attempts}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={isSolved || input.length === 0}
          className="btn-terminal w-full text-base py-3 border-terminal-amber"
        >
          &gt; XÁC THỰC MÃ
        </button>
      </form>

      <p className="text-center text-terminal-green/40 text-xs">[Nhập mã tổng hợp để hoàn tất điều tra]</p>
    </div>
  );
};

export default Puzzle4MasterKey;
