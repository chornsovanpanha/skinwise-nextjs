"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Typography } from "./Typography";
import { Label } from "./ui/label";
import { getFlagEmoji } from "@/utils/formatter";

type Option = {
  label: string;
  value: string;
};

type AppSelectProps = {
  options: Option[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  error?: string;
  label?: string;
  type?: "country-code";
};

export const AppSelect: React.FC<AppSelectProps> = ({
  options,
  placeholder = "Select...",
  value,
  error,
  type,
  onValueChange,
  label,
  className,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      {<Label htmlFor="id">{label}</Label>}

      <SelectTrigger className={cn("w-[180px] mt-2", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="space-x-2">
              {option.label}{" "}
              {option.value && type == "country-code" ? (
                <span className="text-lg mt-2">
                  {getFlagEmoji(option.value)}
                </span>
              ) : (
                ""
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
      {error ? (
        <Typography className="text-error-main" variant="caption" as="p">
          *{error}
        </Typography>
      ) : (
        <div className="mt-[20px]" />
      )}
    </Select>
  );
};
