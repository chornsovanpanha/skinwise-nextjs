"use client";
import React, { CSSProperties, JSX } from "react";
import clsx from "clsx";

interface TypographyProps {
  as?: keyof JSX.IntrinsicElements;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "default"
    | "caption"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "button";
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties;
}
const variantStyles: Record<string, string> = {
  label: "text-xs leading-5 font-medium text-black",
  default: "text-sm leading-6 font-normal text-black",
  caption: "text-xs leading-5 font-medium text-black",
  button: "text-sm leading-5 font-semibold text-black",
  subtitle1: "text-base leading-[22px] font-semibold text-black",
  subtitle2: "text-sm leading-5 font-semibold text-black",
  body1: "text-base leading-none font-normal text-black",
  body2: "text-sm leading-5 font-normal text-black",
};

const responsiveStyles: Partial<
  Record<NonNullable<TypographyProps["variant"]>, string>
> = {
  h1: "text-[32px] sm:text-[48px] md:text-[64px] lg:text-[72px] font-bold",
  h2: "text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold",
  h3: "text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold",
  h4: "text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] font-bold",
  h5: "text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold",
  h6: "text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-semibold",
};

export const Typography = ({
  as: Tag = "div",
  variant = "body1",
  className,
  children,
  style,
}: TypographyProps) => {
  return (
    <Tag
      className={clsx(
        "text-black",

        variantStyles[variant],
        responsiveStyles[variant],
        className
      )}
      style={style}
    >
      {children}
    </Tag>
  );
};
