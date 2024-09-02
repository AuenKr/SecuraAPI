import { getOpenApiFile } from "@/actions";
import { sideBarConfig as config } from "@/components/config";
import { OpenApiPathTable } from "@/components/openapi/allApiPath";
import { ApiProgressState } from "@/components/states";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function OpenApiFiles() {
  const session = await getServerSession();
  if (!session?.user) redirect("/");

  const result = await getOpenApiFile();
  if (!result) return;
  return (
    <main className="flex flex-col p-6 w-full">
      <div className="mb-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{config.header.title}</h1>
        </header>
        <div className="flex w-10/12">
          <ApiProgressState result={result} />
        </div>
      </div>
      <div className="max-w-[90%]">
        <OpenApiPathTable />
      </div>
    </main>
  );
}
