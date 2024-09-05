"use client";

import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeProvider attribute="className" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default Providers;
