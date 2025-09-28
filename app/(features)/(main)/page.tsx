import { Metadata } from "next";
import LandingDefault from "./default";
export const revalidate = 60; // Rebuild page every 1 minute
export const metadata: Metadata = {
  title: "Home",
  description: "Skinwise landing home page",
};
export default async function Home() {
  return <LandingDefault />;
}
