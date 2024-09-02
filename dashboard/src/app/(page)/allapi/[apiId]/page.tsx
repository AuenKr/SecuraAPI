import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import prisma from "@/db";
import clsx from "clsx";
import Link from "next/link";

export default async function Component({
  params,
}: {
  params: { apiId: string };
}) {
  const testResults = await prisma.testResult.findMany({
    where: {
      apiPathId: params.apiId,
    },
  });
  if (!testResults.length) {
    return <div>Not Found</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Test Results</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testResults.map((result) => (
          <Card key={result.id} className="bg-background shadow-md">
            <CardHeader className="flex items-center justify-between">
              <div className="text-lg font-bold">{result.name}</div>
              <div
                className={clsx(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  result.risk === "High" && "bg-red-100 text-red-600"
                )}
              >
                {result.risk}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <CaseLowerIcon className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">{result.alert}</span>
              </div>
              <p className="text-muted-foreground">{result.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`${params.apiId}/${result.id}`}>View Details</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CaseLowerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="12" r="3" />
      <path d="M10 9v6" />
      <circle cx="17" cy="12" r="3" />
      <path d="M14 7v8" />
    </svg>
  );
}
