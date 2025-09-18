import { QuizQuestion } from "@/types";
import React from "react";
type QuizOptionsProps = {
  data: QuizQuestion[];
  renderItem: (item: QuizQuestion, index: number) => React.ReactNode;
};
const QuizSections: React.FC<QuizOptionsProps> = ({ data, renderItem }) => {
  return (
    <div>{data?.map((question, index) => renderItem(question, index))}</div>
  );
};

export default QuizSections;
