"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-16"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-6 pl-4 md:gap-8",
              "mx-auto w-full max-w-[90rem]" // Wider container so cards start from further left
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="shrink-0 rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-3">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full border border-yellow-500/50 bg-black/60 transition-all hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(255,215,0,0.4)] disabled:opacity-30"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-yellow-400" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full border border-yellow-500/50 bg-black/60 transition-all hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(255,215,0,0.4)] disabled:opacity-30"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-yellow-400" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 h-screen overflow-auto"
            style={{
              minHeight: "100vh", // Ensure the background covers the full viewport height
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-4 h-fit max-w-5xl rounded-3xl bg-black p-4 font-Bangers dark:bg-neutral-900 md:my-10 md:p-10"
              style={{
                backgroundImage: "url('/Background4.jpg')", // Add the path to your background image
                backgroundSize: "cover", // Ensures the image covers the full screen
                backgroundPosition: "center", // Centers the image
                backgroundAttachment: "fixed", // Keeps the background image fixed when scrolling
                minHeight: "100vh",
              }}
            >
              <button
                className="sticky right-0 top-4 ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-yellow-500/50 bg-black/80 transition-all hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(255,215,0,0.4)]"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-yellow-400" />
              </button>

              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="font-Bangers text-base font-medium tracking-wider text-yellow-400"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 font-Bangers text-3xl tracking-wide text-white md:text-5xl"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="group relative z-10 flex h-[30rem] w-[20rem] flex-col items-start justify-start overflow-hidden rounded-2xl md:h-[40rem] md:w-96"
        style={{
          border: "2px solid rgba(255, 215, 0, 0.3)",
          boxShadow: "0 0 15px rgba(255, 215, 0, 0.1), inset 0 0 15px rgba(0, 0, 0, 0.5)",
        }}
        whileHover={{
          boxShadow: "0 0 25px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.3)",
          borderColor: "rgba(255, 215, 0, 0.6)",
        }}
      >
        {/* Top gradient overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/60 via-transparent to-black/70" />

        {/* Category Badge */}
        <div className="relative z-40 p-6">
          <motion.span
            layoutId={layout ? `category-${card.title}` : undefined}
            className="inline-block rounded-md px-3 py-1 font-Bangers text-sm tracking-wider text-white md:text-base"
            style={{
              background: "linear-gradient(135deg, rgba(255,68,68,0.8), rgba(255,215,0,0.8))",
              border: "1px solid rgba(255,255,255,0.2)",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {card.category}
          </motion.span>
        </div>

        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-40 p-6">
          <motion.p
            className="font-Bangers text-lg tracking-wide text-white md:text-xl"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            {card.title}
          </motion.p>
        </div>

        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 transition-transform duration-500 group-hover:scale-110"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
