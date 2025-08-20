import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";

const ErrorPlaceHolder = ({
  onClick,
  message,
}: {
  onClick: () => void;
  message: string;
}) => (
  <div>
    <div className="w-full">
      <Typography variant="h3" className="text-center text-red-500">
        Opps!!!
      </Typography>
      <Typography
        variant="body1"
        className="text-center mb-4 text-red-400 max-w-4xl line-clamp-3 overflow-hidden"
      >
        {message}
      </Typography>
      <Button
        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-500  w-full h-12 font-bold"
        onClick={onClick}
      >
        Retry Again
      </Button>
    </div>
  </div>
);

export default ErrorPlaceHolder;
