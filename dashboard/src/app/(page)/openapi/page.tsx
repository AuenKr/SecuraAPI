import { sideBarConfig as config } from "@/components/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { OpenApiFileTable } from "@/components/openapi/table";
import { ApiProgressState } from "@/components/states";
import { getOpenApiFile } from "@/actions";

export default async function OpenApiFiles() {
  const session = await getServerSession();
  if (!session?.user) redirect("/");
  const result = await getOpenApiFile();
  if (!result) return;
  return (
    <main className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">API collections</h1>
      </header>
      <div className="flex ">
        <ApiProgressState result={result} />
      </div>
      <div className="grid grid-cols-4 gap-6 mb-6"></div>
      <OpenApiFileTable result={result} />
    </main>
  );
}
