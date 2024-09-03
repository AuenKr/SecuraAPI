import TestResultPage from "@/components/report/testResportApi";
import prisma from "@/db";

export default async function Page({
  params,
}: {
  params: { apiPath: string };
}) {
  const id = params.apiPath;
  const testResult = await prisma.testResult.findUnique({
    where: {
      id,
    },
  });
  if (!testResult) {
    return <div>Not Found</div>;
  }
  return <TestResultPage data={testResult} />;
}
