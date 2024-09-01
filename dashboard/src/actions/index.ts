"use server"

import prisma from "@/db";
import { getServerSession } from "next-auth";

export async function getOpenApiFile() {
  const session = await getServerSession();
  if (!session?.user)
    return null;
  const result = await prisma.openApiFile.findMany({
    where: {
      email: session.user.email as string
    }
  })
  return result;
}

export async function getOpenApiPaths() {
  const session = await getServerSession();
  if (!session?.user)
    return null;

  const result = await prisma.apiPath.findMany({
    where: {
      OpenApiFile: {
        email: session.user.email
      }
    },
    include: {
      OpenApiFile: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
  return result;
}