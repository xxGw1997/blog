"use client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import SubmitButton from "~/components/ui/submit-button";
import { signUp } from "~/features/auth/api/use-auth";
import React from "react";
import { useFormState } from "react-dom";

const SignUpForm = () => {
  const [state, action] = useFormState(signUp, undefined);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="xxgw" />
        </div>
        {state?.error?.name && (
          <p className="text-sm text-red-500">{state.error.name}</p>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="xxgw@example.com" />
        </div>
        {state?.error?.email && (
          <p className="text-sm text-red-500">{state.error.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        {state?.error?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.error.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
};

export default SignUpForm;
