import { Card, CardContent } from "./ui/card";
import { OpenApiFile } from "@prisma/client";

export async function ApiProgressState({ result }: { result: OpenApiFile[] }) {
  const config = [
    {
      name: "Total Files",
      value: result.length,
    },
    {
      name: "In Process",
      value: result.filter((each) => {
        return each.progress !== "FINISH";
      }).length,
    },
    {
      name: "In Queue",
      value: result.filter((each) => {
        return each.progress === "QUEUE";
      }).length,
    },
    {
      name: "In Testing",
      value: result.filter((each) => {
        return each.progress === "TESTING";
      }).length,
    },
    {
      name: "Completed",
      value: result.filter((each) => {
        return each.progress === "FINISH";
      }).length,
    },
  ];
  return (
    <div className="w-full flex justify-between">
      {config.map((each) => {
        return (
          <Card key={each.name}>
            <CardContent className="text-center p-3 dark:hover:bg-slate-700 hover:bg-slate-400 hover:rounded">
              <h2 className="text-lg font-semibold">{each.name}</h2>
              <p className="text-3xl font-bold">{each.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
