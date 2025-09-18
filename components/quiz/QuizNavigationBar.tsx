import { ArrowLeft } from "lucide-react";
import React from "react";
import { Typography } from "../Typography";
type QuizNavigationBarProps = {
  title: string;
  subtitle: string;
  canGoback: boolean;
  onPress: () => void;
};
const QuizNavigationBar: React.FC<QuizNavigationBarProps> = ({
  title,
  canGoback,
  subtitle,
  onPress,
}) => {
  return (
    <header className="flex gap-4 items-center flex-row justify-center">
      {canGoback && (
        <div
          onClick={onPress}
          className="navigation rounded-full bg-secondary p-1 flex items-center hover:cursor-pointer hover:bg-secondary/80"
        >
          <ArrowLeft className="text-primary" />
        </div>
      )}
      <div className="left text-center">
        <Typography as="p" variant="h6" className="text-secondary">
          {title}
        </Typography>
        <Typography as="p" variant="caption" className="text-secondary">
          {subtitle}
        </Typography>
      </div>
    </header>
  );
};

export default QuizNavigationBar;
