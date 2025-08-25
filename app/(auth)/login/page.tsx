import Form from "../components/form";

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
