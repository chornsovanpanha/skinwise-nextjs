"use client";
import { QuizRoutineBg, SkinwiseLogoLight } from "@/assets";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import QuizResultHeader from "@/components/quiz-result/QuizResultHeader";
import { quizAnswerOptionAtom, quizStepIndexAtom } from "@/lib/atom/quiz.atom";
import { ProfileWithConcerns } from "@/types";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { startTransition, useEffect, useState } from "react";
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
export default function ResultQuiz({
  userSkinType,
  profileId,
  userId,
}: {
  userSkinType?: ProfileWithConcerns;
  profileId?: number;
  userId?: number;
}) {
  const router = useRouter();
  const [previousAnswers, setPrevAnswers] = useAtom(quizAnswerOptionAtom);
  const searchParams = useSearchParams();
  const setNextStep = useSetAtom(quizStepIndexAtom);
  const [currIndex, setCurrIndex] = useState(0);
  const { title, subtitle } = stepContent[currIndex] ?? {
    title: "Invalid step",
    subtitle: "",
  };
  const clearState = () => {
    setPrevAnswers([]);
    setNextStep(0);
  };
  const clearSingleParam = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");
      clearState();
      router.push("/quiz/profile");
    });
  };
  const onContinue = () => {
    if (currIndex >= 2) {
      //This case user has finish thier setup with routine builder profile
      return clearSingleParam();
    }
    setCurrIndex((pre) => pre + 1);
  };
  useEffect(() => {
    setNextStep(0);
  }, [setNextStep]);

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
      <Wrapper className="flex flex-col items-center w-full">
        <section className="flex flex-col items-center my-6 space-y-6 w-full">
          <QuizResultHeader
            currIndex={currIndex}
            onPressGoback={() => setCurrIndex((pre) => pre - 1)}
            canGoback={currIndex > 0}
            title={title}
            subtitle={subtitle}
          />
        </section>

        {/* Search area section product  */}

        <QuizStep
          currIndex={currIndex}
          profileId={profileId}
          userId={userId}
          userSkinType={userSkinType}
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
  userSkinType?: ProfileWithConcerns;
  profileId?: number;
  userId?: number;
};
function QuizStep({
  currIndex,
  onContinue,
  userSkinType,
  profileId,
  userId,
}: StepProps) {
  switch (currIndex) {
    case 0:
      return (
        <ResultSkinType onContinue={onContinue} userSkinType={userSkinType} />
      );
    case 1:
      return (
        <PersonalQuestion
          currIndex={currIndex}
          handleSelectAnswer={onContinue}
        />
      );
    case 2:
      return (
        <ChooseProduct
          onContinue={onContinue}
          profileId={profileId}
          userId={userId}
        />
      );
    default:
      return <div>Invalid step</div>;
  }
}
