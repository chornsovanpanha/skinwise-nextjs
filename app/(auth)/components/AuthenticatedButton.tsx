"use client";
import PopoverAvatar from "@/components/PopoverAvatar";
import { UserWithSubscription } from "@/types/prisma";
import Link from "next/link";

const AuthenticatedButton = ({
  profile,
}: {
  profile: UserWithSubscription;
}) => {
  return (
    <main className="space-x-4 flex flex-row items-center  h-full">
      {profile?.subscription?.plan !== "PRO" ? (
        <Link
          href={"/pricing"}
          className="bg-secondary rounded-full text-primary px-6  hover:bg-secondary/90  py-2"
        >
          Get Premium
        </Link>
      ) : null}

      <PopoverAvatar plan={profile?.subscription?.plan} />
    </main>
  );
};

export default AuthenticatedButton;
