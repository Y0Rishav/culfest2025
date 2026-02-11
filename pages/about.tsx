import React from "react";
import Image from "next/image";
import {
  FaStar,
  FaCalendarAlt,
  FaUsers,
  FaMusic,
  FaPaintBrush,
} from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";

import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Culfest 2026 - Comic Con Edition</title>
        <meta name="description" content="About Culfest 2026 - Comic Con Edition at NIT Jamshedpur" />
        <link rel="icon" href="/culfest_logo.png" />
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Montserrat:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="relative min-h-screen">


        {/* Content Layer */}
        <div className="relative z-10 min-h-screen px-4 pt-[40px] pb-8 text-gray-100 sm:px-8">
          {/* Top bar: Logo + Brochure */}
          <div className="flex items-start justify-between">
            <Link href="/" className="relative" style={{ zIndex: 50 }}>
              <motion.img
                src="/colorLogo.png"
                alt="CULFEST Logo"
                className="h-[60px] md:h-[115px] w-auto rounded-lg bg-black/30 p-2 backdrop-blur-md"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </Link>
            <a
              href="/Culfest.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #b91c1c, #d97706, #1d4ed8)",
                fontFamily: "'Montserrat', sans-serif",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              <span>Brochure</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="currentColor"
                className="h-4 w-auto animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </a>
          </div>

          {/* Main Title */}
          <div className="container mx-auto mt-4 text-center">
            <motion.div
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            >
              <h1
                style={{
                  fontSize: "clamp(32px, 8vw, 80px)",
                  fontFamily: "'Bangers', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "4px",
                  background: "linear-gradient(to bottom, #fcd34d 0%, #d97706 40%, #b45309 60%, #78350f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(4px 4px 0px #7f1d1d)",
                  lineHeight: 1.1,
                }}
              >
                ABOUT CULFEST{" "}
                <span style={{ WebkitTextFillColor: "#fff", filter: "drop-shadow(3px 3px 0px #000)" }}>
                  '26
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(12px, 2.5vw, 24px)",
                  color: "#60a5fa",
                  textTransform: "uppercase",
                  letterSpacing: "4px",
                  marginTop: "8px",
                  textShadow: "0 0 10px rgba(96, 165, 250, 0.6)",
                }}
              >
                COMIC CON EDITION
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
                style={{
                  height: "3px",
                  background: "linear-gradient(90deg, transparent, #60a5fa, transparent)",
                  margin: "8px auto 0",
                }}
              />
            </motion.div>

            {/* Logo Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8"
            >
              <Image
                src="/colorLogo.png"
                alt="Cultural Fest"
                width={500}
                height={320}
                className="mx-auto rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(96, 165, 250, 0.3))",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                }}
              />
            </motion.div>

            {/* About Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-16"
            >
              <h2
                style={{
                  fontFamily: "'Bangers', sans-serif",
                  fontSize: "clamp(24px, 5vw, 42px)",
                  letterSpacing: "3px",
                  color: "#fbbf24",
                  textShadow: "2px 2px 0px #7f1d1d",
                  marginBottom: "20px",
                }}
              >
                About Culfest
              </h2>
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "12px",
                  padding: "24px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "16px", lineHeight: 1.8, opacity: 0.9 }}>
                  Culfest is not just an event; it&apos;s an experience! Hosted
                  annually, it brings together participants from across the globe
                  to celebrate art, music, dance, and everything in between. This
                  is where budding artists find their stage, creative minds find
                  inspiration, and communities come together to revel in the magic
                  of culture.
                </p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "16px", lineHeight: 1.8, opacity: 0.9, marginTop: "16px" }}>
                  Over the years, Culfest has become a beacon of talent and
                  togetherness, featuring workshops, competitions, and
                  electrifying performances that captivate audiences of all ages.
                  Whether you&apos;re an artist, a performer, or simply someone who
                  loves vibrant energy, there&apos;s something here for you.
                </p>
              </div>
            </motion.section>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              {[
                {
                  icon: <FaCalendarAlt className="text-5xl" style={{ color: "#fbbf24", filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))" }} />,
                  title: "Dates",
                  desc: "February 26th to March 1st, 2026",
                  borderColor: "#fbbf24",
                },
                {
                  icon: <FaUsers className="text-5xl" style={{ color: "#a855f7", filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))" }} />,
                  title: "Team",
                  desc: "A collective of passionate organizers making it happen!",
                  borderColor: "#a855f7",
                },
                {
                  icon: <FaStar className="text-5xl" style={{ color: "#ef4444", filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))" }} />,
                  title: "Events",
                  desc: "Live music, dance-offs, art exhibits, and much more!",
                  borderColor: "#ef4444",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${card.borderColor}40` }}
                  style={{
                    background: "rgba(15, 23, 42, 0.85)",
                    border: `1px solid ${card.borderColor}50`,
                    borderRadius: "12px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    backdropFilter: "blur(10px)",
                    cursor: "default",
                  }}
                >
                  {card.icon}
                  <h3 style={{ fontFamily: "'Bangers', sans-serif", fontSize: "24px", letterSpacing: "2px", color: "#e2e8f0" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", opacity: 0.85, color: "#cbd5e1" }}>
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Why Attend Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-16 px-2 text-left sm:px-6"
            >
              <h2
                style={{
                  fontFamily: "'Bangers', sans-serif",
                  fontSize: "clamp(24px, 5vw, 42px)",
                  letterSpacing: "3px",
                  color: "#60a5fa",
                  textShadow: "2px 2px 0px #1e3a5f",
                  marginBottom: "20px",
                }}
              >
                Why Attend Culfest 2026?
              </h2>
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "12px",
                  padding: "24px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "16px", lineHeight: 1.8, opacity: 0.9 }}>
                  Culfest 2026 promises an array of spectacular events,
                  captivating performances, and interactive workshops. Join us to:
                </p>
                <ul style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "16px", lineHeight: 2, opacity: 0.9, marginTop: "16px", paddingLeft: "20px" }}>
                  {[
                    "Immerse yourself in the vibrant world of art and culture.",
                    "Showcase your talent on a platform that celebrates creativity.",
                    "Network with like-minded individuals and industry experts.",
                    "Experience the thrill of live music, dance, and much more!",
                    "Connect with fellow artists, performers, and enthusiasts.",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + i * 0.1 }}
                      style={{
                        listStyleType: "none",
                        position: "relative",
                        paddingLeft: "24px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#fbbf24",
                          fontFamily: "'Bangers', sans-serif",
                          fontSize: "18px",
                        }}
                      >
                        ★
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Highlights Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-12 pb-12"
            >
              <h2
                style={{
                  fontFamily: "'Bangers', sans-serif",
                  fontSize: "clamp(24px, 5vw, 42px)",
                  letterSpacing: "3px",
                  color: "#f43f5e",
                  textShadow: "2px 2px 0px #4a0d1a",
                  marginBottom: "20px",
                }}
              >
                Highlights
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {[
                  {
                    icon: <FaMusic className="text-5xl" style={{ color: "#818cf8", filter: "drop-shadow(0 0 8px rgba(129, 140, 248, 0.5))" }} />,
                    title: "Live Music",
                    desc: "Groove to the beats of live bands, DJ nights, and electrifying performances.",
                    borderColor: "#818cf8",
                  },
                  {
                    icon: <FaPaintBrush className="text-5xl" style={{ color: "#f472b6", filter: "drop-shadow(0 0 8px rgba(244, 114, 182, 0.5))" }} />,
                    title: "Art & Creativity",
                    desc: "Witness stunning art installations, participate in creative workshops, and ignite your imagination.",
                    borderColor: "#f472b6",
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, boxShadow: `0 0 25px ${card.borderColor}40` }}
                    style={{
                      background: "rgba(15, 23, 42, 0.85)",
                      border: `1px solid ${card.borderColor}50`,
                      borderRadius: "12px",
                      padding: "24px",
                      backdropFilter: "blur(10px)",
                      cursor: "default",
                    }}
                  >
                    <div className="mb-4">{card.icon}</div>
                    <h3 style={{ fontFamily: "'Bangers', sans-serif", fontSize: "22px", letterSpacing: "2px", color: "#e2e8f0", marginBottom: "8px" }}>
                      {card.title}
                    </h3>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", opacity: 0.85, lineHeight: 1.7, color: "#cbd5e1" }}>
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>


          </div>
        </div>

        {/* Top Red Border - matching home page */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(175deg, #b91c1c 40%, transparent 40%)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        />

        {/* Bottom Blue Border - matching home page */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "50%",
            height: "100px",
            background: "#1d4ed8",
            clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
};

export default About;
