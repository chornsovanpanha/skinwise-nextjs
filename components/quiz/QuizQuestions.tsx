"use client";
import { QuizOption, QuizQuestion } from "@/types";
import Quiz from "./Quiz";
import QuizSections from "./QuizSections";

const QuizQuestions = ({
  data,
  index,
  handleSelectAnswer,
}: {
  data: QuizQuestion[];
  index: number;
  handleSelectAnswer: (option: QuizOption) => void;
}) => {
  return (
    <section className="quiz-options space-y-12">
      <QuizSections
        data={data?.slice(index, index + 1)}
        renderItem={(item, index) => (
          <Quiz
            item={item}
            key={index}
            handleSelectAnswer={handleSelectAnswer}
          />
        )}
      />
    </section>
  );
};

export default QuizQuestions;
