import { Progress, type TestResult } from "@prisma/client";
import { TESTER_URL } from ".";
import type { UrlType } from "./types";
import prisma from "./db";

export async function testTaker(apiPath: UrlType) {
  console.log("test stated for ", apiPath.url)
  const response = await fetch(TESTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: apiPath.url
    })
  })
  console.log("test ended for ", apiPath.url)
  const data = await response.json();
  const result: TestResult[] = data["result"];
  console.log("Test result : ", result);
  return result;
}

export async function updateOpenApiPathStatus() {
  const result = await prisma.openApiFile.findMany({
    include: {
      apiPath: true
    }
  })

  let completedEndpoints = result.filter((each) => {
    let isCompleted = true;
    for (let i = 0; i < each.apiPath.length; i++) {
      const apiPathResult = each.apiPath[i];
      if (apiPathResult.status !== Progress.FINISH) {
        isCompleted = false;
        break;
      }
    }
    return isCompleted;
  })


  let updatedID = [];
  for (let i = 0; i < completedEndpoints.length; i++) {
    const each = completedEndpoints[i];
    await prisma.openApiFile.update({
      where: {
        id: each.id
      },
      data: {
        progress: "FINISH"
      }
    })
    updatedID.push(each.id)
  }

  console.log("Finished File id ", updatedID)
}