"use client";

import { signup } from "@/actions/auth";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type SignupState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export default function SignupForm() {
  const [state, action, pending] = useActionState<SignupState, FormData>(
    async (_prevState, formData) => {
      return await signup(formData); // calling server action
    },
    { success: false, message: "", errors: {} }
  );

  const router = useRouter();

  // Redirect on successful signup
  useEffect(() => {
    if (state?.success) {
      router.push("/contact");
    }
  }, [state, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-amber-100 p-8 rounded">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="mb-4 w-[18rem] h-full object-cover"
      />
      <h1 className="text-2xl font-semibold text-defined-blue">
        Create Your Account
      </h1>
      <p className="text-defined-blue text-xl">Signup to Continue</p>

      <form className="w-full flex flex-col gap-4" action={action}>
        <div>
          <input
            id="name"
            name="name"
            type="text"
            className="h-12 w-full bg-white border outline-none border-amber-300 rounded-2xl px-2"
            placeholder="Full Name"
          />
        </div>
        {state?.errors?.name && (
          <p className="text-red-600">{state.errors.name}</p>
        )}

        <div>
          <input
            id="email"
            name="email"
            type="email"
            className="h-12 w-full bg-white border outline-none border-amber-300 rounded-2xl px-2"
            placeholder="Email"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-red-600">{state.errors.email}</p>
        )}

        <div>
          <input
            id="password"
            name="password"
            type="password"
            className="h-12 w-full bg-white border outline-none border-amber-300 rounded-2xl px-2"
            placeholder="Password"
          />
        </div>
        {state?.errors?.password && (
          <div className="text-red-600">
            {state.errors.password.map((error) => (
              <p key={error}>- {error}</p>
            ))}
          </div>
        )}

        <button
          disabled={pending}
          className="bg-defined-purple text-white py-2 px-6 rounded-2xl"
          type="submit"
        >
          {pending ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}