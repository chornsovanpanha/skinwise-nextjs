"use client";
import { quizStepIndexAtom } from "@/lib/atom/quiz.atom";
import { quizQuestions } from "@/utils/constant/data";
import { useAtom } from "jotai";
import ProgressBarQuiz from "./ProgressBarQuiz";
import QuizNavigationBar from "./QuizNavigationBar";

const QuizHeader = () => {
  const [currIndex, setCurrIndex] = useAtom(quizStepIndexAtom);
  const totalProgress = Math.floor((currIndex / quizQuestions?.length) * 100);
  return (
    <>
      <QuizNavigationBar
        canGoback={currIndex > 0}
        onPress={() => setCurrIndex((pre) => pre - 1)}
        subtitle="We will ask you a few questions to help you understand better,"
        title="Welcome to get to know you better"
      />
      <ProgressBarQuiz value={totalProgress} />
    </>
  );
};

export default QuizHeader;
