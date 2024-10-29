import express from 'express';
import { testSchema } from '../utils/schema';
import prisma from '../db';
import { Progress } from '@prisma/client';

const route = express.Router();

route.get('/', (req, res) => {
  res.json({
    msg: "Hello from /test route"
  })
})

route.post('/', async (req, res) => {
  const body = req.body;
  const parseValue = testSchema.safeParse(body);
  if (!parseValue.success) {
    throw new Error("Invalid Inputs")
  }

  const testAPI = await prisma.apiPath.findFirst({
    where: {
      status: Progress.TESTING
    },
    include: {
      OpenApiFile: true
    }
  })
  
  console.log(testAPI?.OpenApiFile?.servers)

  // @ts-ignore
  const baseUrl: string | null = testAPI?.OpenApiFile?.servers[0][0].url
  if (!testAPI) {
    res.status(401)
    res.json({
      msg: "No pending Test"
    })
  }
  if (!baseUrl) {
    await prisma.apiPath.update({
      where: {
        id: testAPI?.id
      },
      data: {
        status: Progress.FINISH
      }
    })
  }

  const finalData = {
    url: baseUrl || "" + testAPI?.path,
    apiID: testAPI?.id
  }

  res.json({
    msg: "Testing Data",
    data: finalData
  })
})

export default route