import { getOpenApiFile } from "@/actions";
import { OpenApiPathTable } from "@/components/openapi/allApiPath";
import { ApiProgressState } from "@/components/states";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function OpenApiFiles() {
  const session = await getServerSession();
  if (!session?.user) redirect("/");
  const result = await getOpenApiFile();
  if (!result) return;
  return (
    <main className="flex flex-col p-6 max-w-screen-2xl">
      <div className="mb-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">API Collection</h1>
        </header>
        <div className="flex w-full">
          <ApiProgressState result={result} />
        </div>
      </div>
      <div className="max-w-screen-xl">
        <ScrollArea className="h-[80vh] w-full rounded-md border p-4">
          <OpenApiPathTable />
        </ScrollArea>
      </div>
    </main>
  );
}
