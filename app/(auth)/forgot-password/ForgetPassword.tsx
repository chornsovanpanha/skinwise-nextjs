"use client";
import { SendEmailForgetAction } from "@/actions/authentication/reset.action";
import { AppLogo } from "@/assets";
import AppInput from "@/components/AppInput";
import Logo from "@/components/Logo";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { emailSchema, EmailSchemaType } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { defaultState } from "../components/SocialButton";

export default function ForgetPasswordPreview() {
  const { show } = useToast();
  const [mutateState, setMutatestate] = useState(defaultState);

  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(forms: EmailSchemaType) {
    console.log(forms);
    setMutatestate((pre) => ({ ...pre, loading: true }));

    const { data, error } = await SendEmailForgetAction(forms);

    if (data) {
      startTransition(() => {
        setMutatestate(defaultState);
        show({
          type: "success",
          message: "Password reset email sent. Please check your inbox.",
        });
      });
    } else {
      console.error(error);
      show({
        type: "error",
        message:
          error || "Failed to send password reset email. Please try again.",
      });
      setMutatestate((pre) => ({
        ...pre,
        error: error as string,
        loading: false,
      }));
    }
  }

  return (
    <div className="flex min-h-[40vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto w-md container">
        <div className="w-full  flex justify-center mb-4">
          <Logo src={AppLogo} size={90} className="p-4" />
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription className="w-full mb-4">
            Provide email to receive a password reset link.
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
                icon={<Mail size={16} />}
                {...form.register("email")}
                error={form.formState.errors.email?.message ?? ""}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={mutateState.loading}
              >
                {mutateState.loading ? "Loading..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
          <Link
            href={"/login"}
            className={clsx(
              `flex items-center my-4 mt-7 w-full justify-center gap-1`,
              {
                "pointer-events-none": mutateState.loading,
              }
            )}
          >
            <div className="flex w-fit gap-2 items-center hover:opacity-60 transition-opacity duration-200 ease-initial">
              <ArrowLeft size={16} />
              <Typography variant="button">Back to login</Typography>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
