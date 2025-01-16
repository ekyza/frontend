import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUp } from "../lib/api";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(12, "Phone number must be at least 12 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: "sign-up",
    mutationFn: signUp,
    onSuccess: (payload) => {},
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="sm:mx-auto max-w-screen-sm w-full flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Create your account</h1>

          <p className="text-sm text-gray-500">Enter your credentials to create your accout</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm">
              Name
            </Label>

            <Input autoComplete="off" type="text" {...register("name")} id="name" placeholder="John Doe" className="text-sm" />

            {errors.name && <p className="text-red-600 text-xs">*{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>

            <Input autoComplete="off" type="text" {...register("email")} id="email" placeholder="example@email.com" className="text-sm" />

            {errors.email && <p className="text-red-600 text-xs">*{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-sm">
              Phone
            </Label>

            <Input autoComplete="off" type="number" {...register("phone")} id="phone" className="text-sm" />

            {errors.phone && <p className="text-red-600 text-xs">*{errors.phone.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>

            <Input autoComplete="off" type="password" {...register("password")} id="password" className="text-sm" />

            {errors.password && <p className="text-red-600 text-xs">*{errors.password.message}</p>}
          </div>

          <Button type="submit">{isPending ? "Signing up ..." : "Sign up"}</Button>

          {isError && <p className="text-xs text-red-600 text-center">*{error.message}</p>}
        </form>

        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
