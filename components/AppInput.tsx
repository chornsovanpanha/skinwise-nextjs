"use client";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { Typography } from "./Typography";
import { Label } from "./ui/label";

type AppInputProps = {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  error?: string;
} & React.ComponentProps<"input">;

const AppInput: React.FC<AppInputProps> = ({
  label,
  icon = null,
  className,
  error,
  ...props
}) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <div className={`grid items-start gap-1 w-full`}>
      {label && <Label htmlFor={props.id}>{label}</Label>}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-gray-400 flex items-center h-full">
            {icon}
          </span>
        )}

        <Input
          className={clsx(
            "focus-visible:ring-1 focus:border-1 placeholder:text-gray-4 placeholder:text-sm sm:placeholder:text-md h-10.5",
            {
              "focus-visible:ring-1 focus-visible:ring-error-background focus-visible:border-error-background":
                error,
              "border-error-background border-2 ring-error-main": error,
              "pl-10": icon,
            },
            className || "placeholder:text-gray-4"
          )}
          {...props}
          type={togglePassword ? "text" : props.type}
        />

        {props.type == "password" && (
          <span
            className="absolute inset-y-0 right-2 flex items-center pl-3 text-gray-400"
            onClick={() => setTogglePassword(!togglePassword)}
          >
            {togglePassword ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeClosed className="h-4 w-4" />
            )}
          </span>
        )}
      </div>
      {
        error ? (
          <Typography className="text-error-main" variant="caption" as="p">
            *{error}
          </Typography>
        ) : null
        // <div className="mt-[20px]" />
      }
    </div>
  );
};

export default AppInput;
