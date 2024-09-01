import { ReportContent } from "@/components/report/reportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Report({
  params,
}: {
  params: { fieldId: string };
}) {
  console.log(params);
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>API Test Report</CardTitle>
      </CardHeader>
      <ReportContent />
    </Card>
  );
}
