"use client";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Typography } from "./Typography";

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
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={props.id}>{label}</Label>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </span>
        )}
        <Input
          className={clsx(
            `pl-10 ${className} focus-visible:ring-1 focus:border-1`,
            {
              "focus-visible:ring-1 focus-visible:ring-error-background focus-visible:border-error-background":
                error,
              "border-error-background border-2 ring-error-main": error,
            }
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
        {error && (
          <Typography className="text-error-text" variant="caption" as="p">
            {error}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default AppInput;
