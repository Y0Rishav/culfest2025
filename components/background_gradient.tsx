"use client";
import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { getEventTheme } from "@/utils/eventThemes";

// Component for rendering interactive event details with theme support
export function BackgroundGradientDemo({ total, theme }: { total: any; theme?: any }) {
  const { data: session, status } = useSession();
  const [teamName, setTeamName] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [successfullyUpdated, setSuccessfulupdates] = useState<any>([]);
  const [failedupdates, setFailedupdates] = useState<any>([]);

  // Get theme based on event name and category, falling back to default if data missing
  const currentTheme = theme || (total?.eventname ? getEventTheme(total.eventname, total.category) : {
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    accentColor: "#60a5fa",
    textColor: "#ffffff",
    headingFont: "font-Piedra",
    bodyFont: "font-Quicksand font-bold",
    headingFontFamily: "Piedra, cursive",
    bodyFontFamily: "Quicksand, sans-serif",
  });

  // Fetch registered events from API
  const fetchRegisteredEvents = async () => {
    try {
      if (status === "authenticated") {
        const response = await axios.post("/api/registeredEvents", {
          user: session?.user,
        });
        setRegisteredEvents(response.data.events || []);
      }
    } catch (error) {
      console.error("Error fetching registered events:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchRegisteredEvents();
  }, [status]);

  const handleAddParticipant = () => {
    setParticipants([...participants, ""]);
    setError(null);
  };

  const handleRemoveParticipant = (index: number) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
    setError(null);
  };

  const handleParticipantChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = value.trim();
    setParticipants(updatedParticipants);
    setError(null);
  };

  const validateEmails = (): boolean => {
    const emailSet = new Set(participants);
    if (emailSet.size !== participants.length) {
      setError("All email addresses must be unique.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (validateEmails()) {
      try {
        const response = await axios.post("/api/registerEvent", {
          userEmails: participants,
          event: total?.eventname.toString().toLowerCase(),
          session: { data: session },
          teamName: teamName,
        });

        if (response.status === 200) {
          if (response?.data?.message === "no of participants not satisfied") {
            setError("Number of participants not satisfied");
          } else if (response?.data?.message === "Event registration processed") {
            setFailedupdates(response.data.data.failedUpdates);
            setSuccessfulupdates(response.data.data.successfulUpdates);
            setParticipants([]);
          }
        }

        if (response.status === 200 && response?.data?.message === "no of participants not satisfied") {
          setError("Number of participants not satisfied");
          return;
        }
        setFailedupdates(response.data.data.failedUpdates);
        if (response?.data?.data?.failedUpdates?.length > 0) {
          setError(response.data.message);
          setTimeout(() => setError(null), 2000);
        }
        setSuccessfulupdates(response.data.data.successfulUpdates);
        setLoading(false);
      } catch (error: any) {
        if (error?.response?.data?.data?.failedUpdates?.length > 0)
          setFailedupdates(error.response.data.data.failedUpdates);
        else
          setError(error?.response?.data?.data?.message || "Failed to register");
        setError(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const event = total?.event;
  const mssg = total?.message;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonStyle = {
    background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
    border: `1px solid ${currentTheme.accentColor}`,
    color: '#fff',
  };

  return (
    <div className="p-4">
      <BackgroundGradient className="rounded-[22px] bg-zinc-900/90 backdrop-blur-md p-2 sm:p-6 lg:p-10 border border-white/10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center justify-center gap-6">

            <motion.div variants={itemVariants} className="text-center z-10">
              <div
                className={`mb-2 mt-4 text-3xl sm:text-4xl lg:text-6xl text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] ${currentTheme.headingFont}`}
                style={{ color: currentTheme.accentColor }}
              >
                {event?.eventname}
                {`!!`}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full max-w-[250px] p-1 sm:max-w-[300px] lg:max-w-[400px] rounded-lg"
              style={{ background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.accentColor})` }}
            >
              <Image
                src={event?.image}
                alt="Event Image"
                height={600}
                width={600}
                className="h-auto w-full rounded-lg object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className={`mt-4 p-6 text-center text-lg drop-shadow-[0_0_3px_black] dark:text-white sm:text-lg lg:text-xl leading-relaxed ${currentTheme.bodyFont}`}
            style={{ color: currentTheme.textColor }}
          >
            {event?.description}
          </motion.div>
        </motion.div>
      </BackgroundGradient>

      {/* Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`mt-6 rounded-[22px] border-4 p-4 text-sm font-bold text-white shadow-lg sm:p-6 sm:text-base lg:text-lg ${currentTheme.bodyFont}`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Darker background for contrast
          backdropFilter: "blur(10px)",
          borderColor: currentTheme.accentColor,
          fontFamily: "'Montserrat', sans-serif" // Enforcing Montserrat for body
        }}
      >
        <div
          className={`mb-6 mt-6 text-center text-3xl sm:text-4xl lg:text-5xl drop-shadow-lg`}
          style={{
            color: currentTheme.accentColor,
            fontFamily: "'Bangers', cursive", // Enforcing Bangers for this heading
            letterSpacing: "2px"
          }}
        >
          {`DETAILS OF THE EVENT`}
        </div>

        {/* Dynamic Rules Container with creative styling, solid borders, and hover effects */}
        <div
          className="prose prose-invert max-w-none text-left 
            [&_p]:!font-sans [&_p]:!text-sm [&_p]:sm:!text-base [&_p]:lg:!text-lg [&_p]:!leading-relaxed [&_p]:!text-white [&_p]:!mb-6
            [&_span]:!font-['Bangers'] [&_span]:!text-xl [&_span]:sm:!text-2xl [&_span]:!tracking-wide [&_span]:!inline [&_span]:!mr-2 
            
            /* Apply box styling to both divs AND direct paragraphs to catch all sections */
            [&_div]:!border-2 [&_div]:!border-dashed [&_div]:!border-white/50 [&_div]:!rounded-xl [&_div]:!bg-white/5 [&_div]:!backdrop-blur-sm [&_div]:!shadow-[0_0_15px_rgba(255,255,255,0.1)] [&_div]:!mb-6 [&_div]:!mt-4
            [&_div]:!transition-all [&_div]:!duration-300 [&_div]:hover:!scale-[1.01] [&_div]:hover:!shadow-[0_0_25px_rgba(255,255,255,0.2)]
            
            [&>p]:!border-2 [&>p]:!border-dashed [&>p]:!border-white/50 [&>p]:!rounded-xl [&>p]:!bg-white/5 [&>p]:!backdrop-blur-sm [&>p]:!shadow-[0_0_15px_rgba(255,255,255,0.1)] [&>p]:!p-4 [&>p]:!mt-4
            [&>p]:!transition-all [&>p]:!duration-300 [&>p]:hover:!scale-[1.01] [&>p]:hover:!shadow-[0_0_25px_rgba(255,255,255,0.2)]

            /* Alternating Heading Colors for visual variety */
            [&_p:nth-of-type(4n+1)_span]:!text-yellow-400
            [&_p:nth-of-type(4n+2)_span]:!text-cyan-400
            [&_p:nth-of-type(4n+3)_span]:!text-green-400
            [&_p:nth-of-type(4n+4)_span]:!text-pink-400
            [&_div_span]:!text-red-400"
          style={{
            "--body-font": "'Montserrat', sans-serif",
            "--heading-font": "'Bangers', cursive",
          } as React.CSSProperties}
        >
          {total?.rules ? total?.rules : "No rules available."}
        </div>

        <div className="flex justify-center mt-12 pb-10">
          {status === "unauthenticated" && (
            <Link href={"/login"}>
              <Button className="transform px-8 py-4 font-semibold text-white shadow-lg hover:scale-105" style={buttonStyle}>
                Login to Participate
              </Button>
            </Link>
          )}

          {/* Payment / Participation Logic */}
          {status === "authenticated" && (
            <>
              {mssg === "Payment not found" && (
                <Link href={"/payme"}>
                  <Button className="transform px-8 py-4 font-semibold text-white shadow-lg hover:scale-105" style={buttonStyle}>
                    Pay to Participate
                  </Button>
                </Link>
              )}

              {mssg === "User not found" && (
                <Link href={"/login"}>
                  <Button className="transform px-8 py-4 font-semibold text-white shadow-lg hover:scale-105" style={{ background: 'red' }}>
                    User Verification Failed - Login Again
                  </Button>
                </Link>
              )}

              {registeredEvents.includes(total?.eventname.toString().toLowerCase()) && (
                <div className="m-2 px-6 py-3 rounded bg-green-600 text-white font-bold tracking-wider">
                  ALREADY AGENT // REGISTERED
                </div>
              )}

              {!registeredEvents.includes(total?.eventname.toString().toLowerCase()) && mssg === "Payment verified successfully" && (
                <Dialog>
                  <DialogTrigger>
                    <Button className="transform px-8 py-4 font-semibold text-white shadow-lg hover:scale-105" style={buttonStyle}>
                      Participate in {total?.eventname}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-zinc-900 text-white border-zinc-700">
                    <DialogHeader>
                      <DialogTitle className={`text-2xl ${currentTheme.headingFont} text-center`} style={{ color: currentTheme.accentColor }}>
                        Participate in {total?.eventname}
                      </DialogTitle>
                      <DialogDescription>
                        <div className={`w-full max-w-md rounded p-4 ${currentTheme.bodyFont}`}>
                          <h2 className="mb-4 text-xl font-bold text-white">Add Participants</h2>
                          <form onSubmit={handleSubmit}>
                            <input
                              type="text"
                              value={teamName}
                              onChange={(e) => setTeamName(e.target.value)}
                              placeholder={"Enter Team Name"}
                              className="mb-5 w-full gap-5 rounded border border-zinc-600 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-white focus:outline-none"
                              required
                            />
                            {participants.map((email, index) => (
                              <div key={index} className="mb-3 flex items-center">
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => handleParticipantChange(index, e.target.value)}
                                  placeholder={`Participant ${index + 1} Email`}
                                  className="w-full rounded border border-zinc-600 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-white focus:outline-none"
                                  required
                                />
                                {participants.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveParticipant(index)}
                                    className="ml-2 text-red-500 hover:text-red-400"
                                  >
                                    -
                                  </button>
                                )}
                              </div>
                            ))}
                            {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

                            <div className="flex justify-between items-center mt-4">
                              <button
                                type="button"
                                onClick={handleAddParticipant}
                                className="flex items-center font-semibold text-blue-400 hover:text-blue-300"
                              >
                                <span className="mr-2">+</span> Add Participant
                              </button>
                              <button
                                type="submit"
                                className="rounded px-4 py-2 text-white shadow-lg transform hover:scale-105 transition-all"
                                style={buttonStyle}
                                disabled={loading}
                              >
                                {loading ? "Loading..." : "Submit"}
                              </button>
                            </div>
                          </form>

                          <div className="mt-6">
                            {successfullyUpdated?.length > 0 && (
                              <div className="mb-4">
                                <h3 className="text-lg font-semibold text-green-400">Successful Updates:</h3>
                                <ul className="list-disc pl-5">
                                  {successfullyUpdated.map((email: any, index: any) => (
                                    <li key={index} className="text-zinc-300">{email}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {failedupdates?.length > 0 && (
                              <div>
                                <h3 className="text-lg font-semibold text-red-500">Failed Updates:</h3>
                                <ul className="list-disc pl-5">
                                  {failedupdates.map((update: { email: string; reason: string }, index: number) => (
                                    <li key={index} className="text-zinc-300">
                                      <p>{update.email} - {update.reason}</p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Ensure the necessary imports are included
import { motion } from "framer-motion";
import { Button } from "./ui/button";
