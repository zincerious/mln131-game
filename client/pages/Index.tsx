import { useNavigate } from "react-router-dom";
import { Lock, Zap, Eye, Network } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-terminal-black overflow-hidden relative">
      {/* Animated scanline background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-terminal-green via-transparent to-terminal-amber"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-5xl w-full space-y-8">
          {/* Top Secret Banner */}
          <div className="text-center space-y-2 mb-8">
            <p className="text-terminal-amber text-xs md:text-sm font-bold tracking-widest animate-pulse">
              ▓▓▓ TÀI LIỆU MẬT / HỒ SƠ BẢO MẬT ▓▓▓
            </p>
            <p className="text-terminal-green text-xs text-opacity-60">CẤP PHÉP: 5</p>
          </div>

          {/* Main Header */}
          <div className="crt-frame p-10 md:p-16 text-center space-y-8">
            <div className="space-y-4">
              <div className="text-3xl md:text-5xl font-black terminal-amber-glow tracking-widest">
                TRÌNH GIẢI MÃ HỒ SƠ
              </div>
              <div className="h-1 bg-gradient-to-r from-terminal-green via-terminal-amber to-terminal-green w-full"></div>
              <p className="text-terminal-green text-sm md:text-base font-mono tracking-widest">
                GIAO THỨC ĐIỀU TRA VÀ XÁC MINH
              </p>
            </div>

            {/* Security Clearance Notice */}
            <div className="bg-terminal-black border-2 border-terminal-amber/50 p-6 space-y-3 animate-pulse">
              <p className="text-terminal-amber font-bold text-sm">⚠ TRUY CẬP HẠN CHẾ ⚠</p>
              <p className="text-terminal-green text-xs leading-relaxed">
                Thử thách bảo mật này yêu cầu mức độ tập trung cao. Bạn đã được chọn tham gia xác thực cấp độ 5.
              </p>
            </div>

            {/* Mission Briefing */}
            <div className="space-y-4">
            <div className="space-y-4">
              <p className="text-terminal-green text-sm md:text-base leading-relaxed font-mono">
                &gt; NHIỆM VỤ: Giải bốn câu đố có liên kết, dựa trên nội dung bài thuyết trình bảo mật.
              </p>
              <p className="text-terminal-green text-sm md:text-base leading-relaxed font-mono">
                &gt; MỤC TIÊU: Tổng hợp bằng chứng từ các bài để xác thực Chìa Khóa Chung.
              </p>
              <p className="text-terminal-green text-sm md:text-base leading-relaxed font-mono">
                &gt; THỬ THÁCH: Mỗi câu đố chứa các khóa giải mã rút từ nội dung trình bày.
              </p>
              <p className="text-terminal-amber text-sm md:text-base leading-relaxed font-mono">
                &gt; CẢNH BÁO: Nộp sai có thể kích hoạt cơ chế khoá. Hãy làm cẩn trọng.
              </p>
            </div>
            </div>
          </div>

          {/* Puzzle Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Puzzle 1 */}
            <div className="crt-frame p-6 hover:border-terminal-amber transition-colors duration-300 group">
              <div className="flex gap-4">
                <Lock className="w-8 h-8 text-terminal-amber flex-shrink-0 group-hover:animate-spin" />
                <div className="flex-1">
                  <h3 className="text-terminal-amber font-bold text-sm">BÀI 1: KHÓA TRẬT TỰ</h3>
                  <p className="text-terminal-green text-xs mt-2">Nguyên tắc cốt lõi theo thứ tự: Khái niệm, Nguyên tắc, Cơ cấu, Vai trò</p>
                </div>
              </div>
            </div>

            {/* Puzzle 2 */}
            <div className="crt-frame p-6 hover:border-terminal-amber transition-colors duration-300 group">
              <div className="flex gap-4">
                <Network className="w-8 h-8 text-terminal-amber flex-shrink-0 group-hover:animate-pulse" />
                <div className="flex-1">
                  <h3 className="text-terminal-amber font-bold text-sm">BÀI 2: GIẢI MÃ LƯỚI</h3>
                  <p className="text-terminal-green text-xs mt-2">Chu trình quyền lực: Lập pháp → Hành pháp → Tư pháp</p>
                </div>
              </div>
            </div>

            {/* Puzzle 3 */}
            <div className="crt-frame p-6 hover:border-terminal-amber transition-colors duration-300 group">
              <div className="flex gap-4">
                <Eye className="w-8 h-8 text-terminal-amber flex-shrink-0 group-hover:animate-pulse" />
                <div className="flex-1">
                  <h3 className="text-terminal-amber font-bold text-sm">BÀI 3: KHÔI PHỤC TỪ KHÓA</h3>
                  <p className="text-terminal-green text-xs mt-2">Khôi phục cụm từ bị kiểm duyệt từ bài thuyết trình</p>
                </div>
              </div>
            </div>

            {/* Puzzle 4 */}
            <div className="crt-frame p-6 hover:border-terminal-amber transition-colors duration-300 group">
              <div className="flex gap-4">
                <Zap className="w-8 h-8 text-terminal-amber flex-shrink-0 group-hover:animate-bounce" />
                <div className="flex-1">
                  <h3 className="text-terminal-amber font-bold text-sm">BÀI 4: CHÌA KHÓA CHUNG</h3>
                  <p className="text-terminal-green text-xs mt-2">Tổng hợp bằng chứng: chữ viết tắt chủ thể + số cơ quan + từ khóa</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="crt-frame p-8 md:p-12 space-y-6 border-terminal-amber/70">
            <div className="text-center space-y-3">
              <p className="text-terminal-amber font-bold text-sm tracking-widest">█ TRẠNG THÁI HỆ THỐNG: ONLINE █</p>
              <p className="text-terminal-green text-sm">Tất cả cơ chế xác thực hoạt động. Sẵn sàng thực hiện nhiệm vụ.</p>
            </div>

            <button
              onClick={() => navigate("/game")}
              className="btn-terminal w-full text-xl md:text-2xl py-5 md:py-6 font-black tracking-widest border-terminal-amber"
            >
              ▶ BẮT ĐẦU NHIỆM VỤ ◀
            </button>

            <p className="text-center text-terminal-green/50 text-xs font-mono">[YÊU CẦU PHÉP TRUY CẬP - ĐANG BẮT ĐẦU XÁC THỰC CẤP 5]</p>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2 pt-4">
            <p className="text-terminal-amber/60 text-xs font-mono">HỆ THỐNG: Trình Giải Mã Hồ Sơ v2.0</p>
            <p className="text-terminal-green/40 text-xs">▓▓▓ BẢO MẬT - DÀNH CHO NHÂN SỰ ĐƯỢC ỦY QUYỀN ▓▓▓</p>
          </div>
        </div>
      </div>
    </div>
  );
}
