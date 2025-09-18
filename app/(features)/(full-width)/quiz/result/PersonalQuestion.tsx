import QuizQuestions from "@/components/quiz/QuizQuestions";
import { afterSkinTypeQuestions } from "@/utils/constant/data";

const PersonalQuestion = ({
  currIndex,
  handleSelectAnswer,
}: {
  currIndex: number;
  handleSelectAnswer: () => void;
}) => {
  return (
    <section className="quiz-section">
      <QuizQuestions
        data={afterSkinTypeQuestions}
        index={currIndex - 1}
        handleSelectAnswer={handleSelectAnswer}
      />
    </section>
  );
};

export default PersonalQuestion;
