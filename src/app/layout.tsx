import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";
import BackgroundLight from "~/components/background-light";

import Providers from "~/components/providers";

import "~/styles/globals.css";

const myFont = localFont({
  src: [
    {
      path: "./fonts/font.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    template: "%s - xxgw",
    default: "xxgw",
  },
  description: "xxgw's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className="!scroll-smooth">
        <body
          className={`${myFont.className} antialiased flex flex-col relative`}
        >
          <BackgroundLight />
          <Providers>{children}</Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
