import { motion } from "framer-motion";
import React from "react";
// import { Link } from "react-scroll";
import Head from "next/head";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  IconUsersGroup,
  IconCrown,
  IconUsers,
  IconChecklist,
  IconLayoutNavbarCollapse,
  IconDeviceLaptop,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { FloatingDockLink } from "@/components/ui/floating-dockLink";
import Link from "next/link";
import ComicBackground from "@/components/ComicBackground";
// Navigation Links
const links = [
  {
    title: "Convenors",
    icon: <IconUsersGroup className="h-full w-full text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />,
    href: "convenors",
  },
  {
    title: "SuperCore",
    icon: <IconCrown className="h-full w-full text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />,
    href: "supercore",
  },
  {
    title: "Core Members",
    icon: <IconUsers className="h-full w-full text-gray-400 drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]" />,
    href: "coreMembers",
  },
  {
    title: "Webteam",
    icon: <IconDeviceLaptop className="h-full w-full text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
    href: "webteam",
  },
];

// Team Members Data
const teamMembers = {
  convenors: [
    { name: "Mayank Raj", post: "Cultural Secretary", img: "/our team photos/Mayank_Raj.jpg" },
    { name: "Shresth Prasad", post: "Cultural Secretary Incharge", img: "/our team photos/Shresth_Prasad.jpg" },
    { name: "Nirmal Niranjan Patil", post: "Joint Cultural Secretary", img: "/our team photos/Nirmal_Niranjin_Patil.jpg" },
    { name: "Shreya Sharma", post: "Joint Cultural Secretary", img: "/our team photos/Shreya_Sharma.jpg" },
  ],
  supercore: [
    { name: "Priyanshu Dev", post: "General Secretary", img: "/our team photos/Priyanshu_Dev.jpg" },
    { name: "Rohit Shukla", post: "Joint Secretary", img: "/our team photos/Rohit_Shukla.jpg" },
    { name: "Harshit Singh", post: "Joint Secretary", img: "/our team photos/Harshit_Singh.jpg" },
    { name: "Ashutosh Kumar Tiwari", post: "Executive Head", img: "/our team photos/Ashutosh_Kumar_Tiwari.jpg" },
    { name: "Shreya Priyadarshini", post: "Executive Head", img: "/our team photos/Shreya_Priyadarshini.jpg" },
    { name: "Prem Tudu", post: "Events Head", img: "/our team photos/Prem_Tudu.jpg" },
    { name: "Kapil Singh", post: "Corporate Affairs Head", img: "/our team photos/Kapil_Singh.jpg" },
    { name: "Priyanka Bardhan", post: "Planning and Development Head", img: "/our team photos/Priyanka_Bardhan.jpg" },
    { name: "Mriganka Mondal", post: "Planning and Development Head", img: "/our team photos/Mriganka_Mondal.jpg" },
    { name: "Yash Kumar Sharma", post: "Public Relations Head", img: "/our team photos/Yash_Kumar_Sharma.jpg" },
    { name: "Khushi Ujjwala", post: "Public Relations Head", img: "/our team photos/Khushi_Ujjwala.jpg" },
    { name: "Abhishek Kumar Gupta", post: "Internal Affairs Head", img: "/our team photos/Abhishek_Kumar_Gupta.jpg" },
    { name: "Sagar Gupta", post: "Internal Affairs Head", img: "/our team photos/Sagar_Gupta.jpg" },
    {
      name: "Harshit Shrivastav",
      post: "Web Head",
      linkedin: "https://www.linkedin.com/in/harshit-shrivastav-8b513127a/",
      github: "https://github.com/harshitnitjsr",
      img: "/our team photos/Harshit_Shrivastav.jpg",
    },
    { name: "Sahil Raj", post: "Design Head", img: "/our team photos/Sahil_Raj.jpg" },
    { name: "Pratyush Kamal", post: "Logistics Head", img: "/our team photos/Pratyush_Kamal.jpg" },
    { name: "Keshav Barnwal", post: "Logistics Head", img: "/our team photos/Keshav_Barnwal.jpg" },
    { name: "Sumit Gupta", post: "Hospitality Head", img: "/our team photos/Sumit_Gupta.jpg" },
    { name: "Priyanshu Raj", post: "EM Head", img: "/our team photos/Priyanshu_Raj.jpg" },
    { name: "Dibyanshu Das", post: "EM Head", img: "/our team photos/Dibyanshu_Das.jpg" },
    { name: "Abhishek Gaurav", post: "Media Cell", img: "/our team photos/Abhishek_Gaurav.jpg" },
  ],
  coreMembers: [
    { name: "Aanchal Sikarwar", post: "Core Member", img: "/our team photos/Aanchal_Sikarwar.jpg" },
    { name: "Chandu Suvas Reddy", post: "Core Member", img: "/our team photos/Chandu_Suvas_Reddy.jpg" },
    { name: "Sarvajeet", post: "Core Member", img: "/our team photos/Sarvajeet.jpg" },
    { name: "Ankit SIngh", post: "Core Member", img: "/our team photos/Ankit_Singh.jpg" },
    { name: "Ayush Raj", post: "Core Member", img: "/our team photos/Ayush_Raj.jpg" },
    { name: "Pratyush Gupta", post: "Core Member", img: "/our team photos/Pratyush_Gupta.jpg" },
    { name: "Khushi", post: "Core Member", img: "/our team photos/Khushi.jpg" },
  ],
  webteam: [
    {
      name: "Sujal Kumar",
      post: "Web team",
      linkedin: "https://www.linkedin.com/in/sujal-kumar-552a39237/",
      github: "https://github.com/SUJALKR18",
      img: "/our team photos/Sujal2.png",
    },
    {
      name: "Aditya Raj",
      post: "Web team",
      linkedin: "https://www.linkedin.com/in/aditya-raj-968a751ba/",
      github: "https://github.com/raj-adi00",
      img: "/our team photos/Aditya_Raj.jpg",
    },
    {
      name: "Krrish kumar",
      post: "Web team",
      linkedin: "https://www.linkedin.com/in/krrish-kumar-bb2aaa328",
      github: "https://github.com/imkrrishgupta",
      img: "/our team photos/Krrish_Kumar.jpeg",
    },
    {
      name: "Harshit Kumar",
      post: "Web team",
      linkedin: "https://www.linkedin.com/in/harshit-kumar-87808b325",
      github: "https://github.com/HarshitKumar890",
      img: "/our team photos/HarshitKumar.jpeg",
    },
    {
      name: "Swayam Agarwal",
      post: "Web team",
      linkedin: "https://www.linkedin.com/in/swayam-agarwal-2b941b323",
      github: "https://github.com/Swayamz-123",
      img: "/our team photos/Swayam_Agarwal.jpeg",
    },
  ],
};

