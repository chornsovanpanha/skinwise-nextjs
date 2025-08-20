import { AvatarFallback } from "@radix-ui/react-avatar";
import { ChevronsUpDown } from "lucide-react";
import { Typography } from "./Typography";
import { Avatar, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ showIcon = true }: { showIcon?: boolean }) => {
  return (
    <>
      <Avatar className="flex ">
        <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
        <AvatarFallback>CN</AvatarFallback>
        {/*****  User thier name as a fallback  *****/}
      </Avatar>

      <section className="flex-row flex gap-2 items-center w-full justify-between">
        <header>
          <Typography as="p" variant="subtitle2">
            Heng Chomroeun
          </Typography>
          <Typography as="p" variant="caption">
            Super Admin
          </Typography>
        </header>

        {showIcon && (
          <div className="flex">
            <ChevronsUpDown />
          </div>
        )}
      </section>
    </>
  );
};

export default UserAvatar;
