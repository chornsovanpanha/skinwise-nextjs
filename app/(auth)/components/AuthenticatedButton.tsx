"use client";
import PopoverAvatar from "@/components/PopoverAvatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AuthenticatedButton = () => {
  const router = useRouter();
  return (
    <main className="space-x-4 flex flex-row items-center  h-full">
      <Button
        onClick={() => {
          router.push("/pricing");
        }}
        className="bg-secondary rounded-full text-primary px-6 hover:text-white"
      >
        Get Premium
      </Button>
      <PopoverAvatar />
    </main>
  );
};

export default AuthenticatedButton;
