import { getOpenApiFile } from '@/actions';
import { getPutSignedUrl } from '@/aws/s3';
import prisma from '@/db';
import { generateRandomString } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user)
    return NextResponse.json({
      msg: "Invalid user"
    }, { status: 404 })

  const result = getOpenApiFile()

  return NextResponse.json({
    openApiFile: result
  })
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user)
      return NextResponse.json({
        msg: "Invalid user"
      }, { status: 404 })

    const { fileName }: { fileName?: string } = await req.json();
    if (!fileName)
      return NextResponse.json({
        msg: "Invalid Input"
      }, { status: 404 })

    const name = `${session.user.email?.split("@")[0]}-${generateRandomString()}-${fileName.split}`
    const url = await getPutSignedUrl(name);

    const result = await prisma.openApiFile.create({
      data: {
        name: fileName,
        url: `openApi/${name}`,
        email: session.user.email
      }
    })

    console.log("trigger /api/parser")
    // Trigger the parsing endpoint while uploading
    fetch("/api/parser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: result.id
      })
    })

    return NextResponse.json({
      preSignedUrl: url,
      expireIn: "360 sec",
    })
  } catch (error) {
    console.log("error : ", error)
    return NextResponse.json({
      msg: "Internal Server Error"
    }, { status: 500 })
  }

}
