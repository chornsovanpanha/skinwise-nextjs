import { Metadata } from "next";
import Form from "../components/form";
export const metadata: Metadata = {
  title: "Register",
  description: "Skinwise register page",
};
export default function RegisterPage() {
  return (
    <main className="w-full max-w-sm md:max-w-4xl">
      <Form
        type="register"
        desc="Get access to the tools you'll need to achieve your skin goals."
        title="Create a free account or login."
      />
    </main>
  );
}
