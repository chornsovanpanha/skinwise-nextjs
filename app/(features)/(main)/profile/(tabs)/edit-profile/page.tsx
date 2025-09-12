import React from "react";
import EditProfileForm from "./EditProfileForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Skinwise edit profile.",
};
const Page = () => {
  return <EditProfileForm />;
};

export default Page;
