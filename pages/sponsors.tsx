import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";

export default function Sponsors() {
  const sponsors = [
    { name: "Swiggy", image: "/swiggy_logo.png" },
    { name: "Ease my trip", image: "/sponsors/24Sponsors/EaseMyTrip.png" },
    { name: "FujiFilm", image: "/sponsors/24Sponsors/fujiFilm.png" },
    { name: "TimesOfIndia", image: "/sponsors/24Sponsors/TimesOfIndia.png" },
    { name: "Campus events", image: "/sponsors/24Sponsors/CampusEvents.png" },
    { name: "IMS", image: "/sponsors/24Sponsors/IMS.png" },
    { name: "Campus music festival", image: "/sponsors/24Sponsors/CampusMusicFestival.png" },
    { name: "Innovaders", image: "/sponsors/24Sponsors/Innovaders.png" },
    { name: "Tattoo tattva", image: "/sponsors/24Sponsors/TattooTattva.png" },
    { name: "99 Pancakes", image: "/sponsors/24Sponsors/99Pancakes.png" },
    { name: "Radio City 911", image: "/sponsors/24Sponsors/RadioCity911.png" },
    { name: "Rollick", image: "/sponsors/24Sponsors/Rollick.png" },
    { name: "Jamshedpur management association", image: "/sponsors/24Sponsors/JamshedpurManagementAssociation.png" },
    { name: "Prabhat Khabar", image: "/sponsors/24Sponsors/PrabhatKhabar.png" },
    { name: "Winkies", image: "/sponsors/previousSponsors/Winkies.png" },
    { name: "Emami fair and handsome", image: "/sponsors/24Sponsors/EmamiFairAndHandsome.png" },
    { name: "Golden Leaf Resort", image: "/sponsors/24Sponsors/GoldenLeafResort.png" },
    { name: "Beyond temptation ", image: "/sponsors/24Sponsors/BeyondTemptation.png" },
    { name: "Verzeo", image: "/sponsors/24Sponsors/Verzeo.png" },
    { name: "Career Launcher", image: "/sponsors/24Sponsors/CareerLauncher.png" },
    { name: "VLCC", image: "/sponsors/24Sponsors/VLCC.png" },
    { name: "Himalaya Haircare", image: "/sponsors/24Sponsors/HimalayaHaircare.png" }
  ];

  const cardColors = ["#ef4444", "#3b82f6", "#a855f7", "#f59e0b", "#22c55e", "#f43f5e", "#818cf8", "#06b6d4"];

  return (
    <>
      <Head>
        <title>Sponsors - Culfest 2026 Comic Con Edition</title>
        <meta name="description" content="Our sponsors for Culfest 2026 Comic Con Edition" />
        <link rel="icon" href="/culfest_logo.png" />
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Montserrat:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="relative min-h-screen">



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

        {/* Content Layer */}
        <div className="relative z-10 min-h-screen px-4 pt-2 pb-16 sm:px-8">
          {/* Logo */}
          <Link href="/" className="relative" style={{ zIndex: 50 }}>
            <img
              src="/colorLogo.png"
              alt="CULFEST Logo"
              className="relative h-[60px] md:h-[115px] w-auto rounded-lg bg-gray-800 bg-opacity-50 p-2 backdrop-blur-md"
              style={{ zIndex: 20 }}
            />
          </Link>

          {/* Main Title */}
          <div className="container mx-auto mt-1 text-center">
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
                OUR SPONSORS
              </h1>
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

            {/* Title Sponsor Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12"
            >
              <h2
                style={{
                  fontFamily: "'Bangers', sans-serif",
                  fontSize: "clamp(20px, 4vw, 36px)",
                  letterSpacing: "3px",
                  color: "#fbbf24",
                  textShadow: "2px 2px 0px #7f1d1d",
                  marginBottom: "16px",
                }}
              >
                Title Sponsor
              </h2>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)" }}
                style={{
                  display: "inline-block",
                  background: "rgba(15, 23, 42, 0.85)",
                  border: "2px solid rgba(251, 191, 36, 0.5)",
                  borderRadius: "16px",
                  padding: "24px 40px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Image
                  src="/titlesp.png"
                  alt="Title Sponsor"
                  width={300}
                  height={200}
                  className="mx-auto"
                  style={{ filter: "drop-shadow(0 0 15px rgba(251, 191, 36, 0.3))" }}
                />
              </motion.div>
            </motion.div>

            {/* Sponsors Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
            >
              {sponsors.map((sponsor, index) => {
                const color = cardColors[index % cardColors.length];
                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 25px ${color}40`,
                    }}
                    style={{
                      background: "rgba(15, 23, 42, 0.85)",
                      border: `1px solid ${color}50`,
                      borderLeft: `4px solid ${color}`,
                      borderRadius: "12px",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      backdropFilter: "blur(10px)",
                      cursor: "default",
                      minHeight: "180px",
                    }}
                  >
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      width={160}
                      height={90}
                      className="object-contain"
                      style={{ maxHeight: "100px" }}
                    />
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#cbd5e1",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {sponsor.name}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
