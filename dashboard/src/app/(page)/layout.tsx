import { SideBar } from "@/components/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session?.user) redirect("/");
  return (
    <div className="flex h-screen w-screen">
      <div>
        <SideBar />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
