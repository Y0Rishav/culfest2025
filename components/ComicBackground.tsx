"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ComicBackground({ backgroundColor = "#0f172a" }: { backgroundColor?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive Check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // Check on mount
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
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
            ctx.fillStyle = backgroundColor; // Use prop
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

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [backgroundColor]);

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

    // JARVIS HUD RING SVG
    const JarvisRing = ({ style, color = "#00e5ff" }: { style: any, color?: string }) => (
        <svg viewBox="0 0 100 100" style={style}>
            <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="2" fill="none" strokeDasharray="10 5" opacity="0.9" />
            <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="3" fill="none" strokeDasharray="30 20" opacity="1" />
            <circle cx="50" cy="50" r="25" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M50 5 L50 15 M50 95 L50 85 M5 50 L15 50 M95 50 L85 50" stroke={color} strokeWidth="3" />
            <circle cx="50" cy="50" r="3" fill={color} />
        </svg>
    );

    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: backgroundColor, zIndex: 0 }}>
            {/* Canvas Layer */}
            <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

            {/* Halftone Overlay */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(circle, #334155 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                opacity: 0.1,
                pointerEvents: "none"
            }} />

            {/* HUD ELEMENTS */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "2%",
                    width: isMobile ? "80px" : "130px",
                    height: isMobile ? "80px" : "130px",
                    zIndex: 1, opacity: 0.6
                }}
            >
                <JarvisRing style={{ width: "100%", height: "100%" }} />
            </motion.div>

            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "2%",
                    width: isMobile ? "100px" : "160px",
                    height: isMobile ? "100px" : "160px",
                    zIndex: 1, opacity: 0.6
                }}
            >
                <JarvisRing style={{ width: "100%", height: "100%" }} color="#eab308" />
            </motion.div>

            {/* Floating Stones */}
            {[
                { color: "#ef4444", top: "20%", left: isMobile ? "5%" : "85%" },
                { color: "#3b82f6", top: "80%", left: "10%" },
                { color: "#a855f7", top: "15%", left: "15%" },
                { color: "#f59e0b", top: "60%", right: "5%" },
            ].map((stone, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0], opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute", top: stone.top, left: stone.left, right: stone.right as any,
                        width: isMobile ? "20px" : "40px", height: isMobile ? "20px" : "40px",
                        zIndex: 1, pointerEvents: "none"
                    }}
                >
                    <InfinityStone color={stone.color} style={{ width: "100%", height: "100%" }} />
                </motion.div>
            ))}

            {/* GIANT Background "A" Symbol */}
            <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: isMobile ? "100%" : "90vh", height: isMobile ? "auto" : "90vh", aspectRatio: "1/1",
                opacity: 0.05, pointerEvents: "none", zIndex: 0
            }}>
                <AvengersLogo style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
}
