"use client";
import { toast } from "sonner";

type ToastType = "success" | "error" | "info";

interface ShowToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
}

export const useToast = () => {
  const show = ({
    type,
    message,
    duration = 3000,
    position = "top-right",
  }: ShowToastProps) => {
    switch (type) {
      case "success":
        toast.success(message, {
          duration,
          position,
          action: {
            label: "Dismiss",
            onClick: (e) => {
              e.preventDefault();
              toast.dismiss();
            },
          },
        });
        break;
      case "error":
        toast.error(message, {
          duration,
          position,
          action: {
            label: "Dismiss",
            onClick: (e) => {
              e.preventDefault();
              toast.dismiss();
            },
          },
        });
        break;
      case "info":
        toast(message, {
          duration,
          position,
          action: {
            label: "Dismiss",
            onClick: (e) => {
              e.preventDefault();
              toast.dismiss();
            },
          },
        });
        break;
      default:
        toast(message, {
          duration,
          position,
          action: {
            label: "Close",
            onClick: (e) => {
              e.preventDefault();
              toast.dismiss();
            },
          },
        });
    }
  };

  return { show };
};
