import express from 'express';
import { testSchema } from '../utils/schema';
import prisma from '../db';
import { Progress } from '@prisma/client';

const route = express.Router();

route.get('/', (req, res) => {
  res.json({
    msg: `Hello from ${req.baseUrl} route`,
  })
})

route.post('/', async (req, res) => {
  try {
    const body = req.body;
    const parseValue = testSchema.safeParse(body);
    if (!parseValue.success) {
      res.status(404).json({
        msg: "Invalid inputs"
      })
    }

    const testAPI = await prisma.apiPath.findFirst({
      where: {
        status: Progress.TESTING
      },
      include: {
        OpenApiFile: true
      }
    })

    if (!testAPI) {
      res.json({
        msg: "Go to sleep, no task pending"
      })
    }

    // @ts-ignore
    const baseUrl: string | null = testAPI?.OpenApiFile?.servers[0][0].url
    if (!testAPI) {
      res.status(401).json({
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
      url: (baseUrl || "") + testAPI?.path,
      apiId: testAPI?.id
    }

    res.json({
      msg: "Testing Data",
      data: finalData
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
      error
    })
  }
})

export default route;