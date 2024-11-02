import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestResult } from "@prisma/client";

export default function TestResultPage({ data }: { data: TestResult }) {
  const {
    id,
    alert,
    attack,
    confidence,
    risk,
    description,
    evidence,
    method,
    name,
    other,
    param,
    reference,
    solution,
    tags,
    apiPathId,
  } = data;

  const renderTags = () => {
    if (!tags || typeof tags !== "object") return null;
    return Object.entries(tags).map(([key, value]) => (
      <Badge key={key} variant="outline" className="mr-2 mb-2">
        {`${key}: ${value}`}
      </Badge>
    ));
  };

  return (
    <div className="container p-4 max-w-xl lg:max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Test Result</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{name || "Unnamed Test"}</CardTitle>
          <CardDescription>ID: {id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">API Path ID:</p>
              <p>{apiPathId}</p>
            </div>
            <div>
              <p className="font-semibold">Method:</p>
              <p>{method || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Parameter:</p>
              <p>{param || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Confidence:</p>
              <p>{confidence || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {alert && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Alert</AlertTitle>
          <AlertDescription>{alert}</AlertDescription>
        </Alert>
      )}

      {risk && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant={
                risk.toLowerCase() === "high" ? "destructive" : "default"
              }
            >
              {risk}
            </Badge>
          </CardContent>
        </Card>
      )}

      {attack && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Attack Type</CardTitle>
          </CardHeader>
          <CardContent>{attack}</CardContent>
        </Card>
      )}

      {description && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>{description}</CardContent>
        </Card>
      )}

      {evidence && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Evidence</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <pre>{evidence}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {solution && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Solution</CardTitle>
          </CardHeader>
          <CardContent>{solution}</CardContent>
        </Card>
      )}

      {reference && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Reference</CardTitle>
          </CardHeader>
          <CardContent>{reference}</CardContent>
        </Card>
      )}

      {other && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>{other}</CardContent>
        </Card>
      )}

      {tags && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>{renderTags()}</CardContent>
        </Card>
      )}
    </div>
  );
}
