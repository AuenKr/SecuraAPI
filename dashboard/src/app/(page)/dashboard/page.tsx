import { getOpenApiFile } from "@/actions";
import { OpenApiPathTable } from "@/components/openapi/allApiPath";
import { ApiProgressState } from "@/components/states";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function OpenApiFiles() {
  const result = await getOpenApiFile();
  if (!result) return;
  return (
    <div className="flex justify-center">
      <main className="flex-1 px-1 w-full max-w-[20rem] sm:max-w-[45rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[70rem] justify-center">
        <header className="text-center p-2">
          <h1 className="text-xl lg:text-2xl font-bold">API Collection</h1>
        </header>
        <div className="grid grid-cols-5 mb-6 gap-4">
          <div className="col-span-5">
            <ApiProgressState result={result} />
          </div>
        </div>
        <div className="col-span-5 flex justify-center">
          <ScrollArea className="w-full justify-self-stretch ">
            <div className="overflow-auto">
              <OpenApiPathTable />
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
