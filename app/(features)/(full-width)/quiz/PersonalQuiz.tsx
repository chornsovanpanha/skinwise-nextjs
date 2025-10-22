"use client";
import { updateOrInsertQuizAction } from "@/actions/quiz/quiz.action";
import Loading from "@/app/loading";
import { QuizRoutineBg, SkinwiseLogoLight } from "@/assets";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizQuestions from "@/components/quiz/QuizQuestions";
import { analysisUserQuiz } from "@/data/gemini";
import { useToast } from "@/hooks/use-toast";
import { quizAnswerOptionAtom, quizStepIndexAtom } from "@/lib/atom/quiz.atom";
import { QuizOption } from "@/types";
import { quizQuestions } from "@/utils/constant/data";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { startTransition, useLayoutEffect, useState } from "react";

export default function PersonalQuiz() {
  const currentIndex = useAtomValue(quizStepIndexAtom);
  const router = useRouter();
  const { show } = useToast();

  const [loading, setLoading] = useState(false);
  const previousAnswers = useAtomValue(quizAnswerOptionAtom);
  const setAnswer = useSetAtom(quizAnswerOptionAtom);

  const [nextStep, setNextStep] = useAtom(quizStepIndexAtom);

  const handleAnalysis = async () => {
    try {
      const answers = previousAnswers?.map((data) => data.answer);
      setLoading(true);
      const geminiResponse = await analysisUserQuiz({ answers: answers });

      if (geminiResponse) {
        const result = await updateOrInsertQuizAction({
          concerns: geminiResponse?.SkinConcerns ?? [],
          skinType: geminiResponse?.skinType,
          skinTypeDesc: geminiResponse?.skinTypeDesc,
        });
        if (result) {
          startTransition(() => {
            setLoading(false);
            router.push(`/quiz/result`);
          });
        }
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      show({
        type: "error",
        message: `Failed to generate skin type, Please try again.`,
      });
    }
  };
  const handleSelectAnswer = async (option: QuizOption) => {
    setAnswer((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[nextStep] = { answer: option.text };
      return updatedAnswers;
    });

    if (nextStep === quizQuestions.length - 1) {
      return handleAnalysis();
    }

    setNextStep((prev) => prev + 1);
  };

  useLayoutEffect(() => {
    setNextStep(0);
    setAnswer([]);
  }, [setAnswer, setNextStep]);

  return (
    <main>
      {loading && <Loading />}
      <Link prefetch={false} href={"/"}>
        <PageHeader
          title=""
          customDesc={
            <Image
              alt="img-quiz-cover"
              src={SkinwiseLogoLight}
              width={200}
              height={200}
            />
          }
          showBackgroundImg={true}
          backgroundImage={QuizRoutineBg}
        />
      </Link>
      <Wrapper className="flex flex-col">
        <section className="flex flex-col items-center my-6 space-y-6 w-full">
          <QuizHeader />
        </section>

        <section className="quiz-section">
          <QuizQuestions
            data={quizQuestions}
            index={currentIndex}
            key={nextStep + currentIndex}
            previousAnswers={previousAnswers}
            handleSelectAnswer={handleSelectAnswer}
          />
        </section>
      </Wrapper>
    </main>
  );
}
