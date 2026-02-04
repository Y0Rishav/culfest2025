"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showText, setShowText] = useState(false);

  // Golden bubbles animation on black background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create golden bubbles - dense
    const bubbles: { x: number; y: number; r: number; o: number; d: number; c: string }[] = [];
    const goldenColors = ["#ffd700", "#ffb700", "#ffc107", "#f9a825", "#ffca28", "#ffe082"];

    for (let i = 0; i < 700; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.7 + 0.3,
        d: Math.random() > 0.5 ? 0.01 : -0.01,
        c: goldenColors[Math.floor(Math.random() * goldenColors.length)],
      });
    }

    let animId: number;
    const draw = () => {
      // Pure black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        b.o += b.d;
        if (b.o > 0.9 || b.o < 0.2) b.d *= -1;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.c;
        ctx.globalAlpha = b.o;
        ctx.shadowBlur = 8;
        ctx.shadowColor = b.c;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    setTimeout(() => setShowText(true), 300);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const text = "CULFEST'26";

  return (
    <div style={{ position: "absolute", inset: 0, background: "#000000", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

      {/* Radial Glow Behind Title */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(400px, 80vw, 900px)",
          height: "clamp(300px, 50vh, 500px)",
          background: "radial-gradient(ellipse at center, rgba(255,107,157,0.15) 0%, rgba(171,71,188,0.08) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Twinkling Stars */}
      {showText && [...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.5, 1, 0],
            scale: [0.5, 1, 0.8, 1, 0.5],
          }}
          transition={{
            delay: 0.5 + i * 0.1,
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            position: "absolute",
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            fontSize: `${8 + Math.random() * 16}px`,
            color: i % 3 === 0 ? "#ffd700" : i % 3 === 1 ? "#ff6b9d" : "#00ced1",
            textShadow: `0 0 10px currentColor`,
            pointerEvents: "none",
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Floating Geometric Shapes */}
      {showText && (
        <>
          {/* Floating Diamond 1 */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "25%",
              left: "8%",
              width: "30px",
              height: "30px",
              border: "2px solid rgba(255,215,0,0.4)",
              transform: "rotate(45deg)",
              pointerEvents: "none",
            }}
          />
          {/* Floating Diamond 2 */}
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -180, -360],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "30%",
              right: "10%",
              width: "25px",
              height: "25px",
              border: "2px solid rgba(255,107,157,0.4)",
              transform: "rotate(45deg)",
              pointerEvents: "none",
            }}
          />
          {/* Floating Circle 1 */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "65%",
              left: "12%",
              width: "20px",
              height: "20px",
              border: "2px solid rgba(0,206,209,0.4)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          {/* Floating Circle 2 */}
          <motion.div
            animate={{
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "70%",
              right: "8%",
              width: "35px",
              height: "35px",
              border: "2px solid rgba(171,71,188,0.3)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          {/* Floating Triangle 1 */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 15, 0, -15, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "20%",
              right: "25%",
              width: 0,
              height: 0,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderBottom: "20px solid rgba(255,215,0,0.3)",
              pointerEvents: "none",
            }}
          />
          {/* Floating Triangle 2 */}
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [180, 195, 180, 165, 180],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: "25%",
              left: "20%",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "16px solid rgba(255,107,157,0.3)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Corner Flourishes */}
      {showText && (
        <>
          {/* Top Left Corner */}
          <motion.svg
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            width="80" height="80"
            style={{ position: "absolute", top: "20px", left: "20px", pointerEvents: "none" }}
          >
            <path d="M5,75 L5,20 Q5,5 20,5 L75,5" stroke="#edea0bfe" strokeWidth="5" fill="none" />
            <circle cx="20" cy="20" r="4" fill="#edea0bfe" />
          </motion.svg>
          {/* Top Right Corner */}
          <motion.svg
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            width="80" height="80"
            style={{ position: "absolute", top: "20px", right: "20px", pointerEvents: "none" }}
          >
            <path d="M75,75 L75,20 Q75,5 60,5 L5,5" stroke="#edea0bfe" strokeWidth="5" fill="none" />
            <circle cx="60" cy="20" r="4" fill="#edea0bfe" />
          </motion.svg>
          {/* Bottom Left Corner */}
          <motion.svg
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            width="80" height="80"
            style={{ position: "absolute", bottom: "20px", left: "20px", pointerEvents: "none" }}
          >
            <path d="M5,5 L5,60 Q5,75 20,75 L75,75" stroke="#edea0bfe" strokeWidth="5" fill="none" />
            <circle cx="20" cy="60" r="4" fill="#edea0bfe" />
          </motion.svg>
          {/* Bottom Right Corner */}
          <motion.svg
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            width="80" height="80"
            style={{ position: "absolute", bottom: "20px", right: "20px", pointerEvents: "none" }}
          >
            <path d="M75,5 L75,60 Q75,75 60,75 L5,75" stroke="#edea0bfe" strokeWidth="5" fill="none" />
            <circle cx="60" cy="60" r="4" fill="#edea0bfe" />
          </motion.svg>
        </>
      )}

      {/* Glowing Border Frame */}
      {showText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            position: "absolute",
            inset: "15px",
            border: "5px solid rgba(255, 251, 0, 0.92)",
            borderRadius: "8px",
            pointerEvents: "none",
            boxShadow: "inset 0 0 50px rgba(255,215,0,0.1), 0 0 20px rgba(255,215,0,0.1)",
          }}
        />
      )}


      {/* Additional Animated Shapes - More Visible */}
      {showText && (
        <>
          {/* Large Rotating Diamond - Left */}
          <motion.div
            animate={{
              y: [0, -25, 0],
              rotate: [45, 225, 405],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "40%",
              left: "3%",
              width: "40px",
              height: "40px",
              border: "3px solid #ff6b9d",
              boxShadow: "0 0 15px rgba(255,107,157,0.5)",
              pointerEvents: "none",
            }}
          />
          {/* Large Rotating Diamond - Right */}
          <motion.div
            animate={{
              y: [0, 25, 0],
              rotate: [45, -135, -315],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "45%",
              right: "3%",
              width: "35px",
              height: "35px",
              border: "3px solid #00ced1",
              boxShadow: "0 0 15px rgba(0,206,209,0.5)",
              pointerEvents: "none",
            }}
          />
          {/* Pulsing Circle - Top Left */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "20%",
              left: "15%",
              width: "25px",
              height: "25px",
              border: "3px solid #ffd700",
              borderRadius: "50%",
              boxShadow: "0 0 15px rgba(255,215,0,0.6)",
              pointerEvents: "none",
            }}
          />
          {/* Pulsing Circle - Bottom Right */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: "25%",
              right: "15%",
              width: "30px",
              height: "30px",
              border: "3px solid #ff6b9d",
              borderRadius: "50%",
              boxShadow: "0 0 15px rgba(255,107,157,0.6)",
              pointerEvents: "none",
            }}
          />
          {/* Floating Plus Sign - Left */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "60%",
              left: "5%",
              fontSize: "30px",
              color: "#ab47bc",
              textShadow: "0 0 15px rgba(171,71,188,0.8)",
              pointerEvents: "none",
            }}
          >
            +
          </motion.div>
          {/* Floating Plus Sign - Right */}
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "35%",
              right: "5%",
              fontSize: "25px",
              color: "#ffd700",
              textShadow: "0 0 15px rgba(255,215,0,0.8)",
              pointerEvents: "none",
            }}
          >
            +
          </motion.div>
          {/* Small Stars Scattered */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ position: "absolute", top: "15%", left: "25%", fontSize: "18px", color: "#00ced1", textShadow: "0 0 10px #00ced1", pointerEvents: "none" }}
          >★</motion.div>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ position: "absolute", top: "75%", right: "25%", fontSize: "20px", color: "#ff6b9d", textShadow: "0 0 10px #ff6b9d", pointerEvents: "none" }}
          >★</motion.div>
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ position: "absolute", bottom: "35%", left: "30%", fontSize: "15px", color: "#ffd700", textShadow: "0 0 10px #ffd700", pointerEvents: "none" }}
          >★</motion.div>
        </>
      )}

      {/* Centered Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {/* Decorative Line Top */}
        {showText && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              width: "clamp(250px, 60vw, 600px)",
              height: "4px",
              background: "linear-gradient(90deg, transparent, #ffd700, #ffa500, #ffd700, transparent)",
              marginBottom: "25px",
              borderRadius: "2px",
            }}
          />
        )}

        {/* CULFEST - Colorful 3D Gradient Text */}
        <div style={{ display: "flex", alignItems: "baseline", position: "relative" }}>
          {showText &&
            text.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                style={{
                  fontSize: "clamp(50px, 13vw, 130px)",
                  fontWeight: 400,
                  fontFamily: "'Fredoka One', 'Arial Rounded MT Bold', sans-serif",
                  background: "linear-gradient(180deg, #ff1493 0%, #ff6347 20%, #ffa500 40%, #ffd700 55%, #00ced1 75%, #4169e1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                  filter: "drop-shadow(8px 8px 0 #b0b0b0)",
                }}
              >
                {char}
              </motion.span>
            ))}

          {/* '26 */}
          {showText && (
            <motion.span
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.4, type: "spring" }}
              style={{
                fontSize: "clamp(25px, 6vw, 60px)",
                fontWeight: 700,
                fontFamily: "'Bangers', sans-serif",
                background: "linear-gradient(135deg, #ffd700, #ffb700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginLeft: "10px",
                filter: "drop-shadow(2px 2px 0 #1a1a2e)",
              }}
            >
            </motion.span>
          )}
        </div>

        {/* Decorative Stars/Sparkles */}
        {showText && (
          <>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.3 }}
              style={{
                position: "absolute",
                top: "35%",
                left: "15%",
                fontSize: "24px",
                color: "#ffd700",
                textShadow: "0 0 10px #ffd700",
              }}
            >
              ✦
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.3 }}
              style={{
                position: "absolute",
                top: "30%",
                right: "18%",
                fontSize: "20px",
                color: "#ff6b9d",
                textShadow: "0 0 10px #ff6b9d",
              }}
            >
              ✦
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: "35%",
                left: "20%",
                fontSize: "18px",
                color: "#26c6da",
                textShadow: "0 0 10px #26c6da",
              }}
            >
              ✦
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: "32%",
                right: "15%",
                fontSize: "22px",
                color: "#ab47bc",
                textShadow: "0 0 10px #ab47bc",
              }}
            >
              ✦
            </motion.span>
          </>
        )}

        {/* Tagline */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            {/* Tagline Text */}
            <p
              style={{
                fontSize: "clamp(12px, 1.8vw, 24px)",
                fontWeight: 600,
                fontFamily: "'Montserrat', sans-serif",
                color: "#ffd700",
                letterSpacing: "0.3em",
                textShadow: "0 0 10px rgba(255,215,0,0.4)",
                whiteSpace: "nowrap",
                marginBottom: "15px",
              }}
            >
              WORLD IN MINIATURE
            </p>

            {/* Simple Gold Line Below */}
            <div
              style={{
                width: "clamp(300px, 50vw, 600px)",
                height: "3px",
                background: "linear-gradient(90deg, transparent, #ffd700, #ffd700, transparent)",
                borderRadius: "2px",
              }}
            />
          </motion.div>
        )}


        {/* Bottom Left - Small Cyan Square */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            style={{
              position: "absolute",
              bottom: "15%",
              left: "5%",
              width: "25px",
              height: "25px",
              border: "2px solid #00ced1",
            }}
          />
        )}

        {/* Bottom Right - Small Purple Square */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            style={{
              position: "absolute",
              bottom: "12%",
              right: "4%",
              width: "20px",
              height: "20px",
              border: "2px solid #ab47bc",
            }}
          />
        )}

        {/* Date Badge */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            style={{
              marginTop: "25px",
              padding: "12px 40px",
              background: "linear-gradient(135deg, rgba(255,107,157,0.2), rgba(171,71,188,0.2))",
              border: "2px solid rgba(255,215,0,0.5)",
              borderRadius: "50px",
              fontSize: "clamp(12px, 1.5vw, 20px)",
              fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
              color: "#fff",
              letterSpacing: "0.2em",
            }}
          >
            17 - 19 JANUARY 2026
          </motion.div>
        )}
      </div>
    </div>
  );
}
