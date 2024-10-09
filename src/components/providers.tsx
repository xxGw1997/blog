"use client";

import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default Providers;
