import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { apiId: string } }) {
  try {
    const session = await getServerSession();
    if (!session?.user)
      return NextResponse.json({
        msg: "Invalid user"
      }, { status: 404 })

    const id = context.params.apiId;
    if (!id) {
      return NextResponse.json({
        msg: "Invalid Input",
        id: id,
      }, { status: 404 })
    }
    const result = await prisma.testResult.findMany({
      where: {
        apiPathId: id
      }
    })
    if (!result.length) {
      return NextResponse.json({
        msg: "Invalid api path id",
        id: id
      }, { status: 401 })
    }

    return NextResponse.json({
      msg: "GET /api/apiPath/apiId",
      id: id,
      report: result
    })

  } catch (error) {
    console.log("error : ", error)
    return NextResponse.json({
      msg: "Internal Server Error"
    }, { status: 500 })
  }
  ``

}
