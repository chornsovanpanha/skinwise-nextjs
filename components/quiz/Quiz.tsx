"use client";
import { QuizOption, QuizQuestion } from "@/types";
import QuizOptionItem from "../QuizOptionItem";
import { Typography } from "../Typography";

const Quiz = ({
  item,
  handleSelectAnswer,
}: {
  item: QuizQuestion;
  handleSelectAnswer: (option: QuizOption) => void;
}) => {
  return (
    <div className="space-y-4">
      <Typography as="p" variant="h6" className="text-secondary">
        {item.question}
      </Typography>

      <main className="space-y-4">
        {item.options.map((option) => (
          <QuizOptionItem
            key={option.id}
            item={option}
            onPress={() => handleSelectAnswer(option)}
          />
        ))}
      </main>
    </div>
  );
};

export default Quiz;
