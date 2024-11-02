import { getOpenApiFile } from "@/actions";
import { ApiProgressState } from "@/components/states";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getOpenApiFile();
  if (!result) return;
  return (
    <main className="flex-1 px-1">
      <header className="text-center p-2">
        <h1 className="text-xl lg:text-2xl font-bold">API Collection</h1>
      </header>
      <div className="grid grid-cols-5 mb-6 gap-4">
        <div className="col-span-5">
          <ApiProgressState result={result} />
        </div>
        <div className="col-span-5 flex justify-center">
          <ScrollArea className="w-full max-w-[360px] sm:max-w-[88%] md:max-w-[80%] justify-self-stretch">
            {children}
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}
