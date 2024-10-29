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
    <div className="flex items-start justify-start w-full min-h-[85vh]">
      <div className="w-60 flex-grow-0 justify-start">
        <SideBar />
      </div>
      <div className="flex w-full flex-1">{children}</div>
    </div>
  );
}
