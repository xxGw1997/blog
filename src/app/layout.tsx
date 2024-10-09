import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";

import { Toolbar } from "~/components/toolbar";
import Providers from "~/components/providers";

import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "xxgw",
  description: "xxgw's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <Providers>
            <Toolbar />
            {children}
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
