"use client";
import RoutinePreviewListing from "@/components/profile/RoutinePreviewListing";
import { Typography } from "@/components/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { userAtom } from "@/lib/atom/user.atom";
import { CurrentUserRoutine } from "@/types";
import { useAtomValue } from "jotai";
import { ChevronRight, LeafyGreen, Search, SmilePlus } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

const ProfileOverview = ({
  profileRoutine,
}: {
  profileRoutine?: CurrentUserRoutine[];
}) => {
  const router = useRouter();
  const currentUser = useAtomValue(userAtom);
  const fallAvatar =
    currentUser?.name?.[0] ??
    "" + currentUser?.name?.[currentUser?.name?.length - 1];

  const seen = new Set<number>();
  const routines =
    profileRoutine
      ?.flatMap((item) => item?.items ?? [])
      .filter((item) => item?.productId != null)
      .filter((item) => {
        if (seen.has(item.productId)) return false;
        seen.add(item.productId);
        return true;
      }) ?? [];
  const renderSkinConcerns = (concerns?: string[]) => {
    if (!concerns || concerns.length === 0) return "N/A";

    if (concerns.length <= 2) return concerns.join(" & ");

    // More than 2 concerns
    return `${concerns.slice(0, 2).join(", ")} and more`;
  };

  return (
    <div className="block sm:flex flex-row gap-6 items-start  flex-nowrap ">
      <section className="space-y-4 flex-1/3 ">
        <Card className="justify-center items-center ">
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

          <Typography as="p" variant="subtitle1" className="text-secondary">
            {currentUser.name}
          </Typography>
          <Typography as="p" variant="caption" className="text-secondary">
            {currentUser.email}
          </Typography>
        </Card>
        <Button
          className="bg-secondary w-full"
          onClick={() => router.push("/quiz")}
        >
          <Search />
          Idenitfy my skin type
        </Button>
      </section>
      <section className="flex-2/3">
        {/* Profile overview  */}
        <section>
          <header className="space-y-4 mt-4 sm:mt-0">
            <Typography as="p" variant="h6" className="text-secondary">
              About {currentUser.name}
            </Typography>

            <div className="type-skin flex gap-2 items-center">
              <SmilePlus className="w-4 h-4" />
              <Typography as="p" variant="caption" className="text-secondary">
                Skin Type : {currentUser?.skinType ?? "N/A"}
              </Typography>
            </div>
            <div className="convern-skin flex gap-2 items-center">
              <LeafyGreen className="w-4 h-4" />
              <Typography as="p" variant="caption" className="text-secondary">
                Skin Concern: {renderSkinConcerns(currentUser?.skinConcerns)}{" "}
              </Typography>
            </div>
          </header>
        </section>
        <Separator className="my-3" />
        {/* Routine overview  */}
        <section className="routine flex-col space-y-4 my-4">
          <header className="flex flex-row justify-between w-full items-center">
            <Typography as="p" variant="subtitle1" className="text-secondary">
              {currentUser.name} Routine
            </Typography>
            <Button
              variant={"ghost"}
              size={"lg"}
              onClick={() => router.push("/my-routine")}
              className="hover:bg-gray-1 rounded-full w-10 h-8"
            >
              <ChevronRight className="text-secondary w-20 h-20 " />
            </Button>
          </header>
          {/* Routine Listing here  */}
          <RoutinePreviewListing routines={routines} />
        </section>
      </section>
    </div>
  );
};

export default ProfileOverview;
