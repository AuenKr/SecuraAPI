import express from 'express';
import prisma from '../db';
import { testResultSchema } from '../utils/schema';
import { Progress } from '@prisma/client';

const route = express.Router();

route.get('/', (req, res) => {
  res.json({
    msg: `Hello from ${req.baseUrl} route`,
  })
});

route.post('/', async (req, res) => {
  try {
    const body = req.body;
    const parseData = testResultSchema.safeParse(body);
    if (!parseData.success) {
      console.log("error caused due to : ")
      console.log(parseData.error.errors)
      res.status(401).json({
        msg: "Invalid input error",
        error: parseData.error
      })
    }
    else {
      const set = new Set();
      const result = parseData.data.result.filter((each) => {
        if (set.has(each.messageId))
          return false;
        set.add(each.messageId);
        return true;
      });

      console.log("parsed Result : ", result)

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

      res.json({
        apiId: parseData.data?.nodeInfo.apiId,
        msg: "Data saved",
        result: updateValue
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error"
    })
  }
});

export default route;