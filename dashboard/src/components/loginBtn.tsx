"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginBtn() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
