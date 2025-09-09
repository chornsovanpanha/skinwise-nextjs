import { Ingredient } from "@/types";
import { IconFlask } from "@tabler/icons-react";
import { Typography } from "./Typography";

const IngredientListItem = ({ data }: { data: Ingredient }) => {
  return (
    <div className="flex flex-row gap-5 items-center">
      <IconFlask className="w-fit h-fit bg-primary  p-4 rounded-full" />

      <section>
        <Typography
          as="p"
          variant="subtitle1"
          className="font-bold text-secondary"
        >
          {data.name}
        </Typography>
        <Typography
          as="p"
          variant="default"
          className="font-bold text-secondary"
        >
          Ingredient
        </Typography>
      </section>
    </div>
  );
};

export default IngredientListItem;