// Animation Variants
const fadeContainer = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Team Component
const Team: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <Head>
        <title>OurTeam</title>
        <meta name="description" content="Explore OurTeam Page" />
        <link rel="icon" href="/culfest_logo.png" />
      </Head>

      <div
        className="relative flex min-h-screen flex-col text-white"
      >
        <ComicBackground backgroundColor="#0a0a1a" />
        {" "}
        <Link href="/" className="absolute left-5 top-5 z-50">
          <img
            src="colorLogo.png"
            alt="CULFEST Logo"
            className="animate-bounce-slow h-[60px] md:h-[115px] w-auto rounded-lg bg-gray-800 bg-opacity-50 p-2 backdrop-blur-md"
          />
        </Link>
        {/* Navigation Menu */}
        <div className="py mt-4 md:mt-16 flex w-full justify-center">
          <div className="hidden md:block">
            <FloatingDockLink
              desktopClassName="bg-transparent transition-all duration-300"
              mobileClassName="translate-y-20 bg-transparent transition-all duration-300"
              items={links}
            />
          </div>
          {/* Mobile Sheet - Positioned to the left of global menu */}
          <div className="md:hidden pointer-events-auto absolute top-5 right-20">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-transform hover:scale-110 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #a855f7)",
                    border: "2px solid #fff",
                    boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)"
                  }}
                >
                  <IconChecklist className="h-6 w-6 text-white" />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <FloatingDockLink
                  desktopClassName="bg-transparent transition-all duration-300"
                  mobileClassName="translate-y-20 bg-transparent transition-all duration-300"
                  items={links}
                  initial={true}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* Main Content */}
        <div className="container relative z-10 mx-auto px-4 py-24 md:py-16">
          <motion.h1
            className="mb-10 text-center font-Bangers text-5xl tracking-wider sm:text-4xl md:text-7xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              type: "spring",
              bounce: 0.4,
            }}
            style={{
              background: "linear-gradient(135deg, #ffd700, #ff4444, #ffd700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(2px 2px 0px rgba(127,29,29,0.5))",
            }}
          >
            Meet the Vibrant Team!
          </motion.h1>

          {/* Render team Sections */}
          {Object.entries(teamMembers).map(([section, members]) => (
            <motion.div
              key={section}
              id={section}
              className="mb-48 "
              variants={fadeContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 className="mb-8 mt-7 text-center font-Bangers text-3xl tracking-wider capitalize sm:text-4xl" style={{ color: "#fbbf24", textShadow: "2px 2px 0px #7f1d1d" }}>
                {section.replace(/([A-Z])/g, " $1").trim()}
              </motion.h2>
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
                {members.map((member: any, index) => (
                  <motion.div
                    key={index}
                    className="w-11/12 transform overflow-hidden rounded-lg shadow-lg transition-transform duration-100 hover:rotate-1 hover:shadow-2xl mx-auto"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,215,0,0.8), rgba(255,68,68,0.8))",
                      border: "2px solid rgba(255,215,0,0.5)",
                    }}
                    variants={fadeItem}
                    whileHover={!isMobile ? {
                      scale: 1.1,
                      rotate: 3,
                      transition: { type: "spring", stiffness: 120 },
                    } : {}}
                  >
                    <div className="relative h-80 w-full bg-gradient-to-b from-white via-pink-200 to-purple-300">
                      <motion.img
                        src={member.img || "/bg14.jpg"}
                        alt={member.name}
                        className="h-full w-full rounded-t-lg object-cover object-top"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="p-6 text-center">
                      <motion.h3
                        className="font-Bangers text-3xl tracking-wide text-white drop-shadow-lg"
                        whileHover={{
                          scale: 1.1,
                          color: "#FFD700",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {member.name}
                      </motion.h3>
                      <div className="flex flex-col items-center">
                        <motion.p
                          className="mt-1 mb-3 font-Bangers text-xl tracking-wide text-gray-200"
                          whileHover={{
                            scale: 1.1,
                            color: "#fdfd96",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {member.post}
                        </motion.p>
                        <div className="flex items-center justify-center gap-4">
                          {member.linkedin && (
                            <Link
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <IconBrandLinkedin className="h-7 w-7" />
                            </Link>
                          )}
                          {member.github && (
                            <Link
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <IconBrandGithub className="h-7 w-7" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
