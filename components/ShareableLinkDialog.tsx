import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { handleCopyLink } from "@/utils/helpers/Keyboard";
import { useEffect, useState } from "react";

export function ShareableLinkDialog({ link }: { link?: string }) {
  const [open, setOpen] = useState(false);
  const show = useToast();

  useEffect(() => {
    if (link && open) {
      handleCopyLink(link);
      show.show({
        type: "success",
        message: "Link has been copied to clipboard",
      });
    }
  }, [link, open, show]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-2 rounded-2xl">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Routine link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view the routine bellow.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={link ?? ""} readOnly />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
