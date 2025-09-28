import { Metadata } from "next";
import Dashboard from "./Dashboard";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of admin dashboard",
};
const Page = () => {
  return <Dashboard />;
};

export default Page;
