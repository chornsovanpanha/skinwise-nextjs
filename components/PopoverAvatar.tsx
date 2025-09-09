import { LogoutAction } from "@/actions/authentication/logout.action";
import { defaultState } from "@/app/(auth)/components/SocialButton";
import Loading from "@/app/loading";
import { useToast } from "@/hooks/use-toast";
import { defaultUserState, userAtom } from "@/lib/atom";
import { auth } from "@/lib/firebase/config";
import { clearGoogleLogout } from "@/utils/social/clear-auth";
import { signOut } from "firebase/auth";
import { useAtomValue, useSetAtom } from "jotai";
import { LogOut, User } from "lucide-react";
import { redirect } from "next/navigation";
import { startTransition, useState } from "react";
import { Typography } from "./Typography";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

const PopoverAvatar = () => {
  const currentUser = useAtomValue(userAtom);
  const fallAvatar =
    currentUser?.name?.[0] + currentUser?.name?.[currentUser?.name?.length - 1];
  const [mutateState, setMutatestate] = useState(defaultState);
  const { show } = useToast();
  const [open, setOpen] = useState(false);
  const setUserAtom = useSetAtom(userAtom);
  const handleViewProfile = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    setMutatestate((pre) => ({
      ...pre,
      loading: true,
    }));
    setOpen(false);
    await clearGoogleLogout();
    await signOut(auth);

    const { error } = await LogoutAction();
    if (!error) {
      startTransition(() => {
        setMutatestate(defaultState);
        setUserAtom(defaultUserState);
        show({ type: "success", message: `Logout successfully` });
        redirect("/login");
      });
    } else {
      console.error(error);
      show({
        type: "error",
        message: JSON.stringify(error),
      });

      setMutatestate((pre) => ({
        ...pre,
        error: error as string,
        loading: false,
      }));
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {mutateState?.loading && <Loading />}
      <PopoverTrigger className="pt-1">
        <Avatar>
          <AvatarImage
            src={currentUser?.photoUrl?.url ?? ""}
            referrerPolicy="no-referrer"
          />
          {currentUser?.name && (
            <AvatarFallback className="border-1">
              {fallAvatar?.toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="pt-8 space-y-2 rounded-lg bg-gray-50 ">
        <section className="">
          <Typography as="p" variant="default" className="text-gray-6 ">
            {currentUser?.name}
          </Typography>
          <Typography
            as="p"
            variant="caption"
            className="font-semibold text-secondary"
          >
            {currentUser?.email}
          </Typography>
        </section>
        <Separator className="bg-gray-2" />
        <section
          className="flex items-center w-full justify-between p-2 hover:bg-gray-2 hover:cursor-pointer"
          onClick={handleViewProfile}
        >
          <Typography as="p" variant="button" className="text-secondary">
            View Profile
          </Typography>
          <User className="w-5 h-5 text-secondary" />
        </section>
        <section
          className="flex items-center w-full justify-between p-2 hover:bg-gray-2 hover:cursor-pointer"
          onClick={handleLogout}
        >
          <Typography as="p" variant="button" className="text-error-main">
            Logout
          </Typography>
          <LogOut className="w-5 h-5 text-error-main" />
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverAvatar;
