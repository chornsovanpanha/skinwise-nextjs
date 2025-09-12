import { skinConcernDummy } from "@/app/(features)/(main)/profile/data";
import React from "react";
import { Typography } from "../Typography";

const ProfileSkinConcernListing = () => {
  return (
    <main className="block sm:grid md:grid-cols-2 lg:grid-cols-3  gap-4 my-4 space-y-4 sm:space-y-0">
      {skinConcernDummy?.map((skinConcern) => (
        <div
          key={skinConcern.id}
          className="flex items-center rounded-2xl border-2 border-primary w-full py-4 px-7 justify-between lg:justify-around hover:scale-105 transition-transform ease-in-out duration-150 hover:bg-primary/20 cursor-pointer "
        >
          <Typography as="p" variant="subtitle1" className="text-secondary">
            {skinConcern.label}
          </Typography>
          <Typography as="p">{skinConcern.emoji}</Typography>
        </div>
      ))}
    </main>
  );
};

export default ProfileSkinConcernListing;
