import styles from "@/styles/components/Page1.module.css";
import { FloatingDockDemo } from "./Header";
import AnimatedHeroBackground from "./AnimatedHeroBackground";
import CursorEffect from "./CursorEffect";

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
          <img
            src="/colorLogo.png"
            alt="Culfest Logo"
            className="absolute left-2 top-2 h-40 animate-pulse"
            style={{
              zIndex: 50,
            }}
          />
        </nav>
      </div>

      {/* Animated Cursor - Yellow with Date */}
      <div id="cursor">
        <h5>17-19 JAN</h5>
      </div>
      <CursorEffect />
    </div>
  );
}
