import type { Metadata } from "next";
import { Fraunces, Libre_Franklin, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const franklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-franklin",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Byron Delaney Jr — Quantitative Finance & Data Science",
  description:
    "Portfolio of Byron Delaney Jr, UC Berkeley Applied Mathematics. Software Solutions Architect at MaritAIme. Credit risk modeling, portfolio optimization, and data pipelines.",
  openGraph: {
    title: "Byron Delaney Jr — Quantitative Finance & Data Science",
    description:
      "UC Berkeley Applied Mathematics. Credit risk modeling, portfolio optimization, and data pipelines.",
    url: "https://byrondelaney.com",
    siteName: "Byron Delaney Jr",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${franklin.variable} ${plexMono.variable} font-sans min-h-screen flex flex-col bg-paper text-body`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
