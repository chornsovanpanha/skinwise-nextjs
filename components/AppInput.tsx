import { Input } from "@/components/ui/input";
import React from "react";
import { Label } from "./ui/label";
import { Eye } from "lucide-react";
import clsx from "clsx";

type AppInputProps = {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  error?: boolean;
} & React.ComponentProps<"input">;

const AppInput: React.FC<AppInputProps> = ({
  label,
  icon,
  className,
  error,
  ...props
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-3 my-4">
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
        />

        {props.type == "password" && (
          <span className="absolute inset-y-0 right-2 flex items-center pl-3 text-gray-400">
            <Eye className="h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  );
};

export default AppInput;
