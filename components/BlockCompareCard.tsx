"use client";
import clsx from "clsx";
import { Edit2, Plus } from "lucide-react";
import Image from "next/image";
import { Typography } from "./Typography";

interface AddCardProps {
  title: string;
  description: string;
  imagePreview?: string;
  onClick: () => void;
  className?: string;
}

export function BlockCompareCard({
  title,
  description,
  onClick,
  imagePreview,
  className,
}: AddCardProps) {
  return (
    <div
      className={clsx(
        "border-2  block sm:flex flex-row  w-full space-x-4 !border-primary items-center py-6 px-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out hover:bg-primary/10 space-y-4 sm:space-y-0",
        className
      )}
    >
      {/* Left Box */}

      {imagePreview ? (
        <div
          onClick={onClick}
          className="h-[215px]  w-full sm:flex-1/2  relative border border-primary rounded-2xl border-dashed"
        >
          <button
            type="button"
            onClick={onClick}
            className=" z-20 left rounded-full bg-primary sm:flex-1/2 grid place-content-center hover:bg-primary/70 transition cursor-pointer absolute right-[-10] top-[-20] p-2.5"
          >
            <Edit2 className="w-4 h-4 text-secondary" />
          </button>
          <Image
            src={imagePreview}
            alt={`product-${imagePreview}`}
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="left rounded-2xl border border-primary border-dashed w-full sm:flex-1/2 grid place-content-center py-20 hover:bg-primary/10 transition cursor-pointer"
        >
          <Plus className="w-10 h-10 text-primary" />
        </button>
      )}

      {/* Right Box */}
      <div className="right flex-2/4">
        <Typography variant="caption" as="p" className="text-secondary">
          {description}
        </Typography>
        <Typography variant="h6" as="p" className="text-primary">
          {title}
        </Typography>
      </div>
    </div>
  );
}
