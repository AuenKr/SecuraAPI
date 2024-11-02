import { Landing } from "@/components/landing/landing";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Component() {
  const session = await getServerSession();
  if (session?.user) redirect("/openapi");
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <Landing />
    </div>
  );
}
