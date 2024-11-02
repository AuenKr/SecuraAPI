import { getOpenApiPaths } from "@/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "@prisma/client";
import { ReportBtn } from "../report/reportBtn";

export async function OpenApiPathTable({ fileId }: { fileId?: string }) {
  const tableHead = [
    "fileName",
    "status",
    "endpoint",
    "method",
    "summary",
    "description",
  ];

  const result = await getOpenApiPaths(fileId);
  if (!result) return <div className="mx-auto my-auto">Not Found</div>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHead.map((each, index) => (
            <TableHead key={index}>{each}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {result.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.OpenApiFile?.name}</TableCell>
            <TableCell>
              {row.status === Progress.FINISH ? (
                <ReportBtn id={row.id} link={`/dashboard/${row.id}`}>
                  <span className="text-wrap p-2 w-full text-center font-semibold text-slate-50">{row.status}</span>
                </ReportBtn>
              ) : (
                <span>{row.status}</span>
              )}
            </TableCell>
            <TableCell>{row.path}</TableCell>
            <TableCell>{row.method}</TableCell>
            <TableCell>{row.summary}</TableCell>
            <TableCell>{row.description || "Null"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
