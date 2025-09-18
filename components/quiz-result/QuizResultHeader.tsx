"use client";
import { afterSkinTypeQuestions } from "@/utils/constant/data";
import ProgressBarQuiz from "../quiz/ProgressBarQuiz";
import QuizNavigationBar from "../quiz/QuizNavigationBar";
type QuizResultHeaderProps = {
  title?: string;
  subtitle?: string;
  canGoback?: boolean;
  currIndex: number;
  onPressGoback: () => void;
};
const QuizResultHeader: React.FC<QuizResultHeaderProps> = ({
  canGoback = true,
  subtitle = "",
  title = "",
  currIndex,
  onPressGoback,
}) => {
  const totalProgress = Math.floor(
    (currIndex + 0.9 / afterSkinTypeQuestions?.length) * 100
  );

  return (
    <>
      <QuizNavigationBar
        canGoback={canGoback}
        onPress={onPressGoback}
        subtitle={subtitle}
        title={title}
      />
      <ProgressBarQuiz value={totalProgress} />
    </>
  );
};

export default QuizResultHeader;
