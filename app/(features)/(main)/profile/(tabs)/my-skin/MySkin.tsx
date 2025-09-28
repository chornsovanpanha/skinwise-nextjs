"use client";
import ProfileSkinConcernListing from "@/components/profile/ProfileSkinConcernListing";
import { skinTypeDummy } from "../../data";
import { AppSelect } from "@/components/CustomSelect";
import { Typography } from "@/components/Typography";
import { Separator } from "@/components/ui/separator";
import React from "react";
const MySkin = () => {
  return (
    <div>
      <section className="skin-type flex flex-row w-full justify-between items-center">
        <Typography as="p" variant="body1" className="text-secondary">
          Skin type
        </Typography>
        <div>
          <AppSelect
            placeholder="Your Skin Type"
            value={skinTypeDummy?.at(0)?.value}
            options={skinTypeDummy}
            onValueChange={(val) => console.log("Selected:", val)}
          />
        </div>
      </section>
      <Separator className="my-6 bg-primary" />

      <section className="concern">
        <Typography as="p" variant="body1" className="text-secondary">
          Skin concerns
        </Typography>
        <ProfileSkinConcernListing />
      </section>
    </div>
  );
};

export default MySkin;
