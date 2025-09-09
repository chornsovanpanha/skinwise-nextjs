import { Metadata } from "next";
import React from "react";
import ForgetPasswordPreview from "./ForgetPassword";
export const metadata: Metadata = {
  title: "Forget Password",
  description: "Skinwise forget password page",
};
const Page = () => {
  return <ForgetPasswordPreview />;
};

export default Page;
