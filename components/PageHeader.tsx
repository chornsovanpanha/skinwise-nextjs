import { BannerLanding } from "@/assets";
import Image from "next/image";
import React from "react";
import { Typography } from "./Typography";
import clsx from "clsx";

type PageHeaderProps = {
  title: string;
  desc?: string;
  showBackgroundImg?: boolean;
  backgroundImage?: string;
  showPercentage?: boolean;
  subtitle?: string;
};
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  desc,
  showBackgroundImg = true,
  backgroundImage = BannerLanding,
  showPercentage,
  subtitle,
}) => {
  return (
    <header className=" w-full flex justify-center relative">
      <div className="bg-secondary/80 w-full h-full absolute z-40" />
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
        <Typography as="p" variant="h4" className="text-primary">
          {title}
        </Typography>

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
