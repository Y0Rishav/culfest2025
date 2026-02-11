
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaCity,
  FaUniversity,
  FaGraduationCap
} from "react-icons/fa";
import axios from "axios";
import { Button } from "./ui/button";

import { FloatingDockDemo } from "./Header";
import { motion } from "framer-motion";

const ProfilePage = ({ session, res }: any) => {
  const [user, setUser] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const status = session?.status;

  // Fetch registered events from API
  const fetchRegisteredEvents = async () => {
    try {
      if (session?.status === "authenticated") {
        const response = await axios.post("/api/registeredEvents", {
          user: session?.data?.user,
        });
        setRegisteredEvents(response.data.events || []);
      }
    } catch (error) {
      console.error("Error fetching registered events:", error);
    }
  };

  // Call fetchRegisteredEvents when component mounts
  useEffect(() => {
    if (session?.status === "authenticated") {
      setUser(session?.data?.user || {});
      fetchRegisteredEvents();
    }
  }, [session]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f172a] text-xl font-bold text-white">
        ACCESSING DATABASE...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white font-sans">



      {/* Top Red Border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(175deg, #b91c1c 40%, transparent 40%)",
          zIndex: 15,
          pointerEvents: "none",
        }}
      />

      {/* Bottom Blue Border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "50%",
          height: "100px",
          background: "#1d4ed8",
          clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
          zIndex: 15,
          pointerEvents: "none",
        }}
      />

      {/* 2. Navigation Layer */}
      <div className="relative flex justify-center pt-[20px]" style={{ zIndex: 50 }}>
        <FloatingDockDemo />
      </div>

      {/* 3. Main Content Content */}
      <div className="relative z-20 flex flex-col items-center justify-center p-2 sm:p-4">

        {/* Logo - Static (no animation) */}
        <div className="mb-4">
          <Link href="/">
            <img
              src="/colorLogo.png"
              alt="CULFEST Logo"
              className="h-[60px] md:h-[85px] w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </Link>
        </div>

        {/* HERO DOSSIER CARD */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl overflow-hidden rounded-xl border border-gray-700 bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          {/* Header Strip */}
          <div className="bg-gradient-to-r from-red-700 via-red-600 to-yellow-600 p-1">
            <div className="flex items-center justify-between bg-black/40 px-4 py-2">
              <h2 className="font-mono text-xl font-bold tracking-widest text-white uppercase">
                CLASSIFIED // AGENT PROFILE
              </h2>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded border border-red-500/50 bg-red-900/20 px-2 py-0.5 font-mono text-[10px] font-bold text-red-400 tracking-wider transition-all hover:bg-red-900/40 hover:border-red-400"
                >
                  LOGOUT
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Left Column: ID Card Style */}
            <div className="col-span-1 flex flex-col items-center border-b border-gray-700 pb-6 lg:border-b-0 lg:border-r lg:pr-6">
              <div className="relative h-32 w-32 rounded-full border-4 border-yellow-500 p-1 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <div className="h-full w-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for user image if specific one exists, else icon */}
                  <FaUserCircle className="text-6xl text-gray-400" />
                </div>
              </div>

              <h1 className="mt-4 text-center font-bold text-2xl text-white tracking-wide">
                {user?.name?.toUpperCase() || "UNKNOWN AGENT"}
              </h1>
              <p className="text-yellow-500 font-mono text-sm tracking-wider">
                LEVEL: {registeredEvents?.length || 0}
              </p>

              <div className="mt-6 w-full space-y-3">
                <StatusBadge label="STATUS" value="ACTIVE" color="green" />
                <StatusBadge label="ID" value={user?._id?.slice(-6).toUpperCase() || "######"} color="blue" />
              </div>
            </div>

            {/* Right Column: Details & Stats */}
            <div className="col-span-1 lg:col-span-2 space-y-6">

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DossierData label="EMAIL" value={user?.email} icon={<FaEnvelope />} />
                <DossierData label="PHONE" value={user?.phone} icon={<FaPhone />} />
                <DossierData label="CITY" value={user?.city} icon={<FaCity />} />
                <DossierData label="COLLEGE" value={user?.college} icon={<FaUniversity />} />
                <DossierData label="STATE" value={user?.state} icon={<FaUniversity />} />
                <DossierData label="GRAD YEAR" value={user?.graduationYear} icon={<FaGraduationCap />} />
              </div>

              {/* Missions (Events) */}
              <div className="mt-6 rounded-lg border border-gray-700 bg-gray-900/50 p-4">
                <h3 className="mb-3 font-mono text-sm text-gray-400 uppercase tracking-widest border-b border-gray-700 pb-2">
                  ASSIGNED MISSIONS (REGISTERED EVENTS)
                </h3>
                {registeredEvents.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {registeredEvents.map((event: string, index: number) => (
                      <span key={index} className="px-3 py-1 rounded border border-purple-500/50 bg-purple-900/20 text-purple-300 text-sm font-semibold tracking-wide">
                        {event.toUpperCase()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm">No active missions assigned.</p>
                )}
              </div>

              {/* Payment Status */}
              <div className="mt-4">
                {res?.data?.status === "success" ? (
                  <div className="rounded border border-green-500/30 bg-green-900/10 p-4 text-center">
                    <h3 className="text-green-400 font-bold uppercase tracking-wider mb-2">ACCESS GRANTED: VERIFIED</h3>
                    <a href="https://chat.whatsapp.com/EOEcrnamcXA1715j3jrdJ6" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-green-600 hover:bg-green-700 text-white font-bold border-none">
                        JOIN SECURE COMMS (WHATSAPP)
                      </Button>
                    </a>
                  </div>
                ) : registeredEvents.some((e) =>
                  ["battle of bands", "battle of dance"].includes(
                    e.toLowerCase()
                  )
                ) ? (
                  <div className="rounded border border-yellow-500/30 bg-yellow-900/10 p-3">
                    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                      <div className="text-center sm:text-left">
                        <h3 className="mb-0.5 font-bold tracking-wider text-yellow-400 uppercase text-sm">
                          CREW ACCESS GRANTED
                        </h3>
                        <p className="text-[10px] text-gray-400 leading-tight">
                          Access cleared for Crew Event. Payment required for
                          other individual events.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <a
                          href="https://chat.whatsapp.com/EOEcrnamcXA1715j3jrdJ6"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="w-full border-none bg-green-600 font-bold text-white hover:bg-green-700 sm:w-auto h-8 text-xs px-3">
                            JOIN WHATSAPP
                          </Button>
                        </a>
                        <Link href="/payme">
                          <Button className="w-full border-none bg-gradient-to-r from-red-600 to-orange-600 font-bold text-white shadow-lg hover:shadow-red-500/20 sm:w-auto h-8 text-xs px-3">
                            PAY FOR OTHERS
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-between gap-4 rounded border border-red-500/30 bg-red-900/10 p-4 sm:flex-row">
                    <div>
                      <h3 className="font-bold tracking-wider text-red-400 uppercase">
                        PAYMENT REQUIRED
                      </h3>
                      <p className="text-xs text-gray-400">
                        Clearance pending verification.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link href="/payme">
                        <Button className="border-none bg-gradient-to-r from-red-600 to-orange-600 font-bold text-white shadow-lg hover:shadow-red-500/20">
                          INITIATE PAYMENT
                        </Button>
                      </Link>
                      <a
                        href="https://chat.whatsapp.com/EOEcrnamcXA1715j3jrdJ6"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="font-bold text-white hover:bg-gray-600 focus:bg-gray-700">
                          JOIN GROUP
                        </Button>
                      </a>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Footer Strip */}
          <div className="bg-gray-900 p-2 flex items-center justify-between px-4">
            <span className="text-[10px] text-gray-500 font-mono tracking-widest">
              CONFIDENTIAL // FOR OFFICIAL USE ONLY // CULFEST 2026
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DossierData = ({ label, value, icon }: { label: string, value: string, icon: any }) => (
  <div className="group flex items-start space-x-3 p-2 transition-all hover:bg-white/5 rounded">
    <div className="mt-1 text-yellow-500 opacity-70 group-hover:opacity-100">{icon}</div>
    <div>
      <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="font-sans font-semibold text-gray-200 text-sm">{value || "N/A"}</p>
    </div>
  </div>
);

const StatusBadge = ({ label, value, color }: { label: string, value: string, color: string }) => {
  const colorClasses: any = {
    green: "text-green-400 border-green-900/50 bg-green-900/20",
    blue: "text-blue-400 border-blue-900/50 bg-blue-900/20",
    red: "text-red-400 border-red-900/50 bg-red-900/20",
  };

  return (
    <div className={`flex justify-between items-center rounded border px-3 py-2 ${colorClasses[color] || colorClasses.blue}`}>
      <span className="font-mono text-[10px] opacity-70">{label}</span>
      <span className="font-mono font-bold text-sm tracking-widest">{value}</span>
    </div>
  )
}

export default ProfilePage;
