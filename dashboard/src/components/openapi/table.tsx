import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { OpenApiFile } from "@prisma/client";
import { RefreshBtn } from "../refreshBtn";

export function OpenApiFileTable({ result }: { result: OpenApiFile[] }) {
  const tableHead = [
    "File Name",
    "Current Status",
    "Total Endpoints",
    "Report",
    "Reload",
  ];
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
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.progress}</TableCell>
            <TableCell>
              {row.totalEndpoint === 0 ? "--" : row.totalEndpoint}
            </TableCell>
            <TableCell>{row.report ? row.report : "--"}</TableCell>
            <TableCell>{<RefreshBtn id={row.id} />}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
