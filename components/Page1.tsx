import styles from "@/styles/components/Page1.module.css";
import { FloatingDockDemo } from "./Header";
import AnimatedHeroBackground from "./AnimatedHeroBackground";
import CursorEffect from "./CursorEffect";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Page1() {
  const { data: session } = useSession();
  return (
    <div id="page1" className={`${styles.page1} relative`}>
      {/* Animated Hero Background */}
      <AnimatedHeroBackground />

      {/* Page Content - Logo and Navigation */}
      <div id="page1-content">
        <nav className="items-center justify-center">
          <FloatingDockDemo />
        </nav>
        <nav className="top-[50px] h-[3px]">
          <motion.img
            src="/colorLogo.png"
            alt="Culfest Logo"
            className="absolute left-4 top-4 h-[60px] mix-blend-screen md:h-[115px]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              zIndex: 50,
            }}
          />
          {!session && (
            <Link href="/login">
              <button
                id="register-now-btn"
                className="absolute right-4 top-4 z-50 hidden rounded-lg px-6 py-2 text-xl tracking-wider transition-all hover:scale-110 active:scale-95 md:right-8 md:top-8 md:block md:px-8 md:py-3 md:text-2xl"
                style={{
                  fontFamily: "'Bangers', sans-serif",
                  background: "linear-gradient(135deg, #ffd700, #ff4444)",
                  border: "2px solid #fff",
                  boxShadow: "0 0 15px rgba(255, 215, 0, 0.6)",
                  color: "#1a1a1a",
                  textShadow: "0px 0px 1px rgba(255,255,255,0.5)",
                }}
              >
                LOGIN NOW
              </button>
            </Link>
          )}

          {/* Myntra Coupon Ticket - Desktop */}
          <a
            href="https://myntra.onelink.me/dNYC/psb0vkzt"
            target="_blank"
            rel="noopener noreferrer"
            className="coupon-ticket absolute right-4 z-50 hidden md:right-16 md:flex transition-all hover:scale-105 active:scale-95"
            style={{ top: "220px" }}
          >
            <div className="coupon-body">
              <div className="coupon-inner">
                <div className="coupon-content">
                  <img
                    src="/myntra-logo.png"
                    alt="Myntra"
                    className="coupon-logo"
                  />
                  <span className="coupon-text">Register on Myntra</span>
                </div>
              </div>
            </div>
          </a>
          <style jsx>{`
            .coupon-ticket {
              transform: rotate(-18deg);
              cursor: pointer;
            }
            .coupon-ticket:hover {
              transform: rotate(-2deg) scale(1.05);
            }
            .coupon-body {
              position: relative;
              background: linear-gradient(145deg, #4a3728, #6b4f3a, #4a3728);
              padding: 3px;
              clip-path: polygon(
                0% 15%, 3% 15%, 3% 0%,
                10% 0%, 10% 3%, 15% 3%, 15% 0%,
                22% 0%, 22% 3%, 28% 3%, 28% 0%,
                35% 0%, 35% 3%, 42% 3%, 42% 0%,
                50% 0%, 50% 3%, 58% 3%, 58% 0%,
                65% 0%, 65% 3%, 72% 3%, 72% 0%,
                78% 0%, 78% 3%, 85% 3%, 85% 0%,
                90% 0%, 90% 3%, 97% 3%, 97% 0%,
                100% 0%, 100% 15%,
                97% 15%, 97% 25%, 100% 25%,
                100% 40%, 97% 40%, 97% 50%, 100% 50%,
                100% 60%, 97% 60%, 97% 70%, 100% 70%,
                100% 85%, 97% 85%, 97% 100%,
                90% 100%, 90% 97%, 85% 97%, 85% 100%,
                78% 100%, 78% 97%, 72% 97%, 72% 100%,
                65% 100%, 65% 97%, 58% 97%, 58% 100%,
                50% 100%, 50% 97%, 42% 97%, 42% 100%,
                35% 100%, 35% 97%, 28% 97%, 28% 100%,
                22% 100%, 22% 97%, 15% 97%, 15% 100%,
                10% 100%, 10% 97%, 3% 97%, 3% 100%,
                0% 100%, 0% 85%,
                3% 85%, 3% 70%, 0% 70%,
                0% 60%, 3% 60%, 3% 50%, 0% 50%,
                0% 40%, 3% 40%, 3% 25%, 0% 25%
              );
            }
            .coupon-inner {
              position: relative;
              background: linear-gradient(145deg, #f5e6d3, #e8d5b8, #dfc9a8);
              padding: 10px 18px;
              border: 2px dashed #8b6f4e;
              border-radius: 3px;
            }
            .coupon-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
            }
            .coupon-logo {
              width: 48px;
              height: 48px;
              object-fit: contain;
            }
            .coupon-text {
              font-family: 'Bangers', sans-serif;
              font-size: 0.65rem;
              color: #4a3728;
              letter-spacing: 1.5px;
              text-transform: uppercase;
            }
          `}</style>
        </nav>
      </div>

      {/* Animated Cursor - Yellow with Date */}
      <div id="cursor">
        <h5>
          26 Feb <br /> 1 March
        </h5>
      </div>
      <CursorEffect />
    </div>
  );
}
