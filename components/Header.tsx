import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBolt,
  IconShieldFilled,
  IconInfoCircle,
  IconLayoutNavbarCollapse,
  IconStarFilled,
  IconUser,
  IconUserPlus,
  IconPhone,
  IconBrandWhatsapp,
  IconMask,
  IconLogout,
} from "@tabler/icons-react";
import { BiNews } from "react-icons/bi";
import { useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function FloatingDockDemo() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const links = [
    {
      title: "Our Team",
      icon: (
        <IconStarFilled className="text-yellow-400" />
      ),
      href: "/ourteam",
    },
    {
      title: isAuthenticated ? "Profile" : "Registration",
      icon: isAuthenticated ? (
        <IconUser className="text-red-400" />
      ) : (
        <IconUserPlus className="text-red-400" />
      ),
      href: isAuthenticated ? "/profile" : "/signup",
    },
    {
      title: "Events",
      icon: (
        <IconBolt className="text-blue-400" />
      ),
      href: "/",
      onclick: () => {
        // console.log("USR");
      },
    },
    {
      title: "Sponsors",
      icon: <IconShieldFilled className="text-green-400" />,
      href: "/sponsors",
    },
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="text-blue-500" />
      ),
      href: "https://www.facebook.com/utk.nitjsr",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="text-pink-400" />
      ),
      href: "https://www.instagram.com/culfest.nitjsr/",
    },
    {
      title: "About",
      icon: (
        <IconMask className="text-purple-400" />
      ),
      href: "/about",
    },
    {
      title: "Media Coverage",
      icon: <BiNews className="text-orange-400" />,
      href: "/media",
    },
    {
      title: "Contact Us",
      icon: <IconPhone className="text-cyan-400" />,
      href: "/contactus",
    },
    {
      title: "Whatsapp Community Link",
      icon: (
        <IconBrandWhatsapp className="text-green-500" />
      ),

      href: "https://chat.whatsapp.com/EOEcrnamcXA1715j3jrdJ6",
    },
    ...(isAuthenticated
      ? [
        {
          title: "Logout",
          icon: <IconLogout className="text-red-500" />,
          href: "#",
          onclick: () => {
            signOut({ callbackUrl: "/" });
          },
        },
      ]
      : []),
  ];

  return (
    <>
      <div className="mt-[-1rem] hidden h-[3rem] items-center justify-center md:block">
        <FloatingDock
          desktopClassName="bg-transparent transition-all duration-300"
          mobileClassName="translate-y-20 bg-transparent transition-all duration-300"
          items={links}
        />
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 shadow-md dark:bg-neutral-800">
              <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <FloatingDock
              desktopClassName="bg-transparent transition-all duration-300"
              mobileClassName="translate-y-20 bg-transparent transition-all duration-300"
              items={links}
              initial={true}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
