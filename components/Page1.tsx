import styles from "@/styles/components/Page1.module.css";
import { FloatingDockDemo } from "./Header";
import AnimatedHeroBackground from "./AnimatedHeroBackground";
import CursorEffect from "./CursorEffect";
import { motion } from "framer-motion";

export default function Page1() {
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
            className="absolute left-4 top-4 h-[115px] mix-blend-screen"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              zIndex: 50,
            }}
          />
        </nav>
      </div>

      {/* Animated Cursor - Yellow with Date */}
      <div id="cursor">
        <h5>26 Feb <br /> 1 March</h5>
      </div>
      <CursorEffect />
    </div>
  );
}
