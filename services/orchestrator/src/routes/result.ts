import express from 'express';
import prisma from '../db';
import { testResultSchema } from '../utils/schema';
import { Progress } from '@prisma/client';

const route = express.Router();

route.get('/', (req, res) => {
  res.json({
    msg: "Hello from /result route"
  })
})

route.post('/', async (req, res) => {
  const body = req.body;
  const parseData = testResultSchema.safeParse(body);
  if (!parseData.success)
    throw new Error("Invalid Input type");

  const result = parseData.data.result.filter((each) => each);

  const updateValue = await prisma.testResult.createMany({
    data: result.map((each: any) => {
      const data = {
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
        apiPathId: parseData.data.nodeInfo.apiId
      }
      return data;
    })
  })

  await prisma.apiPath.update(({
    where: {
      id: parseData.data.nodeInfo.apiId
    },
    data: {
      status: Progress.FINISH
    }
  }))
})

export default route