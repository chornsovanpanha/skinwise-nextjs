import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Flower } from "lucide-react";
import React from "react";

const ResultSkinType = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <section className="result flex flex-col items-center space-y-4">
      <div className="top text-center">
        <Typography as="p" variant="h2" className="text-secondary">
          Oily
        </Typography>
        <Typography as="p" variant="default" className="text-secondary">
          You skin products an above average amoun tof oil
        </Typography>
      </div>
      <Flower className="w-25 h-25" />

      <Button
        onClick={onContinue}
        className="w-[50%] bg-secondary hover:bg-secondary/90 text-primary rounded-2xl"
      >
        Continue
      </Button>
    </section>
  );
};

export default ResultSkinType;
