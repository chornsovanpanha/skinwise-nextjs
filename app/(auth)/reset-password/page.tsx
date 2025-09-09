"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordAction } from "@/actions/authentication/reset.action";
import { PerfumeLogoSvg } from "@/assets";
import AppInput from "@/components/AppInput";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/utils/schema";
import { Lock } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
import { defaultState } from "../components/form";

export default function ResetPasswordPreview() {
  const { show } = useToast();
  const search = useSearchParams();
  const token = search.get("token");
  const [mutateState, setMutatestate] = useState(defaultState);

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(forms: ResetPasswordSchemaType) {
    setMutatestate((pre) => ({ ...pre, loading: true }));
    const { data, error, success } = await ResetPasswordAction({
      ...forms,
      token: token ?? "",
    });

    if (data && success) {
      startTransition(() => {
        setMutatestate(defaultState);
        show({
          type: "success",
          message: "Your password has been reset. You can now login again.",
        });
        redirect("/login");
      });
    } else {
      console.error(error);
      show({
        type: "error",
        message: "Failed to reset password. Please try again.",
      });
      setMutatestate((pre) => ({
        ...pre,
        error: error as string,
        loading: false,
      }));
    }
  }
  if (!token) {
    return redirect("/login");
  }
  return (
    <div className="flex min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto w-md container">
        <div className="w-full  flex justify-center mb-4">
          <Logo src={PerfumeLogoSvg} size={90} className="p-4" />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              {/* New Password */}
              <AppInput
                id="password"
                label="New Password"
                type="password"
                placeholder="Enter Your Password"
                icon={<Lock size={16} />}
                // placeholder="******"
                autoComplete="new-password"
                {...form.register("password")}
                error={form.formState.errors.password?.message}
              />

              {/* Confirm Password */}
              <AppInput
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Enter Your Confirm Password"
                type="password"
                icon={<Lock size={16} />}
                // placeholder="******"
                autoComplete="new-password"
                {...form.register("confirmPassword")}
                error={form.formState.errors.confirmPassword?.message}
              />

              <Button type="submit" className="w-full">
                {mutateState?.loading ? "Loading..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
