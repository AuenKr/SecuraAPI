import { OpenApiFileTable } from "@/components/openapi/table";
import { getOpenApiFile } from "@/actions";

export default async function OpenApiFiles() {
  const result = await getOpenApiFile();
  if (!result) return;
  return <OpenApiFileTable result={result} />;
}
