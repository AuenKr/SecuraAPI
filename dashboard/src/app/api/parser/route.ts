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
    const { id, refresh } = await req.json();
    if (!id)
      return NextResponse.json({
        msg: "Invalid input",
      }, { status: 422 })

    const result = await prisma.openApiFile.findFirst({
      where: {
        id
      }
    })

    if (!result)
      return NextResponse.json({
        msg: "Invalid input id",
      }, { status: 422 })

    if (result.progress === "QUEUE" || result.progress === "PARSING") {
      // Generate presigned url from key in s3
      const path = `src/openapiSpec/${result.url}`;
      let preSignedUrl = "";
      if (!fs.existsSync(path)) {
        preSignedUrl = await getObjectURL(result.url);
      }
      console.log("presigned url ", preSignedUrl || "NOno")
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
            totalEndpoint: parsedResult.path.length
          }
        });
        if (!parsedResult.path) {
          return NextResponse.json({
            msg: "No enpoint present",
            preSignedUrl,
          })
        }
      }

      const finalData = await prisma.apiPath.createManyAndReturn({
        data: parsedResult.path.map((each: any) => {
          return { ...each, openApiFileId: id };
        })
      })

      await prisma.openApiFile.update({
        where: {
          id
        },
        data: {
          progress: "TESTING",
        }
      })

      return NextResponse.json({
        msg: "Ended Parsing",
        result: finalData,
        preSignedUrl,
      })
    }
    else {
      return NextResponse.json({
        msg: "Already in progress",
      })
    }

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      msg: "Internal server error",
      details: error,
    }, { status: 500 })
  }
}