"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

export function CompleteProfileCard() {
  const router = useRouter();
  return (
    <main className="w-full flex flex-row justify-center h-fit mt-24   ">
      <Card className="w-[500px] text-center border-none rounded-2xl shadow-lg bg-primary/50">
        <CardHeader className="items-center pt-10 pb-4">
          <CardTitle className="text-xl font-black text-secondary">
            Your profile is completed
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-2 border-secondary">
            <span className="text-xl font-bold text-secondary">100%</span>
          </div>
          <ul className="space-y-4 text-left w-full px-8">
            <li className="flex items-center space-x-2">
              <CircleCheck className="h-5 w-5 text-secondary" />
              <span className="text-sm text-secondary">
                Personalizing your product
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <CircleCheck className="h-5 w-5 text-secondary" />
              <span className="text-sm text-secondary">
                Identifying your skin type
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <CircleCheck className="h-5 w-5 text-secondary" />
              <span className="text-sm text-secondary">
                Completed your routing building
              </span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center pb-8 pt-8">
          <Button
            onClick={() => {
              router.replace("/");
            }}
            className="py-6 rounded-full w-full bg-secondary hover:bg-secondary/90"
          >
            Get started
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
