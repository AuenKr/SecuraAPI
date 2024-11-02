import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession();
  if (session?.user) redirect("/openapi");
  return (
    <div className="flex items-center justify-center h-full min-h-screen w-full">
      {children}
    </div>
  );
}
