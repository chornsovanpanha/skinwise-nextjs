import { Metadata } from "next";
import PersonalQuiz from "./PersonalQuiz";

export const metadata: Metadata = {
  title: "Quiz",
  description: "Skinwise personal quiz",
};
export default async function Home() {
  return <PersonalQuiz />;
}
