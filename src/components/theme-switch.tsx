"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  });

  if (!isClient) return "";

  const toggleTheme = async () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <MdOutlineLightMode size={24} />
        ) : (
          <MdOutlineDarkMode size={24} />
        )}
      </button>
    </>
  );
};
