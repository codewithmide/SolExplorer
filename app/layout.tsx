import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./context/themeProvider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "SolExplorer",
  description: "Next generation Solana data explorer",
  openGraph: {
    images: '/opengraph-image.png'
  },
  twitter: {
    title: "SolExplorer",
    description: "Next generation Solana data explorer",
    images: "/twitter-image.png",
    creator: "@codewithmide"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body>{children}</body> 
        <Analytics/>
      </Providers>
    </html>
  );
}
