import { getOpenApiFile } from "@/actions";
import { OpenApiPathTable } from "@/components/openapi/allApiPath";

export default async function OpenApiFiles({
  params,
}: {
  params: {
    fileId: string;
  };
}) {
  const result = await getOpenApiFile();
  if (!result) return;
  return <OpenApiPathTable fileId={params.fileId} />;
}
