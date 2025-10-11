import { userAtom } from "@/lib/atom/user.atom";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useAtomValue } from "jotai";
import { ChevronsUpDown } from "lucide-react";
import { Typography } from "./Typography";
import { Avatar, AvatarImage } from "./ui/avatar";

const UserAvatar = ({
  showIcon = true,
  open,
}: {
  showIcon?: boolean;
  open?: boolean;
}) => {
  const currentUser = useAtomValue(userAtom);

  const name = currentUser?.name ?? "";
  const fallAvatar =
    name.length > 0 ? `${name[0]}${name[name.length - 1]}` : "N/A";

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Avatar className="flex border-1 items-center justify-center">
        <AvatarImage
          src={currentUser?.photoUrl?.url ?? ""}
          referrerPolicy="no-referrer"
          alt="user-avatar"
        />
        <AvatarFallback>{fallAvatar}</AvatarFallback>
      </Avatar>

      {open && (
        <section className="flex-row flex gap-2 items-center w-full justify-between">
          <header>
            <Typography as="p" variant="subtitle2">
              {currentUser.name}
            </Typography>
            <Typography as="p" variant="caption">
              {currentUser.role}
            </Typography>
          </header>

          {showIcon && (
            <div className="flex">
              <ChevronsUpDown />
            </div>
          )}
        </section>
      )}
    </>
  );
};
export default UserAvatar;
