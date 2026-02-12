"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showText, setShowText] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Responsive Check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Countdown Logic (Target: Feb 26, 2026)
    const targetDate = new Date("2026-02-26T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  // Hexagon Tech Grid & Embers Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Embers Particles
    const embers: { x: number; y: number; s: number; vy: number; vx: number; alpha: number; life: number }[] = [];
    const maxEmbers = 150;

    const createEmber = () => {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 100, // Start below
        s: Math.random() * 3 + 1,
        vy: Math.random() * 1 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        life: Math.random() * 0.01 + 0.005,
      };
    };

    for (let i = 0; i < maxEmbers; i++) embers.push(createEmber());

    let time = 0;

    const drawHexagon = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + r * Math.cos(angle);
        const hy = y + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const draw = () => {
      time++;
      // Dark Tech Background
      ctx.fillStyle = "#0f172a"; // Dark Slate
      ctx.fillRect(0, 0, width, height);

      // Draw Hex Grid (Subtle)
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)"; // Blue Tech
      ctx.lineWidth = 1;
      const hexSize = 60;
      const hexH = hexSize * Math.sin(Math.PI / 3);

      // Moving Grid Effect
      const scrollY = (time * 0.5) % (hexH * 2);

      for (let y = -hexH * 2; y < height + hexH * 2; y += hexH) {
        for (let x = 0; x < width + hexSize * 2; x += hexSize * 1.5) {
          // Offset every other row
          const yOffset = (Math.floor(x / (hexSize * 1.5)) % 2) * (hexH / 2);
          drawHexagon(x, y + yOffset + scrollY, hexSize);
        }
      }

      // Draw Embers (Fire/Action)
      embers.forEach((ember, i) => {
        ember.y -= ember.vy;
        ember.x += ember.vx;
        ember.alpha -= ember.life;

        if (ember.alpha <= 0 || ember.y < -50) {
          embers[i] = createEmber();
        } else {
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.s, 0, Math.PI * 2);
          // Fire Colors: Red/Orange/Gold
          const color = Math.random() > 0.5 ? "239, 68, 68" : "234, 179, 8"; // Red : Gold
          ctx.fillStyle = `rgba(${color}, ${ember.alpha})`;
          ctx.fill();
        }
      });

      requestAnimationFrame(draw);
    };
    draw();

    setTimeout(() => setShowText(true), 600);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Custom Avengers "A" Shape SVG
  const AvengersLogo = ({ style }: { style: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" style={style}>
      <path
        d="M 40 5 L 60 5 L 90 90 L 70 90 L 63 70 L 37 70 L 40 5 Z M 44 25 L 56 25 L 50 45 Z"
        fill="transparent"
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="1"
      />
      {/* Circle Ring */}
      <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
      {/* Arrow */}
      <path d="M 63 70 L 95 70" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
    </svg>
  );

  // REALISTIC INFINITY STONE SVG
  const InfinityStone = ({ color, style }: { color: string, style?: any }) => (
    <svg viewBox="0 0 100 100" style={{ ...style, filter: `drop-shadow(0 0 10px ${color})` }}>
      {/* Faceted Gem Shape */}
      <path d="M50 5 L85 30 L85 70 L50 95 L15 70 L15 30 Z" fill={color} opacity="0.8" />
      <path d="M50 5 L85 30 L50 40 Z" fill="#fff" opacity="0.4" />
      <path d="M15 30 L50 5 L50 40 Z" fill="#fff" opacity="0.2" />
      <path d="M15 30 L50 40 L15 70 Z" fill="#000" opacity="0.1" />
      <path d="M85 30 L50 40 L85 70 Z" fill="#000" opacity="0.2" />
      <path d="M50 40 L50 95 L85 70 Z" fill="#000" opacity="0.3" />
      <path d="M50 40 L50 95 L15 70 Z" fill="#000" opacity="0.1" />
      <circle cx="50" cy="50" r="10" fill="white" opacity="0.8" filter="blur(5px)" />
    </svg>
  );

  // JARVIS HUD RING SVG - Bolder/Darker as requested
  const JarvisRing = ({ style, color = "#00e5ff" }: { style: any, color?: string }) => (
    <svg viewBox="0 0 100 100" style={style}>
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="2" fill="none" strokeDasharray="10 5" opacity="0.9" />
      <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="3" fill="none" strokeDasharray="30 20" opacity="1" />
      <circle cx="50" cy="50" r="25" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M50 5 L50 15 M50 95 L50 85 M5 50 L15 50 M95 50 L85 50" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="50" r="3" fill={color} />
    </svg>
  );

  // TIME HEIST DIGIT - RESPONSIVE SIZE
  const Digit = ({ val, label }: { val: number, label: string }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 10px" }}>
      <div style={{
        background: "rgba(0,0,0,0.5)", border: "1px solid #b91c1c", color: "#f43f5e",
        fontFamily: "'Courier New', monospace",
        fontSize: isMobile ? "16px" : "24px", // SMALLER ON MOBILE
        fontWeight: "bold",
        padding: isMobile ? "2px 5px" : "5px 10px",
        borderRadius: "5px", textShadow: "0 0 5px #f43f5e"
      }}>
        {val.toString().padStart(2, '0')}
      </div>
      <span style={{ fontSize: isMobile ? "8px" : "10px", color: "#9ca3af", marginTop: "5px", textTransform: "uppercase" }}>{label}</span>
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0f172a" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

      {/* Halftone Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, #334155 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        opacity: 0.1,
        pointerEvents: "none"
      }} />

      {/* Top Red Border */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "80px",
        background: "linear-gradient(175deg, #b91c1c 40%, transparent 40%)", // RED TOP
        zIndex: 5
      }} />

      {/* Bottom Blue Border (Right Triangle) */}
      <div style={{
        position: "absolute", bottom: 0, right: 0,
        width: "50%", height: "100px",
        background: "#1d4ed8", // SOLID BLUE
        clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
        zIndex: 5
      }} />

      {/* JARVIS HUD ELEMENTS - RESPONSIVE SIZES */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "20%", // KEEP USER PREFERENCE
          left: "2%",
          width: isMobile ? "80px" : "130px", // SMALLER ON MOBILE
          height: isMobile ? "80px" : "130px",
          zIndex: 1, opacity: 1
        }}
      >
        <JarvisRing style={{ width: "100%", height: "100%" }} />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: isMobile ? "15%" : "12%",
          right: "2%",
          width: isMobile ? "100px" : "160px", // SMALLER ON MOBILE
          height: isMobile ? "100px" : "160px",
          zIndex: 1, opacity: 1
        }}
      >
        <JarvisRing style={{ width: "100%", height: "100%" }} color="#eab308" />
      </motion.div>


      {/* STATIC CONTAINER FOR FLOATING OBJECTS (Safe Positions) */}
      {showText && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
          {/* Comic Bubbles */}
          {/* "POW!" */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [-5, 5, -5] }}
            transition={{ delay: 1, rotate: { duration: 3, repeat: Infinity } }}
            style={{
              position: "absolute",
              top: isMobile ? "12%" : "15%",
              right: isMobile ? "5%" : "20%",
              background: "#ffef00", padding: "10px 15px",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
              zIndex: 5, border: "2px solid #000",
              transform: isMobile ? "rotate(15deg) scale(0.7)" : "rotate(15deg)"
            }}
          >
            <span style={{ fontFamily: "'Bangers', sans-serif", fontSize: "18px", color: "#000" }}>POW!</span>
          </motion.div>

          {/* "BOOM!" */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            style={{
              position: "absolute", bottom: "10%", left: "5%", zIndex: 5,
              transform: isMobile ? "scale(0.7)" : "scale(1)"
            }}
          >
            <div style={{
              background: "#f43f5e", padding: "15px", borderRadius: "50%",
              border: "3px solid #fff", boxShadow: "0 0 10px rgba(244, 63, 94, 0.5)",
            }}>
              <span style={{ fontFamily: "'Bangers', sans-serif", fontSize: "20px", color: "#fff" }}>BOOM!</span>
            </div>
          </motion.div>

          {/* STONES CONTAINER - Floating + Interactive (SAFE ZONES) */}
          {[
            { color: "#ef4444", top: "20%", left: isMobile ? "5%" : "35%" }, // Reality (Red) -> MOVED TO EDGE ON MOBILE
            { color: "#3b82f6", top: "85%", left: "20%" }, // Space (Blue)
            { color: "#a855f7", top: "15%", right: isMobile ? "5%" : "12%" }, // Power (Purple) -> MOVED TO EDGE ON MOBILE
            { color: "#f59e0b", top: "75%", right: isMobile ? "5%" : "18%" }, // Mind (Yellow)
            { color: "#22c55e", top: "90%", left: "60%" }, // Time (Green)
            { color: "#f97316", top: "50%", left: "2%" }, // Soul (Orange)
          ].map((stone, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0], opacity: [0.8, 1, 0.8] }}
              whileHover={{ scale: 1.5, filter: `drop-shadow(0 0 20px ${stone.color})`, zIndex: 50, opacity: 1 }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", top: stone.top, left: stone.left, right: stone.right,
                width: isMobile ? "20px" : "30px", height: isMobile ? "20px" : "30px",
                zIndex: 4, pointerEvents: "auto"
              }}
            >
              <InfinityStone color={stone.color} style={{ width: "100%", height: "100%" }} />
            </motion.div>
          ))}
        </div>
      )}

      {/* GIANT Background "A" Symbol */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: isMobile ? "100%" : "90vh", height: isMobile ? "auto" : "90vh", aspectRatio: "1/1",
        opacity: 0.1, pointerEvents: "none", zIndex: 1
      }}>
        <AvengersLogo style={{ width: "100%", height: "100%" }} />
      </div>


      {/* Main Content */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
          paddingTop: isMobile ? "15vh" : "12vh",
          zIndex: 10,
        }}
      >

        {/* MAIN TITLE: CULFEST '26 */}
        {showText && (
          <>
            {/* Sponsor Image & Presents Text - MOVED OUTSIDE */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px", marginTop: "0", zIndex: 10
              }}
            >
              <div style={{
                width: isMobile ? "130px" : "180px",
                height: isMobile ? "130px" : "180px",
                borderRadius: "50%",
                background: "#fff",
                border: "4px solid #fcd34d",
                boxShadow: "0 0 15px rgba(252, 211, 77, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                marginBottom: "5px",
                overflow: "hidden"
              }}>
                <img
                  src="/jharkhand_tourism.png"
                  alt="Jharkhand Tourism"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 5px rgba(0,0,0,0.1))",
                  }}
                />
              </div>
              <span style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? "10px" : "14px",
                color: "#9ca3af", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600
              }}>
                PRESENTS
              </span>
            </motion.div>

            <motion.div
              initial={{ scale: 3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: isMobile ? "95%" : "fit-content" }}
            >
              {/* Encapsulating Brackets */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "110%", opacity: 1 }} // Reduced width for mobile safety
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  position: "absolute", top: "-20px", left: "-5%",
                  height: "100%", borderTop: "2px solid #eab308", borderLeft: "2px solid #eab308",
                  zIndex: 0
                }}
              />
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "110%", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  position: "absolute", bottom: "-20px", right: "-5%",
                  height: "100%", borderBottom: "2px solid #eab308", borderRight: "2px solid #eab308",
                  zIndex: 0
                }}
              />


              {/* The Text */}
              <h1 style={{
                fontSize: "clamp(32px, 12vw, 130px)", // Adjusted clamp min/max
                fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontStyle: "italic",
                textAlign: "center", lineHeight: 0.9, letterSpacing: "-0.02em", margin: 0,
                background: "linear-gradient(to bottom, #fcd34d 0%, #d97706 40%, #b45309 60%, #78350f 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                filter: "drop-shadow(6px 6px 0px #7f1d1d)", position: "relative", zIndex: 2,
              }}>
                CULFEST
                <span style={{
                  fontSize: "0.5em", color: "#fff", WebkitTextFillColor: "#fff",
                  filter: "drop-shadow(4px 4px 0px #000)", marginLeft: "10px"
                }}>'26</span>
              </h1>
            </motion.div>
          </>
        )}

        {/* Subtitle */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ marginTop: "40px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
              fontSize: "clamp(14px, 3vw, 32px)", color: "#60a5fa",
              textTransform: "uppercase", letterSpacing: "4px", margin: 0,
              textShadow: "0 0 10px rgba(96, 165, 250, 0.6)", textAlign: "center"
            }}>
              COMIC CON EDITION
            </p>
            {/* Underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{
                height: "3px", background: "linear-gradient(90deg, transparent, #60a5fa, transparent)",
                marginTop: "5px"
              }}
            />

            {/* TIME HEIST COMPONENT - Scaled on Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{ display: "flex", marginTop: "30px", transform: isMobile ? "scale(0.8)" : "scale(1)" }}
            >
              <Digit val={timeLeft.days} label="Days" />
              <Digit val={timeLeft.hours} label="Hrs" />
              <Digit val={timeLeft.minutes} label="Mins" />
              <Digit val={timeLeft.seconds} label="Secs" />
            </motion.div>

          </motion.div>
        )}

      </div>
    </div>
  );
}
