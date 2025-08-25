import Form from "../components/form";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm md:max-w-4xl">
      <Form
        type="register"
        desc="Get access to the tools you'll need to achieve your skin goals."
        title="Create a free account or login."
      />
    </div>
  );
}
