import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
}
