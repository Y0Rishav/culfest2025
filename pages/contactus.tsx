import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import ComicBackground from "@/components/ComicBackground";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      } else {
        setStatus("Failed to send message. Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Culfest 2026</title>
        <meta name="description" content="Contact Culfest 2026 Team" />
        <link rel="icon" href="/culfest_logo.png" />
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Montserrat:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="relative min-h-screen">
        <ComicBackground backgroundColor="#0a0a1a" />
        {/* Content Layer */}
        <div className="relative z-10 min-h-screen px-4 pt-[90px] pb-12 text-gray-100 sm:px-8">

          {/* Logo */}
          <div className="absolute left-5 top-5 z-50">
            <Link href="/">
              <img
                src="/colorLogo.png"
                alt="CULFEST Logo"
                className="h-[60px] md:h-[115px] w-auto rounded-lg bg-black/30 p-2 backdrop-blur-md transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Brochure Button */}
          <div className="absolute right-5 top-5 z-20 flex justify-end">
            <a
              href="/Culfest.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
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

          <div className="container mx-auto max-w-5xl text-center">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "clamp(32px, 6vw, 64px)",
                fontFamily: "'Bangers', sans-serif",
                letterSpacing: "3px",
                background: "linear-gradient(to right, #fcd34d, #f97316, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(3px 3px 0px #7f1d1d)",
                marginBottom: "40px",
              }}
            >
              GET IN TOUCH
            </motion.h1>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Contact Info Card */}
              <motion.section
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-left"
              >
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.85)",
                    border: "2px solid rgba(59, 130, 246, 0.4)",
                    borderRadius: "16px",
                    padding: "32px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.15)",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Bangers', sans-serif",
                      fontSize: "32px",
                      color: "#60a5fa",
                      letterSpacing: "1px",
                      marginBottom: "24px",
                      borderBottom: "2px solid rgba(59, 130, 246, 0.3)",
                      paddingBottom: "10px",
                    }}
                  >
                    CONTACT DETAILS
                  </h2>

                  <div className="space-y-6 font-['Montserrat'] text-gray-200">
                    <div className="group">
                      <p className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">Legal Entity</p>
                      <p className="text-lg">AMRISH YADAV</p>
                    </div>

                    <div className="group">
                      <p className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">Address</p>
                      <p className="text-base leading-relaxed">
                        NIT JAMSHEDPUR, Adityapur,<br />
                        Jamshedpur, Jharkhand - 831014
                      </p>
                    </div>

                    <div className="group">
                      <p className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">Contact</p>
                      <p className="text-lg">+91 91188 41006</p>
                      <p className="text-lg text-blue-300">amrishrock2002@gmail.com</p>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <p className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Core Team</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                          <p className="font-bold text-white">Harshit</p>
                          <p className="text-sm text-gray-400">Registration</p>
                          <p className="text-blue-400 font-mono text-sm mt-1">+91 89571 44430</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                          <p className="font-bold text-white">Shresth Prasad</p>
                          <p className="text-sm text-gray-400">Events</p>
                          <p className="text-blue-400 font-mono text-sm mt-1">+91 82269 07863</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 md:col-span-2">
                          <div className="flex flex-col gap-1">
                            <div>
                              <p className="font-bold text-white">Priyanshu Dev</p>
                              <p className="text-sm text-gray-400">Events</p>
                            </div>
                            <p className="text-blue-400 font-mono text-sm mt-1">+91 73078 34859</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Contact Form */}
              <motion.section
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-left"
              >
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.85)",
                    border: "2px solid rgba(236, 72, 153, 0.4)",
                    borderRadius: "16px",
                    padding: "32px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 30px rgba(236, 72, 153, 0.15)",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Bangers', sans-serif",
                      fontSize: "32px",
                      color: "#f472b6",
                      letterSpacing: "1px",
                      marginBottom: "24px",
                      borderBottom: "2px solid rgba(236, 72, 153, 0.3)",
                      paddingBottom: "10px",
                    }}
                  >
                    SEND A MESSAGE
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-pink-400 uppercase tracking-wider mb-2 font-['Montserrat']">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg bg-gray-900/80 border border-gray-600 p-3 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all font-['Montserrat']"
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-pink-400 uppercase tracking-wider mb-2 font-['Montserrat']">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg bg-gray-900/80 border border-gray-600 p-3 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all font-['Montserrat']"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-pink-400 uppercase tracking-wider mb-2 font-['Montserrat']">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full rounded-lg bg-gray-900/80 border border-gray-600 p-3 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all font-['Montserrat']"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                        fontFamily: "'Bangers', sans-serif",
                        fontSize: "24px",
                        letterSpacing: "2px",
                      }}
                      className="w-full rounded-lg py-3 text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? "SENDING..." : "SEND MESSAGE"}
                    </button>

                    {status && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-center font-['Montserrat'] font-semibold ${status.includes("success") ? "text-green-400" : "text-red-400"}`}
                      >
                        {status}
                      </motion.p>
                    )}
                  </form>
                </div>
              </motion.section>
            </div>
          </div>
        </div>

        {/* Decorative Borders */}

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

export default ContactUs;
