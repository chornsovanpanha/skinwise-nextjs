import { Ingredient } from "@prisma/client";
import { IconFlask } from "@tabler/icons-react";
import Link from "next/link";
import { Typography } from "./Typography";

const IngredientListItem = ({ data }: { data?: Ingredient }) => {
  return (
    <Link href={`/ingredient/${data?.alias}`}>
      <div className="flex flex-row gap-5 items-center hover:cursor-pointer hover:bg-primary/20 px-4  py-4">
        <IconFlask className="w-fit h-fit bg-primary  p-4 rounded-full" />

        <section>
          <Typography
            as="p"
            variant="subtitle1"
            className="font-bold text-secondary"
          >
            {data?.name}
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
    </Link>
  );
};

export default IngredientListItem;
