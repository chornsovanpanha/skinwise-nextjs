import React from "react";
import Brand from "./(tables)/Brand";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Brand",
  description: "Brand listing overview of admin dashboard",
};
const Page = () => {
  return <Brand />;
};

export default Page;
