"use client";
import { Progress } from "@/components/ui/progress";

const ProgressBarQuiz = ({ value }: { value: number }) => {
  return (
    <div className="w-1/2">
      <Progress value={value} className="w-[100%] h-4 [&>div]:bg-secondary" />
    </div>
  );
};

export default ProgressBarQuiz;
