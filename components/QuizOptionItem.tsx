"use client";
import { QuizOption } from "@/types";
import { Typography } from "./Typography";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

const QuizOptionItem = ({
  item,
  onPress,
  className,
  isSelected,
}: {
  item: QuizOption;
  onPress: () => void;
  className?: string;
  isSelected?: boolean;
}) => {
  return (
    <div
      onClick={onPress}
      className={clsx(
        `border-2 border-primary flex gap-4  justify-between space-y-6 items-center   px-4 py-1 cursor-pointer hover:bg-primary/20 rounded-2xl ${className}`,
        {
          "bg-primary": isSelected,
        }
      )}
    >
      <section className="left flex flex-row gap-2 items-center pt-5">
        <p className="text-2xl">{item.emoji}</p>
        <Typography as="p" variant="body1">
          {item.text}
        </Typography>
      </section>

      <ArrowRight className="hover:cursor-pointer hover:bg-gray-1" />
    </div>
  );
};

export default QuizOptionItem;
