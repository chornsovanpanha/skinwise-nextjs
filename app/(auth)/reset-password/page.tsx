"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AppInput from "@/components/AppInput";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/utils/schema";
import { Lock } from "lucide-react";

export default function ResetPasswordPreview() {
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordSchemaType) {
    try {
      console.log(values);
      toast.success(
        "Password reset successful. You can now log in with your new password."
      );
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Failed to reset the password. Please try again.");
    };;;
  }

  return (
    <div className="flex min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto w-md container">
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
                icon={<Lock size={16} />}
                placeholder="******"
                autoComplete="new-password"
                required
                {...form.register("password")}
                error={form.formState.errors.password?.message}
              />

              {/* Confirm Password */}
              <AppInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                icon={<Lock size={16} />}
                placeholder="******"
                autoComplete="new-password"
                required
                {...form.register("confirmPassword")}
                error={form.formState.errors.confirmPassword?.message}
              />

              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
