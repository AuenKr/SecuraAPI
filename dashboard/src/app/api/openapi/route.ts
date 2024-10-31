import { getOpenApiFile } from '@/actions';
import { doesObjectPresent, getPutSignedUrl } from '@/aws/s3';
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

    const fileLocation = `openApi/${session.user.email?.split("@")[0]}-${fileName.split(".y")[0]}-${generateRandomString()}.yaml`
    const url = await getPutSignedUrl(fileLocation);

    return NextResponse.json({
      preSignedUrl: url,
      name: fileName,
      fileLocation: fileLocation,
      expireIn: "360 sec",
    })

  } catch (error) {
    console.log("error : ", error)
    return NextResponse.json({
      msg: "Internal Server Error"
    }, { status: 500 })
  }

}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user)
      return NextResponse.json({
        msg: "Invalid user"
      }, { status: 404 })

    const { name, fileLocation }: { name?: string, fileLocation?: string } = await req.json();
    if (!name || !fileLocation)
      return NextResponse.json({
        msg: "Invalid Input"
      }, { status: 404 })

    const isValidFile = await doesObjectPresent(fileLocation);
    if (!isValidFile)
      return NextResponse.json({
        msg: "Invalid file"
      }, { status: 404 })

    const result = await prisma.openApiFile.create({
      data: {
        name: name,
        url: fileLocation,
        email: session.user.email,
        progress: "QUEUE"
      }
    })

    return NextResponse.json({
      msg: "File upload success"
    })
  } catch (error) {
    console.log("error : ", error)
    return NextResponse.json({
      msg: "Internal Server Error",
      error: error || "Null"
    }, { status: 500 })
  }
}