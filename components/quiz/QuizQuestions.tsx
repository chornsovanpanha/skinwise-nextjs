"use client";
import { QuizOption, QuizQuestion, UserAnswerQuiz } from "@/types";
import Quiz from "./Quiz";
import QuizSections from "./QuizSections";

const QuizQuestions = ({
  data,
  index,
  handleSelectAnswer,
  previousAnswers,
}: {
  data: QuizQuestion[];
  index: number;
  previousAnswers?: UserAnswerQuiz[];
  handleSelectAnswer: (option: QuizOption) => void;
}) => {
  return (
    <section className="quiz-options space-y-12">
      <QuizSections
        data={data?.slice(index, index + 1)}
        renderItem={(item, newIndex) => (
          <Quiz
            currentIndex={index}
            previousAnswer={previousAnswers}
            item={item}
            key={newIndex}
            handleSelectAnswer={handleSelectAnswer}
          />
        )}
      />
    </section>
  );
};

export default QuizQuestions;
