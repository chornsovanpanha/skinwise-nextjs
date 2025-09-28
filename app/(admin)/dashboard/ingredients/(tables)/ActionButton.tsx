import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit, EllipsisVertical, Eye, Trash, Trash2 } from "lucide-react";

type PermissionActions = {
  id: number;
  name: string;
  content: React.ReactNode;
};
const ActionButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const permissionActions: PermissionActions[] = [
    {
      id: 1,
      name: "view",
      content: (
        <Button
          className="w-full justify-start"
          variant="ghost"
          onClick={handleClose}
        >
          <Eye className="h-4 w-4" /> View Item
        </Button>
      ),
    },
    {
      id: 2,
      name: "edit",
      content: (
        <Button
          className="w-full justify-start"
          variant="ghost"
          onClick={handleClose}
        >
          <Edit className="h-4 w-4" /> Edit Item
        </Button>
      ),
    },
    {
      id: 3,
      name: "delete",
      content: (
        <Button
          className="w-full justify-start text-error-main group hover:text-error-text"
          variant="ghost"
          onClick={handleClose}
        >
          <Trash2 className="h-4 w-4 text-error-main group-hover:text-error-text" />
          Delete Item
        </Button>
      ),
    },
  ];
  console.log(id);
  return (
    <Popover open={open} onOpenChange={setOpen}>
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
