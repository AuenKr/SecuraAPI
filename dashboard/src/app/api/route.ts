import { getObjectURL } from "@/aws/s3";
import { downloadAndParseYaml } from "@/aws/yamlParse";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

export function GET() {
  return NextResponse.json({
    msg: "GET /api/parser"
  })
}

/*
id : openAPi file to parse
*/
export async function POST(req: NextRequest) {
  try {
    console.log("Parsing stated")
    const { id, refresh } = await req.json();
    if (!id)
      throw new Error("Invalid Input");

    const result = await prisma.openApiFile.findFirst({
      where: {
        id
      }
    })

    if (!result)
      throw new Error("Invalid input id")

    if (result.progress !== "QUEUE" && !refresh)
      return NextResponse.json({
        msg: "Already in progress"
      })

    const path = `src/openapiSpec/${result.url}`;
    let preSignedUrl = "";
    if (!fs.existsSync(path)) {
      preSignedUrl = await getObjectURL(result.url);
    }

    const parsedResult = await downloadAndParseYaml(preSignedUrl, result.url);
    if (!result.openapiVersion) {
      await prisma.openApiFile.update({
        where: {
          id: id
        },
        data: {
          progress: parsedResult.path ? "PARSING" : "FINISH",
          openapiVersion: parsedResult.openapiVersion,
          title: parsedResult.title,
          description: parsedResult.description,
          servers: {
            push: [...parsedResult.servers]
          },
        }
      });
      if (!parsedResult.path) {
        return NextResponse.json({
          msg: "No enpoint present"
        })
      }
    }

    const finalData = await prisma.apiPath.createManyAndReturn({
      data: parsedResult.path.map((path: any) => path)
    })

    return NextResponse.json({
      msg: "started Parsing",
      result: finalData
    })

  } catch (error) {
    return NextResponse.json({
      msg: "Internal server error",
      details: error,
    }, { status: 500 })
  }
}