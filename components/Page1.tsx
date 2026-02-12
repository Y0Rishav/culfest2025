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
                REGISTER NOW
              </button>
            </Link>
          )}
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
