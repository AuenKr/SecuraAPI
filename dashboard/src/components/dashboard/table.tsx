import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { sideBarConfig as config } from "../config";
import { Badge } from "lucide-react";

export function DashBoardTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {config.tableHead.map((each, index) => (
            <TableHead key={index}>{each}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {config.tableData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.endpoints}</TableCell>
            <TableCell>
              <Badge fontVariant="secondary">{row.riskScore}</Badge>
            </TableCell>
            <TableCell>{row.testCoverage}</TableCell>
            <TableCell>{row.issues}</TableCell>
            <TableCell>{row.sensitiveData}</TableCell>
            <TableCell>{row.collectionType}</TableCell>
            <TableCell>{row.lastTrafficSeen}</TableCell>
            <TableCell>{row.discovered}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
