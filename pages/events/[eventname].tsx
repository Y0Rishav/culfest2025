import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { mockData, EventData } from "../../utils/mockdata";
import { BackgroundGradientDemo } from "@/components/background_gradient";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getEventTheme } from '../../utils/eventThemes';


const EventPage: React.FC = () => {
  const session = useSession();
  const [posts, setPosts] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const [status, setStatus] = useState<string | null>("Loading");
  // console.log(session);
  useEffect(() => {
    if (session.status === "authenticated") {
      setStatus("authenticated");
      const fetchPosts = async () => {
        // Use a function expression here
        try {
          const res = await axios.post("/api/verifyPaymentStatus", {
            session,
          });
          // console.log(res.data);
          setPosts(res.data);
          // console.log(posts);
          if (res.data.message == "Payment not found") {
            setMessage("Payment not found");
          } else if (res.data.message == "User not found") {
            setMessage("User not found");
          } else if (res.data.message == "Payment verified successfully") {
            setMessage("Payment verified successfully");
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchPosts();
    } else if (session.status === "unauthenticated") {
      setStatus("unauthenticated");
    }
  }, [session.status]);
  const router = useRouter();
  const { eventname } = router.query;



  if (!router.isReady || !eventname) {
    return (
      // <div className=">
      <div
        className="bg-black"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "",
          zIndex: 9999, // Ensure it's on top
          pointerEvents: "none", // Allow background elements to remain clickable
        }}
      >
        <div
          className="custom-loader"
          style={{
            pointerEvents: "auto", // Enable interaction for the button only
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 w-full overflow-hidden rounded-md border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-4 py-2 font-semibold text-white"
            style={{
              backgroundClip: "padding-box",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            }}
          >
            <div
              className="absolute inset-0 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-70 blur-lg"
              style={{
                zIndex: -1,
                animation: "glowAnimation 3s linear infinite",
              }}
            ></div>
            Loading ...
          </motion.button>
        </div>
      </div>
      // </div>
    );
  }

  const event: EventData | undefined = mockData.find(
    (item) => item?.id.toLowerCase() === (eventname as string).toLowerCase()
  );

  if (!event) {
    return <p>Event not found!</p>;
  }

  const { rules } = event;
  const theme = getEventTheme(event.eventname, event.category);

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url('${theme.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Head>
        <title>{eventname}</title>
        <meta name="description" content="Explore Event Page" />
      </Head>

      {/* Overlay for readability if image is too bright, using theme gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: theme.overlayGradient,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full">
        {/* Top-left Logo */}
        <Link href="/">
          <img
            src="/colorLogo.png"
            alt="CULFEST Logo"
            className="absolute left-10 top-10 z-50 h-[60px] md:fixed md:h-[100px] w-auto rounded-lg bg-black/30 p-2 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
          />
        </Link>
        <BackgroundGradientDemo
          total={{ event, rules, message, status, eventname, session }}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default EventPage;
