import { skinConcernDummy } from "@/app/(features)/(main)/profile/data";
import clsx from "clsx";
import { Typography } from "../Typography";

type ProfileSkinConcernProps = {
  selected: string[];
  onSelected: (value: string[]) => void;
};

const ProfileSkinConcernListing = ({
  onSelected,
  selected,
}: ProfileSkinConcernProps) => {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onSelected(selected.filter((item) => item !== value));
    } else {
      onSelected([...selected, value]);
    }
  };

  return (
    <main className="block sm:grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 space-y-4 sm:space-y-0">
      {skinConcernDummy?.map((skinConcern) => (
        <div
          onClick={() => handleToggle(skinConcern.value)}
          key={skinConcern.id}
          className={clsx(
            `flex items-center rounded-2xl border-2 border-gray-2 w-full py-4 px-7 justify-between lg:justify-around hover:scale-105 transition-transform ease-in-out duration-150 hover:bg-primary/20 cursor-pointer`,
            {
              "bg-primary/20 hover:bg-primary  border-primary":
                selected.includes(skinConcern.value),
            }
          )}
        >
          <Typography
            as="p"
            variant="subtitle1"
            className={clsx("text-secondary", {
              "text-secondary": selected.includes(skinConcern.value),
            })}
          >
            {skinConcern.label}
          </Typography>
          <Typography as="p">{skinConcern.emoji}</Typography>
        </div>
      ))}
    </main>
  );
};

export default ProfileSkinConcernListing;
