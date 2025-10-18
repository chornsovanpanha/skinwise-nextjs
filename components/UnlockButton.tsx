import Link from "next/link";
import { Typography } from "./Typography";

type UnlockButtonProps = {
  className?: string;
  title?: string;
};
const UnlockButton: React.FC<UnlockButtonProps> = ({ className, title }) => {
  return (
    <div className={`w-full ${className}`}>
      <Link
        href={"/pricing"}
        className="bg-secondary px-8 py-5 rounded-full hover:bg-secondary/90"
      >
        <Typography
          variant="subtitle1"
          as="p"
          className="text-primary font-bold text-center"
        >
          {title}
        </Typography>
      </Link>
    </div>
  );
};

export default UnlockButton;
