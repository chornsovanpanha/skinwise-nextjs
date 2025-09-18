"use client";
import { QuizRoutineBg, SkinwiseLogoLight } from "@/assets";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import QuizResultHeader from "@/components/quiz-result/QuizResultHeader";
import { quizAnswerOptionAtom } from "@/lib/atom/quiz.atom";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import ChooseProduct from "./ChooseProduct";
import PersonalQuestion from "./PersonalQuestion";
import ResultSkinType from "./ResultSkinType";
type StepContent = {
  title: string;
  subtitle?: string;
};

const stepContent: Record<number, StepContent> = {
  0: {
    title: "Your Skin type result is",
    subtitle: "",
  },
  1: {
    title: "You almost there",
    subtitle: "Let set you up with a routine builder that is perfect for you",
  },
  2: {
    title: "Let add your current product",
    subtitle: "Search your product bellow and we can help you build a routine",
  },
};
export default function ResultQuiz() {
  const router = useRouter();
  const previousAnswers = useAtomValue(quizAnswerOptionAtom);
  const [currIndex, setCurrIndex] = useState(0);
  const { title, subtitle } = stepContent[currIndex] ?? {
    title: "Invalid step",
    subtitle: "",
  };
  const onContinue = () => {
    if (currIndex >= 2) {
      router.push("/quiz/profile");
      return;
    }
    setCurrIndex((pre) => pre + 1);
  };
  if (previousAnswers?.length <= 0) {
    //Safe guard to protect if user manually input result from search url
    return redirect("/");
  }
  return (
    <main>
      <PageHeader
        title=""
        customDesc={
          <Image
            alt="img-quiz-result-cover"
            src={SkinwiseLogoLight}
            width={200}
            height={200}
          />
        }
        showBackgroundImg={true}
        backgroundImage={QuizRoutineBg}
      />
      <Wrapper className="flex flex-col">
        <section className="flex flex-col items-center my-6 space-y-6 w-full">
          <QuizResultHeader
            currIndex={currIndex}
            onPressGoback={() => setCurrIndex((pre) => pre - 1)}
            canGoback={currIndex > 0}
            title={title}
            subtitle={subtitle}
          />
        </section>
        <QuizStep
          currIndex={currIndex}
          onContinue={onContinue}
          key={"quiz-step"}
        />
      </Wrapper>
    </main>
  );
}
type StepProps = {
  currIndex: number;
  onContinue: () => void;
};
function QuizStep({ currIndex, onContinue }: StepProps) {
  switch (currIndex) {
    case 0:
      return <ResultSkinType onContinue={onContinue} />;
    case 1:
      return (
        <PersonalQuestion
          currIndex={currIndex}
          handleSelectAnswer={onContinue}
        />
      );
    case 2:
      return <ChooseProduct currentIndex={currIndex} onContinue={onContinue} />;
    default:
      return <div>Invalid step</div>;
  }
}
