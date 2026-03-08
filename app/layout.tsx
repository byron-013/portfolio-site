import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Byron Delaney Jr — Quantitative Finance & Data Science",
  description:
    "Portfolio of Byron Delaney Jr, UC Berkeley Applied Mathematics. Quantitative finance, financial modeling, and machine learning.",
  openGraph: {
    title: "Byron Delaney Jr — Quantitative Finance & Data Science",
    description:
      "UC Berkeley Applied Mathematics. Quantitative finance, financial modeling, and machine learning.",
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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
