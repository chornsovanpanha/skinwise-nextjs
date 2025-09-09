"use client";
import { LoginAction } from "@/actions/authentication/login.action";
import { RegisterAction } from "@/actions/authentication/register.action";
import { SkinwiseLogoLight } from "@/assets";
import AppInput from "@/components/AppInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  loginSchema,
  LoginSchemaType,
  registerSchema,
  RegisterSchemaType,
} from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { startTransition, useState } from "react";
import { FieldErrors, Path, Resolver, useForm } from "react-hook-form";
import SocialButton from "./SocialButton";
import { useSetAtom } from "jotai";
import { userAtom } from "@/lib/atom";

type FormType = "login" | "register";

type FormValues<T extends FormType> = T extends "register"
  ? RegisterSchemaType
  : LoginSchemaType;

type FormProps<T extends FormType> = {
  title: string;
  desc: string;
  type: T;
};

export const defaultState = {
  loading: false,
  error: "",
};
const Form = <T extends FormType>({ title, desc, type }: FormProps<T>) => {
  const linkPrimary = "Already have an account?";
  const linkBtn = type === "register" ? "Login" : "Register";
  const url = type === "register" ? "/login" : "/register";
  const [mutateState, setMutatestate] = useState(defaultState);
  const setUserAtom = useSetAtom(userAtom);
  const schema = type === "register" ? registerSchema : loginSchema;
  const { show } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues<T>>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues<T>>,
  });

  const onSubmit = async (formData: FormValues<T>) => {
    setMutatestate((pre) => ({ ...pre, loading: true }));

    const { data, error, success } =
      type == "login"
        ? await LoginAction(formData as LoginSchemaType)
        : await RegisterAction(formData as RegisterSchemaType);

    if (data && success) {
      startTransition(() => {
        setUserAtom({ ...data });
        setMutatestate(defaultState);
        show({ type: "success", message: `Welcome back ${data?.name}` });

        redirect("/");
      });
    } else {
      console.error(error);
      show({ type: "error", message: JSON.stringify(error) });

      setMutatestate((pre) => ({
        ...pre,
        error: error as string,
        loading: false,
      }));
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div className="overflow-hidden p-0 m-0">
        <div className="grid md:grid-cols-2 m-0 bg-white rounded-2xl">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <header className="flex flex-col items-center text-center mb-4">
                <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
                <p
                  className={clsx("text-muted-foreground text-sm md:text-lg ", {
                    "text-balance": type == "login",
                    "max-w-fit w-[300px]": type == "register",
                  })}
                >
                  {desc}
                </p>
              </header>
              {type === "register" && (
                <div className="sm:flex gap-3 block sm:space-y-0">
                  <AppInput
                    id="firstName"
                    label="First Name"
                    type="text"
                    placeholder="FirstName"
                    className="flex grow"
                    {...register("firstName" as Path<FormValues<T>>)}
                    error={
                      (errors as FieldErrors<RegisterSchemaType>).firstName
                        ?.message
                    }
                  />
                  <AppInput
                    id="lastName"
                    label="Last Name"
                    type="text"
                    placeholder="LastName"
                    {...register("lastName" as Path<FormValues<T>>)}
                    error={
                      (errors as FieldErrors<RegisterSchemaType>).lastName
                        ?.message
                    }
                  />
                </div>
              )}

              <div className="grid gap-3">
                <AppInput
                  id="email"
                  label="Email"
                  type="email"
                  icon={<Mail size={16} />}
                  placeholder="Example@gmail.com"
                  {...register("email" as Path<FormValues<T>>)}
                  error={errors.email?.message as string}
                />
              </div>
              <div className="grid gap-3">
                <AppInput
                  id="password"
                  label="Password"
                  type="password"
                  icon={<Lock size={16} />}
                  placeholder="Enter Your Password"
                  {...register("password" as Path<FormValues<T>>)}
                  error={errors.password?.message as string}
                />
                <div className="flex items-center">
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Button type="submit" className="mb-4">
                  {mutateState.loading
                    ? "Loading..."
                    : type == "login"
                    ? "Login"
                    : "Register"}
                </Button>
              </div>

              {/* ***** Social login button  ***** */}

              <SocialButton />
              <div className="text-center text-sm my-4">
                {linkPrimary}{" "}
                <Link href={url} className="underline underline-offset-4">
                  {linkBtn}
                </Link>
              </div>
            </div>
          </form>

          <div className="hidden w-full md:flex bg-secondary place-items-center  justify-center rounded-r-2xl">
            <Image
              src={SkinwiseLogoLight}
              alt="Image-Cover"
              width={100}
              height={100}
              className=" h-fit w-fit dark:brightness-[0.2] dark:grayscale object-cover"
            />
          </div>
        </div>
      </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default Form;
