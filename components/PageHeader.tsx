import { BannerLanding } from "@/assets";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Typography } from "./Typography";

type PageHeaderProps = {
  title: string;
  desc?: string;
  showBackgroundImg?: boolean;
  backgroundImage?: StaticImageData;
  showPercentage?: boolean;
  subtitle?: string;
  customDesc?: React.ReactNode;
};
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  desc,
  showBackgroundImg = true,
  backgroundImage = BannerLanding,
  showPercentage,
  subtitle,
  customDesc,
}) => {
  return (
    <header className=" w-full flex justify-center relative z-[10]">
      <div className="bg-secondary/80 w-full h-full absolute z-[10]" />
      {showBackgroundImg && (
        <Image
          src={backgroundImage}
          alt="banner-img"
          fill
          className="object-cover absolute  w-full h-full"
        />
      )}

      <div
        className={clsx("justify-center w-full flex z-50 py-12", {
          "flex-col items-center": showPercentage,
        })}
      >
        <header>
          <Typography as="p" variant="h4" className="text-primary">
            {title}
          </Typography>
          {customDesc && customDesc}
        </header>

        <section className="text-center">
          {showPercentage && desc && (
            <Typography as="p" variant="caption" className="text-primary">
              {desc}
            </Typography>
          )}
          {showPercentage && subtitle && (
            <Typography as="p" variant="h2" className="text-primary">
              {subtitle}
            </Typography>
          )}
        </section>
      </div>
    </header>
  );
};

export default PageHeader;
