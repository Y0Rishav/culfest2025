import { motion } from "framer-motion";
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
    title: "Webteam",
    icon: (
      <IconDeviceLaptop className="h-full w-full text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
    ),
    href: "webteam",
  },
  // {
  //   title: "SuperCore",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "General Secretary",
  // },
  // {
  //   title: "Joint Secretary",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Joint Secretary",
  // },

  // {
  //   title: "Executive Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Executive Head",
  // },
  // {
  //   title: "Corporate Affairs Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Corporate Affairs Head",
  // },
  // {
  //   title: "Treasurer",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Treasurer",
  // },
  // {
  //   title: "Planning and Development Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Planning and Development Head",
  // },
  // {
  //   title: "Deputy Secretary",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Deputy Secretary",
  // },
  // {
  //   title: "Internal Affairs Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Internal Affairs Head",
  // },
  // {
  //   title: "External Affairs Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "External Affairs Head",
  // },
  // {
  //   title: "Creative Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Creative Head",
  // },
  // {
  //   title: "Design Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Design Head",
  // },
  // {
  //   title: "Event Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Event Head",
  // },
  // {
  //   title: "Logistics Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Logistics Head",
  // },
  // {
  //   title: "Hospitality Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Hospitality Head",
  // },
  // {
  //   title: "Media Cell",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Media Cell",
  // },
  // {
  //   title: "Security Head",
  //   icon: <IconCrown className="text-neutral-500 dark:text-neutral-300" />,
  //   href: "Security Head",
  // },
];

// Team Members Data
const teamMembers = {
  convenors: [
    {
      name: "Mayank",
      post: "Cultural Secretary",
      img: "/our team photos/mayank_JCS.png",
    },
    {
      name: "Priyanshu Dev",
      post: "General Secretary",
      img: "/our team photos/Priyanshu_Dev.jpg",
    },
    {
      name: "Shresth Prasad",
      post: "Cultural Secretary Incharge",
      img: "/our team photos/Shresth_Prasad.jpg",
    },
    {
      name: "Nirmal Niranjan Patil",
      post: "Joint Cultural Secretary",
      img: "/our team photos/Nirmal_Niranjin_Patil.jpg",
    },
    {
      name: "Shreya Sharma",
      post: "Joint Cultural Secretary",
      img: "/our team photos/Shreya_Sharma.jpg",
    },
  ],
  webteam: [
    {
      name: "Harshit Shrivastav",
      post: "Web Head",
      linkedin: "https://www.linkedin.com/in/harshit-shrivastav-8b513127a/",
      github: "https://github.com/harshitnitjsr",
      img: "/our team photos/Harshit_Srivastav1.png",
    },
    {
      name: "Sujal Kumar",
      post: "Web Head",
      linkedin: "https://www.linkedin.com/in/sujal-kumar-552a39237/",
      github: "https://github.com/SUJALKR18",
      img: "/our team photos/Sujal2.png",
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
        <div className="py mt-16 flex w-full justify-center">
          <div className="hidden md:block">
            <FloatingDockLink
              desktopClassName="bg-transparent transition-all duration-300"
              mobileClassName="translate-y-20 bg-transparent transition-all duration-300"
              items={links}
            />
          </div>
          {/* Mobile Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #ffd700, #ff8c00)",
                    border: "2px solid #fff",
                    boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)"
                  }}
                >
                  <IconLayoutNavbarCollapse className="h-6 w-6 text-black" />
                </button>
              </SheetTrigger>
              <SheetContent>
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
        <div className="container relative z-10 mx-auto px-4 py-16">
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
              className="mb-18 "
              variants={fadeContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 className="mb-8 mt-7 text-center font-Bangers text-3xl tracking-wider capitalize sm:text-4xl" style={{ color: "#fbbf24", textShadow: "2px 2px 0px #7f1d1d" }}>
                {section.replace(/([A-Z])/g, " $1").trim()}
              </motion.h2>
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
                {members.map((member: any, index) => (
                  <motion.div
                    key={index}
                    className="w-11/12 transform overflow-hidden rounded-lg shadow-lg transition-transform duration-100 hover:rotate-1 hover:shadow-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,215,0,0.8), rgba(255,68,68,0.8))",
                      border: "2px solid rgba(255,215,0,0.5)",
                    }}
                    variants={fadeItem}
                    whileHover={{
                      scale: 1.1,
                      rotate: 3,
                      transition: { type: "spring", stiffness: 120 },
                    }}
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
                      {section === "supercore" || section === "convenors" ? (
                        <motion.p
                          className="mt-1 font-Bangers text-xl tracking-wide text-gray-200"
                          whileHover={{
                            scale: 1.1,
                            color: "#fdfd96",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {member?.post}
                        </motion.p>
                      ) : (
                        <div className="flex flex-col items-center">
                          <p className="mt-1 mb-3 font-Bangers text-xl tracking-wide text-gray-200">
                            {member.post}
                          </p>
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
                      )}
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
