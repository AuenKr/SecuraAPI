import express from 'express';
import prisma from '../db';
import { Progress } from '@prisma/client';

const route = express.Router();

route.get('/', (req, res) => {
  res.json({
    msg: `Hello from ${req.baseUrl} route`,
  })
})

// to update the file status
route.post('/file-status', async (req, res) => {
  try {
    // Getting all openAPIfile details which do no have finish status
    const openApiFile = await prisma.openApiFile.findMany({
      where: {
        NOT: {
          progress: 'FINISH'
        }
      },
      include: {
        apiPath: true
      }

    })

    // Filtering the files id which have been completed
    const completedScan: string[] = [];

    openApiFile.forEach((apiFile) => {
      let completedEndpoint = 0;
      apiFile.apiPath.forEach((each) => {
        if (each.status === Progress.FINISH)
          completedEndpoint++;
      })
      if (completedEndpoint === apiFile.apiPath.length)
        completedScan.push(apiFile.id);
    })

    // Updating the status
    completedScan.forEach(async (id) => {
      await prisma.openApiFile.update({
        where: {
          id: id
        },
        data: {
          progress: Progress.FINISH
        }
      });
    });

    res.json({
      msg: "File status",
      result: completedScan
    });
  } catch (error) {
    console.log("error occur ", error);
    res.status(500).json({
      msg: "Internal server error",
      error
    });
  }

})  


export default route;