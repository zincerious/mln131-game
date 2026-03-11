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
              ▓▓▓ TOP SECRET / CLASSIFIED DOCUMENT ▓▓▓
            </p>
            <p className="text-terminal-green text-xs text-opacity-60">CLEARANCE LEVEL: 5</p>
          </div>

          {/* Main Header */}
          <div className="crt-frame p-10 md:p-16 text-center space-y-8">
            <div className="space-y-4">
              <div className="text-3xl md:text-5xl font-black terminal-amber-glow tracking-widest">
                CASE FILE DECODER
              </div>
              <div className="h-1 bg-gradient-to-r from-terminal-green via-terminal-amber to-terminal-green w-full"></div>
              <p className="text-terminal-green text-sm md:text-base font-mono tracking-widest">
                ESPIONAGE INVESTIGATION PROTOCOL
              </p>
            </div>

            {/* Security Clearance Notice */}
            <div className="bg-terminal-black border-2 border-terminal-amber/50 p-6 space-y-3 animate-pulse">
              <p className="text-terminal-amber font-bold text-sm">⚠ RESTRICTED ACCESS ⚠</p>
              <p className="text-terminal-green text-xs leading-relaxed">
                This classified operational challenge requires maximum cognitive clearance. You have been selected as a candidate for Level 5 security authentication.
              </p>
            </div>

            {/* Mission Briefing */}
            <div className="space-y-4">
              <p className="text-terminal-green text-sm md:text-base leading-relaxed font-mono">
                &gt; YOUR MISSION: Solve four interconnected puzzles based on classified intelligence briefings.
              </p>
              <p className="text-terminal-green text-sm md:text-base leading-relaxed font-mono">
                &gt; OBJECTIVE: Synthesize evidence across all puzzles to authenticate the Master Key.
              </p>
              <p className="text-terminal-green text-sm md:text-base leading-relaxed font-mono">
                &gt; CHALLENGE: Each puzzle contains cipher keys from presentation materials.
              </p>
              <p className="text-terminal-amber text-sm md:text-base leading-relaxed font-mono">
                &gt; WARNING: Incorrect submissions trigger lockout protocols. Proceed strategically.
              </p>
            </div>
          </div>

          {/* Puzzle Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Puzzle 1 */}
            <div className="crt-frame p-6 hover:border-terminal-amber transition-colors duration-300 group">
              <div className="flex gap-4">
                <Lock className="w-8 h-8 text-terminal-amber flex-shrink-0 group-hover:animate-spin" />
                <div className="flex-1">
                  <h3 className="text-terminal-amber font-bold text-sm">PUZZLE 1: SEQUENCE LOCK</h3>
                  <p className="text-terminal-green text-xs mt-2">
                    Core principles in order: Khái niệm, Nguyên tắc, Cơ cấu, Vai trò
                  </p>
                </div>
              </div>
            </div>

            {/* Puzzle 2 */}
            <div className="crt-frame p-6 hover:border-terminal-amber transition-colors duration-300 group">
              <div className="flex gap-4">
                <Network className="w-8 h-8 text-terminal-amber flex-shrink-0 group-hover:animate-pulse" />
                <div className="flex-1">
                  <h3 className="text-terminal-amber font-bold text-sm">PUZZLE 2: GRID DECIPHER</h3>
                  <p className="text-terminal-green text-xs mt-2">
                    Power flow: Legislative → Executive → Judicial sequence
                  </p>
                </div>
              </div>
            </div>

            {/* Puzzle 3 */}
            <div className="crt-frame p-6 hover:border-terminal-amber transition-colors duration-300 group">
              <div className="flex gap-4">
                <Eye className="w-8 h-8 text-terminal-amber flex-shrink-0 group-hover:animate-pulse" />
                <div className="flex-1">
                  <h3 className="text-terminal-amber font-bold text-sm">PUZZLE 3: WORD SEARCH</h3>
                  <p className="text-terminal-green text-xs mt-2">
                    Recover censored phrase: Hidden keyword from presentation speech
                  </p>
                </div>
              </div>
            </div>

            {/* Puzzle 4 */}
            <div className="crt-frame p-6 hover:border-terminal-amber transition-colors duration-300 group">
              <div className="flex gap-4">
                <Zap className="w-8 h-8 text-terminal-amber flex-shrink-0 group-hover:animate-bounce" />
                <div className="flex-1">
                  <h3 className="text-terminal-amber font-bold text-sm">PUZZLE 4: MASTER KEY</h3>
                  <p className="text-terminal-green text-xs mt-2">
                    Synthesize clues: PM abbreviation + number of branches
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="crt-frame p-8 md:p-12 space-y-6 border-terminal-amber/70">
            <div className="text-center space-y-3">
              <p className="text-terminal-amber font-bold text-sm tracking-widest">
                █ SECURITY SYSTEM STATUS: ONLINE █
              </p>
              <p className="text-terminal-green text-sm">
                All authentication protocols active. Ready for operational deployment.
              </p>
            </div>

            <button
              onClick={() => navigate("/game")}
              className="btn-terminal w-full text-xl md:text-2xl py-5 md:py-6 font-black tracking-widest border-terminal-amber"
            >
              ▶ INITIATE OPERATION ◀
            </button>

            <p className="text-center text-terminal-green/50 text-xs font-mono">
              [CLASSIFIED CLEARANCE REQUIRED - LEVEL 5 AUTHENTICATION INITIATED]
            </p>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2 pt-4">
            <p className="text-terminal-amber/60 text-xs font-mono">
              OPERATION: Case File Decoder v2.0 | Cold War Espionage Protocol
            </p>
            <p className="text-terminal-green/40 text-xs">
              ▓▓▓ CONFIDENTIAL - FOR AUTHORIZED PERSONNEL ONLY ▓▓▓
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
