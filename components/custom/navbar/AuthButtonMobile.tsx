import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButtonMobile = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-2 w-full text-sm text-gray-600  bg-white pb-2">
      <Button
        className="bg-gray-50 text-black hover:bg-gray-100 focus:border-0 rounded-full"
        onClick={() => {
          router.push("/login");
        }}
      >
        <User />
        Login / Create an Account
      </Button>
    </div>
  );
};

export default AuthButtonMobile;
