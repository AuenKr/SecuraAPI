import { Progress, type TestResult } from "@prisma/client";
import prisma from "./db";
import dotenv from 'dotenv';
import type { UrlType } from "./types";
import { testTaker, updateOpenApiPathStatus } from "./utils";

dotenv.config();

export const TESTER_URL = process.env.TESTER_URL || "http://localhost:5000"
let count = 0;

async function main() {
  try {
    const allApiPath = await prisma.apiPath.findMany({
      where: {
        status: Progress.TESTING
      },
      include: {
        OpenApiFile: true
      }
    })

    if (!allApiPath)
      return;

    const allUrl: UrlType[] = allApiPath.map((each: any) => {
      let url = each.OpenApiFile.servers[0][0].url || null
      url += each.path;
      return {
        url,
        id: each.id
      };
    })

    const filterUrl = allUrl.filter((each) => each);

    for (let i = 0; i < filterUrl.length; i++) {
      const apiPath = filterUrl[i];

      // @ts-ignore
      const result: TestResult[] = await testTaker(apiPath)
      if (!result.length) {
        return;
      }

      const updateValue = await prisma.testResult.createMany({
        data: result.map((each: any) => {
          const parseData = {
            alert: each.alert,
            attack: each.attack,
            confidence: each.confidence,
            risk: each.risk,
            description: each.description,
            evidence: each.evidence,
            method: each.method,
            name: each.name,
            other: each.other,
            param: each.param,
            reference: each.reference,
            solution: each.solution,
            tags: each.tags || {},
            apiPathId: apiPath.id,
          }
          return parseData;
        })
      })

      await prisma.apiPath.update(({
        where: {
          id: apiPath.id
        },
        data: {
          status: Progress.FINISH
        }
      }))

      console.log(++count)
    }

    await updateOpenApiPathStatus();
  } catch (error) {
    console.log(error);
  }
}

main();
setInterval(async () => {
  await main()
}, 1000 * 60 * 60 * 1) // 1hr
