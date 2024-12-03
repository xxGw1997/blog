import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";

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
        <body className={`${myFont.className} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
