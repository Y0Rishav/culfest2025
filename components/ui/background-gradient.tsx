import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  /* eslint-disable @next/next/no-img-element */
  animate = true,
  gradientColors,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  gradientColors?: string[];
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  const gradientStyle = gradientColors
    ? {
      background: `radial-gradient(circle farthest-side at 0 100%, ${gradientColors[0]}, transparent), radial-gradient(circle farthest-side at 100% 0, ${gradientColors[1]}, transparent), radial-gradient(circle farthest-side at 100% 100%, ${gradientColors[2]}, transparent), radial-gradient(circle farthest-side at 0 0, ${gradientColors[0]}, ${gradientColors[1]})`,
      backgroundSize: animate ? "400% 400%" : undefined,
    }
    : {
      backgroundSize: animate ? "400% 400%" : undefined,
    };

  return (
    <div className={cn("group relative p-[4px]", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }
            : undefined
        }
        style={gradientStyle}
        className={cn(
          "absolute inset-0 z-[1] rounded-3xl opacity-80 blur-xl transition  duration-500 will-change-transform group-hover:opacity-100",
          !gradientColors && " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }
            : undefined
        }
        style={gradientStyle}
        className={cn(
          "absolute inset-0 z-[1] rounded-3xl will-change-transform",
          !gradientColors && "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      <div
        className={cn("relative z-10", className)}
      >
        {children}
      </div>
    </div>
  );
};
