import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn } from "../lib/api";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const navigate = useNavigate();
  const { setCookie } = useAuth();
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: "sign-in",
    mutationFn: signIn,
    onSuccess: (payload) => {
      setCookie(
        "token",
        {
          access_token: "access_token_value",
          refresh_token: "refresh_token_value",
        },
        {
          path: "/",
          expires: new Date(Date.now() + 60 * 60 * 1000),
        }
      );

      navigate("/");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="sm:mx-auto max-w-screen-sm w-full flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>

          <p className="text-sm text-gray-500">Enter your credentials to access your accout</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>

            <Input autoComplete="off" type="text" {...register("email")} id="email" placeholder="example@email.com" className="text-sm" />

            {errors.email && <p className="text-red-600 text-xs">*{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>

            <Input autoComplete="off" type="password" {...register("password")} id="password" className="text-sm" />

            {errors.password && <p className="text-red-600 text-xs">*{errors.password.message}</p>}
          </div>

          <Button type="submit">{isPending ? "Signing in ..." : "Sign in"}</Button>

          {isError && <p className="text-xs text-red-600 text-center">*{error.message}</p>}
        </form>

        <p className="text-sm text-gray-500 text-center">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-primary underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
