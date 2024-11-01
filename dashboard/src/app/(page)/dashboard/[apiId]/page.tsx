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
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] w-full gap-3">
        <span className="text-lg">Every thing is ok here</span>
        <Link
          href={"/dashboard"}
          className="bg-slate-800 hover:bg-slate-700 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black border-2 px-3 py-2 rounded-xl"
        >
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-center w-full">Test Results</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testResults.map((result) => (
          <Card
            key={result.id}
            className="bg-background shadow-md flex flex-col justify-between"
          >
            <CardHeader className="flex items-center justify-between">
              <div className="text-lg font-bold">{result.name}</div>
              <div
                className={clsx(
                  "text-sm font-medium me-2 px-2.5 py-0.5 rounded-lg border-2",
                  result.risk === "High" &&
                    "bg-red-100 text-red-800 rounded dark:bg-red-900 dark:text-red-300",
                  result.risk === "Medium" &&
                    "bg-yellow-100 text-yellow-800 rounded dark:bg-yellow-900 dark:text-yellow-300",
                  result.risk === "Low" &&
                    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
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
            <CardFooter className="flex justify-center items-center">
              <Link
                href={`${params.apiId}/${result.id}`}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                View Details
              </Link>
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
