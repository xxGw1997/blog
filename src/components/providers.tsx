"use client";

import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import ActiveSectionContextProvider from "./active-section";

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ActiveSectionContextProvider>{children}</ActiveSectionContextProvider>
    </ThemeProvider>
  );
};

export default Providers;
