"use client";

import { login } from "@/actions/auth";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type LoginState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    async (_prevState, formData) => {
      return await login(formData);
    },
    { success: false, message: "", errors: {} }
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.replace("/admin-gallery");
    }
  }, [state, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-defined-yellow/35 p-8 rounded">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="mb-4 w-[8rem] h-full object-cover"
      />
      <h1 className="text-2xl font-semibold text-defined-blue">
        Welcome Back to Admin Panel
      </h1>
      <p className="text-defined-blue text-xl">Login to Continue</p>

      <form className="w-full flex flex-col gap-4" action={action}>        
        <div>
          <input
            id="email"
            name="email"
            type="email"
            className="h-12 w-full bg-white border outline-none border-amber-300 rounded-2xl px-2"
            placeholder="Email"
          />
          {state.errors?.email && (
            <p className="text-red-600 text-sm">{state.errors.email}</p>
          )}
        </div>
        
        <div>
          <input
            id="password"
            name="password"
            type="password"
            className="h-12 w-full bg-white border outline-none border-amber-300 rounded-2xl px-2"
            placeholder="Password"
          />
          {state.errors?.password && (
            <p className="text-red-600 text-sm">{state.errors.password}</p>
          )}
        </div>

        {/* Global message (non-field errors) */}
        {state.message && (
          <p className="text-red-600 text-center">{state.message}</p>
        )}

        <button
          disabled={pending}
          className="bg-defined-purple text-white py-2 px-6 rounded-2xl"
          type="submit"
        >
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
