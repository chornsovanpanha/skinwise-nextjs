import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import { Typography } from "../Typography";
const maxUnit = 10;
const routineListing = [
  {
    id: 1,
    imageUrl: "https://storage.skinsort.com/i381s5wmp3bogavu8qna4pkqi5wm",
  },
  {
    id: 2,
    imageUrl: "https://storage.skinsort.com/i381s5wmp3bogavu8qna4pkqi5wm",
  },
];

const RoutineListing = ({ onPress }: { onPress: () => void }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* **** Main Routine listing preview in the box grid ****  */}

      {routineListing.map((routine) => (
        <Card
          onClick={onPress}
          key={routine.id}
          className="cursor-pointer relative w-full aspect-square overflow-hidden hover:opacity-80 hover:scale-110 transition-transform ease-in-out duration-200"
        >
          <Image
            src={routine.imageUrl}
            alt={`routine-${routine.id}`}
            fill
            className="object-contain"
          />
        </Card>
      ))}

      {/* **** Fill in the box grid ****  */}
      {Array.from({ length: maxUnit - routineListing?.length }, (_, index) => (
        <Card
          key={index}
          className="w-full aspect-square bg-primary/50 border-0 hover:opacity-80 hover:scale-110 transition-transform ease-in-out duration-200"
        />
      ))}

      <div className="col-span-2 md:col-span-3 lg:col-span-5  space-y-1">
        <Typography variant="default" className="text-secondary">
          My Routine
        </Typography>
        <Typography variant="caption" className="text-secondary">
          {routineListing.length} {routineListing.length > 1 ? "steps" : "step"}
        </Typography>
      </div>
    </div>
  );
};

export default RoutineListing;
