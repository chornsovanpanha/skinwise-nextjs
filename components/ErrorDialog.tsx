import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, X } from "lucide-react";

type ErrorDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
};

export function ErrorDialog({
  open,
  onClose,
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
}: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl [&>button:last-child]:hidden">
        <DialogClose
          onClick={() => onClose()}
          className="absolute right-3 top-3 rounded-md p-1 text-error-main hover:text-error-main/80 hover:bg-error-main/10"
        >
          <X className="h-5 w-5" />
        </DialogClose>
        <DialogHeader className="flex flex-col items-center space-y-1 text-center">
          <AlertCircle className="h-10 w-10 text-error-main" />
          <DialogTitle className="text-lg sm:text-2xl font-semibold text-error-main">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-md text-error-main text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
