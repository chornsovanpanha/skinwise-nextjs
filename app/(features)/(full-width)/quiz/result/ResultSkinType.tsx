import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { ProfileWithConcerns } from "@/types";
import { Flower } from "lucide-react";

const ResultSkinType = ({
  onContinue,
  userSkinType,
}: {
  onContinue: () => void;
  userSkinType?: ProfileWithConcerns;
}) => {
  return (
    <section className="result flex flex-col items-center space-y-4">
      <div className="top text-center">
        <Typography as="p" variant="h2" className="text-secondary">
          {userSkinType?.skinType ?? "N/A"}
        </Typography>
        <Typography as="p" variant="default" className="text-secondary">
          You skin products an above average amoun tof oil
          {/* {userSkinType?.concerns?.toString() ?? "N/A"} */}
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
