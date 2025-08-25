"use client";
import AppInput from "@/components/AppInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { emailSchema, EmailSchemaType } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ForgetPasswordPreview() {
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof emailSchema>) {
    try {
      console.log(values);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email", error);
      toast.error("Failed to send password reset email. Please try again.");
    }
  }

  return (
    <div className="flex min-h-[40vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto w-md container">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              {/* Email Field */}
              <AppInput
                id="email"
                label="Email"
                type="email"
                placeholder="johndoe@mail.com"
                autoComplete="email"
                required
                icon={<Mail size={16} />}
                {...form.register("email")}
                error={form.formState.errors.email?.message ?? ""}
              />

              {/* Password Field */}
              <AppInput
                id="password"
                label="Password"
                type="password"
                icon={<Lock size={16} />}
                placeholder="Enter Your Password"
                required
              />

              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
