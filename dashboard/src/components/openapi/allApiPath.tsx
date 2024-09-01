import { getOpenApiPaths } from "@/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export async function OpenApiPathTable() {
  const tableHead = [
    "fileName",
    "endpoint",
    "method",
    "summary",
    "description",
    "request Body",
    "parameters",
    "security Body",
    "response Body",
  ];

  const result = await getOpenApiPaths();
  if (!result) return;

  return (
    <div className="overflow-auto">
      <Table className="min-w-full divide-y">
        <TableHeader>
          <TableRow>
            {tableHead.map((each, index) => (
              <TableHead
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {each}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {result.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white truncate max-w-xs overflow-hidden">
                {row.OpenApiFile?.name}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm dark:text-white truncate max-w-xs overflow-hidden">
                {row.path}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm dark:text-white truncate max-w-xs overflow-hidden">
                {row.method}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm dark:text-white truncate max-w-xs overflow-hidden">
                {row.summary}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm dark:text-white truncate max-w-xs overflow-hidden">
                {row.description}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm dark:text-white truncate max-w-xs overflow-hidden">
                {JSON.stringify(row.requestBody)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm dark:text-white truncate max-w-xs overflow-hidden">
                {JSON.stringify(row.parameters)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm dark:text-white truncate max-w-xs overflow-hidden">
                {JSON.stringify(row.securityBody)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm dark:text-white truncate max-w-xs overflow-hidden">
                {JSON.stringify(row.responseBody)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
