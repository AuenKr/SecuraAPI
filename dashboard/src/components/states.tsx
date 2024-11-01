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
    {
      name: "Total Endpoints",
      value: result.reduce((accumulator, each) => {
        return accumulator + each.totalEndpoint;
      }, 0),
    },
  ];
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-self-center gap-2">
      {config.map((each) => {
        return (
          <Card key={each.name} className="col-span-1">
            <CardContent className="p-3 flex flex-col justify-between items-center h-full text-center text-sm lg:text-base gap-1">
              <h2>{each.name}</h2>
              <p className="font-bold">{each.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
