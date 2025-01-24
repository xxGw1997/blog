"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { Link as LinkType } from "~/lib/links";
import { useActiveSectionContext } from "../active-section";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

type NavsProps = {
  links: LinkType[];
};

const Navs: React.FC<NavsProps> = ({ links }) => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center justify-center fixed z-[99] -mt-5">
      <ul className="flex flex-wrap items-center justify-center gap-y-1 text-[1rem] font-medium rounded-full backdrop-blur-md">
        {links.map((link) => (
          <li
            key={link.hash}
            className="flex items-center justify-center relative"
          >
            <Link
              href={link.hash}
              className={cn(
                "flex w-full items-center justify-center px-5 py-3 transition",
                "text-shadow-hover transition-all tracking-widest",
                {
                  "text-shadow":
                    activeSection === link.hash || pathname.includes(link.hash),
                }
              )}
              onClick={() => {
                setActiveSection(link.hash);
                setTimeOfLastClick(Date.now());
              }}
            >
              {link.name}
              {(link.hash === activeSection ||
                pathname.includes(link.hash)) && (
                <motion.div
                  className="bg-primary/5 absolute inset-0 -z-10 rounded-full"
                  layoutId="activeSection"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                ></motion.div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;
