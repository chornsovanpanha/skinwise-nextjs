"use client";
import { QuizOption, QuizQuestion, UserAnswerQuiz } from "@/types";
import QuizOptionItem from "../QuizOptionItem";
import { Typography } from "../Typography";

const Quiz = ({
  item,
  handleSelectAnswer,
  previousAnswer,
  currentIndex,
}: {
  item: QuizQuestion;
  handleSelectAnswer: (option: QuizOption) => void;
  previousAnswer?: UserAnswerQuiz[];
  currentIndex: number;
}) => {
  const selectedAnswer = previousAnswer?.[currentIndex]?.answer;

  return (
    <div className="space-y-4">
      <Typography as="p" variant="h6" className="text-secondary">
        {item.question}
      </Typography>

      <main className="space-y-4">
        {item.options.map((option, index) => (
          <QuizOptionItem
            key={index}
            item={option}
            isSelected={selectedAnswer === option.text}
            onPress={() => handleSelectAnswer(option)}
          />
        ))}
      </main>
    </div>
  );
};

export default Quiz;
