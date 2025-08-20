import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import JotaiProvider from "../lib/provider";
import Monitoring from "./(utils)/_monitoring/page";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700"],
});
export const metadata: Metadata = {
  title: {
    default: "Skin Wise",
    template: "Skin Wise | %s",
  },
  description:
    "Discover expert skincare advice, high-quality beauty products, and personalized solutions tailored to your skin type. Glow smarter with Skin Wise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.className}`}>
      <body className="antialiased max-h-[100vh] overflow-x-hidden">
        <JotaiProvider>{children}</JotaiProvider>
        <Monitoring />
      </body>
    </html>
  );
}
