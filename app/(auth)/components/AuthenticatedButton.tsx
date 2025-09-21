"use client";
import PopoverAvatar from "@/components/PopoverAvatar";
import { PlanType, UserWithSubscription } from "@/types/prisma";
import Link from "next/link";

const AuthenticatedButton = ({
  profile,
}: {
  profile: UserWithSubscription;
}) => {
  return (
    <main className="flex flex-row items-center h-full">
      {profile?.subscription?.plan !== "PRO" ? (
        <Link
          href={"/pricing"}
          className="bg-secondary rounded-full text-primary px-6  hover:bg-secondary/90  py-2 mr-6"
        >
          Get Premium
        </Link>
      ) : null}

      <PopoverAvatar plan={profile?.subscription?.plan as PlanType} />
    </main>
  );
};

export default AuthenticatedButton;
