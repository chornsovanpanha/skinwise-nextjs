import { Ingredient } from "@prisma/client";
import { IconFlask } from "@tabler/icons-react";
import Link from "next/link";
import { Typography } from "./Typography";
import HighlightText from "./HighLightText";

const IngredientSearchItem = ({
  data,
  highlight,
}: {
  data?: Ingredient;
  highlight?: string;
}) => {
  return (
    <Link href={`/ingredient/${data?.alias}`}>
      <div className="flex flex-row gap-5 items-center hover:cursor-pointer hover:bg-primary/20 px-6  py-4">
        <div className="flex items-center justify-center w-15 h-15 aspect-square bg-primary rounded-full">
          <IconFlask className="w-fit h-fit " />
        </div>

        <section>
          <Typography
            as="p"
            variant="subtitle1"
            className="font-bold text-secondary"
          >
            <HighlightText highlight={highlight} text={data?.name ?? ""} />
          </Typography>
          <Typography
            as="p"
            variant="default"
            className="font-bold text-secondary text-left"
          >
            Ingredient
          </Typography>
        </section>
      </div>
    </Link>
  );
};

export default IngredientSearchItem;
