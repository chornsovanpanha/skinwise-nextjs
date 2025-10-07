"use client";
import { Typography } from "@/components/Typography";
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
    duration = 5000,
    position = "top-right",
  }: ShowToastProps) => {
    switch (type) {
      case "success":
        toast.success(message, {
          duration,
          position,
          style: {
            backgroundColor: "#AFD7E3",
            color: "#142F4D",
          },

          action: {
            label: "Dismiss",
            actionButtonStyle: {
              backgroundColor: "#AFD7E3",
              color: "#142F4D",
            },

            onClick: (e) => {
              e.preventDefault();
              toast.dismiss();
            },
          },
        });
        break;

      case "error":
        toast.custom(
          (id) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                toast.dismiss(id);
              }}
              className="px-4 text-white bg-error-background shadow-md flex justify-between items-center py-4 hover:cursor-pointer"
            >
              <Typography variant="caption" className="text-error-text">
                {message}
              </Typography>
            </div>
          ),
          {
            duration: duration ?? 5000,
            position,
          }
        );
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
