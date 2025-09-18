"use client";
import AppInput from "@/components/AppInput";
import { Typography } from "@/components/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { userAtom } from "@/lib/atom/user.atom";
import { useAtomValue } from "jotai";

const EditProfileForm = () => {
  const currentUser = useAtomValue(userAtom);
  const fallAvatar =
    currentUser?.name?.[0] + currentUser?.name?.[currentUser?.name?.length - 1];
  return (
    <form>
      <header className="flex flex-row gap-5 items-center">
        <Avatar className="h-30 w-30 mb-4">
          <AvatarImage
            src={currentUser.photoUrl?.url ?? ""}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback className="text-lg border">
            {" "}
            {fallAvatar}
          </AvatarFallback>
        </Avatar>
        <Button className="text-secondary">Select Photo</Button>

        <Typography as="p" variant="default" className="text-secondary">
          {currentUser.email}
        </Typography>
      </header>

      <section className="my-4">
        <div>
          <AppInput
            id="firstName"
            label=""
            type="text"
            className="bg-gray-1 py-6 placeholder:text-gray-4"
            placeholder="First Name"
          />
        </div>
        <div>
          <AppInput
            id="lastName"
            label=""
            type="text"
            className="bg-gray-1 py-6 placeholder:text-gray-4"
            placeholder="Last Name"
          />
        </div>
        <div>
          <Textarea
            placeholder="Type your bio here..."
            id="bio"
            rows={7}
            className="resize-none h-40 bg-gray-1 placeholder:text-gray-4"
          />
        </div>
      </section>
    </form>
  );
};

export default EditProfileForm;
