import { Metadata } from "next";
import Form from "../components/form";
export const metadata: Metadata = {
  title: "Login",
  description: "Skinwise login page",
};
export default function LoginPage() {
  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <Form
        type="login"
        desc="Login to your Skinwise account"
        title="Welcome back"
      />
    </div>
  );
}
