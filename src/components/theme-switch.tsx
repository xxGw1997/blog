"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}


export const ThemeSwitch = ({ className }: ButtonProps) => {
  // @ts-expect-error experimental API
  const isAppearanceTransition =  document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  });

  if (!isClient) return "";

  const toggleTheme = async () => {
    if (!isAppearanceTransition) {
      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {},
        {
          duration: 500,
          easing: "ease-in",
          pseudoElement:
            theme === "dark"
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <>
      <button className={className} onClick={toggleTheme}>
        {theme === "light" ? (
          <MdOutlineLightMode size={24} />
        ) : (
          <MdOutlineDarkMode size={24} />
        )}
      </button>
    </>
  );
};
