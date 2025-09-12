import { Check } from "lucide-react";
import { Typography } from "./Typography";

const AboutItem = ({ data }: { data: string }) => {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="circle rounded-full bg-primary w-fit p-1">
        <Check className="w-4 h-4" />
      </div>
      <Typography as="p" variant="caption" className="text-secondary">
        {data}
      </Typography>
    </div>
  );
};

export default AboutItem;
