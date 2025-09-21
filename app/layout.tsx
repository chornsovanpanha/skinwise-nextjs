import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
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
      <body className="max-h-[100vh] overflow-x-hidden">
        <NextTopLoader color="oklch(0.891 0.125 246.5)" showSpinner={false} />
        <JotaiProvider>{children}</JotaiProvider>
        <Toaster />
        <Monitoring />
      </body>
    </html>
  );
}
