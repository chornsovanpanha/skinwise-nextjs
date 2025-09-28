import { brandDeleteAction } from "@/actions/brand/brand.action";
import { ConfirmDialog } from "@/components/ComfirmDialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/tanstack/queryClient";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import { Edit, EllipsisVertical, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { startTransition, useState } from "react";

type PermissionActions = {
  id: number;
  name: string;
  content: React.ReactNode;
};

const ActionButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const { show } = useToast();
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    setLoading(true);
    const { error, success, data } = await brandDeleteAction({ id });
    if (success && data) {
      queryClient.invalidateQueries({ queryKey: [TANSTACKQUERY.BRAND] });
      show({ type: "success", message: "Brand has been deleted" });
    }
    if (error) {
      show({ type: "error", message: error });
    }
    setDialog(false);
    setLoading(false);
  };

  const handleEdit = () => {
    startTransition(() => {
      router.push(`/dashboard/brands/form?id=${id}`);
      handleClose();
    });
  };
  const permissionActions: PermissionActions[] = [
    {
      id: 1,
      name: "edit",
      content: (
        <Button
          className="w-full justify-start"
          variant="ghost"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" /> Edit Item
        </Button>
      ),
    },
    {
      id: 2,
      name: "delete",
      content: (
        <Button
          className="w-full justify-start text-error-main group hover:text-error-text"
          variant="ghost"
          onClick={() => {
            handleClose();
            setDialog(true);
          }}
        >
          <Trash2 className="h-4 w-4 text-error-main group-hover:text-error-text" />
          Delete Item
        </Button>
      ),
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <ConfirmDialog
        open={dialog}
        onClose={() => setDialog(false)}
        onConfirm={handleDelete}
        title="Delete Item?"
        isLoading={loading}
        description="Do you really want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-1 flex flex-col space-y-1">
        {permissionActions.map((action) => (
          <div key={action.id}>{action.content}</div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ActionButton;
