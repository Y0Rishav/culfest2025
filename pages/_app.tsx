import { FloatingDockDemo } from "@/components/Header";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import ComicBackground from "@/components/ComicBackground";
import ChatBot from "@/components/ChatBot";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Show ComicBackground on every page EXCEPT the home page
  const isHomePage = router.pathname === "/" || router.pathname === "/home";

  return (
    <>
      <SessionProvider>
        <main className="relative">
          {!isHomePage && (
            <>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 0,
                  pointerEvents: "none",
                  background: "#0f172a",
                }}
              >
                <ComicBackground backgroundColor="#0f172a" topRingOffset="30%" />
              </div>
              <div className="absolute top-0 left-0 w-full z-50 flex justify-center pt-10 pointer-events-none">
                <div className="pointer-events-auto">
                  <FloatingDockDemo />
                </div>
              </div>
            </>
          )}
          <Component {...pageProps} />
          <ChatBot />
        </main>
      </SessionProvider>
    </>
  );
}
 
