"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { OTPVerifyModal } from "./OtpVerify";
import { SendOTPToEmail } from "@/actions/auth";

export default function SignUpForm() {
  const name = useRef<string>("");
  const email = useRef<string>("");
  const password = useRef<string>("");
  const [error, setError] = useState<string | null>(null);
  const [modalState, setModalState] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError("Please fill required details");
      return;
    }

    try {
      const result = await SendOTPToEmail(email.current, name.current);
      if (!result) {
        setError("Internal Error Occur");
      } else {
        setModalState(true);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Excited To Test APIs</CardTitle>
          <CardDescription>Create account, and get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Snow"
                onChange={(e) => (name.current = e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                onChange={(e) => (email.current = e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*******"
                onChange={(e) => (password.current = e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center w-full">
            <span>Already have Account? </span>
            <Link
              href="/auth/signin"
              className="font-semibold text-blue-700 dark:text-blue-600 hover:underline"
            >
              Login
            </Link>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
      {modalState && (
        <OTPVerifyModal
          defaultState={modalState}
          email={email.current}
          name={name.current}
          password={password.current}
        />
      )}
    </>
  );
}
