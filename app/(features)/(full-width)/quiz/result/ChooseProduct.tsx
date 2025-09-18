import { Button } from "@/components/ui/button";

const ChooseProduct = ({
  currentIndex,
  onContinue,
}: {
  currentIndex: number;
  onContinue: () => void;
}) => {
  return (
    <section className="result flex flex-col items-center space-y-4">
      <Button
        onClick={onContinue}
        className="w-[50%] bg-secondary hover:bg-secondary/90 text-primary rounded-2xl"
      >
        I have finished adding my skincare routine {currentIndex}
      </Button>
    </section>
  );
};

export default ChooseProduct;
