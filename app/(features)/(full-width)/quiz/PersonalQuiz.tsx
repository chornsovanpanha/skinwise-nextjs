"use client";
import { QuizRoutineBg, SkinwiseLogoLight } from "@/assets";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizQuestions from "@/components/quiz/QuizQuestions";
import { quizAnswerOptionAtom, quizStepIndexAtom } from "@/lib/atom/quiz.atom";
import { QuizOption, UserAnswerQuiz } from "@/types";
import { quizQuestions } from "@/utils/constant/data";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PersonalQuiz() {
  const currentIndex = useAtomValue(quizStepIndexAtom);
  const router = useRouter();
  const setAnswer = useSetAtom(quizAnswerOptionAtom);
  const [nextStep, setNextStep] = useAtom(quizStepIndexAtom);

  const handleSelectAnswer = (option: QuizOption) => {
    console.log(nextStep);
    if (nextStep == quizQuestions?.length - 1) {
      return router.push(`/quiz/result`);
    }
    setAnswer((pre: UserAnswerQuiz[]) => pre.concat({ answer: option.text }));
    setNextStep((pre) => pre + 1);
  };
  return (
    <main>
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
      <Wrapper className="flex flex-col">
        <section className="flex flex-col items-center my-6 space-y-6 w-full">
          <QuizHeader />
        </section>

        <section className="quiz-section">
          <QuizQuestions
            data={quizQuestions}
            index={currentIndex}
            handleSelectAnswer={handleSelectAnswer}
          />
        </section>
      </Wrapper>
    </main>
  );
}
