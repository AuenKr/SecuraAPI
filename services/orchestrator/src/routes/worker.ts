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

    // Updating the status using batching
    const fileBatch: any[] = [];
    completedScan.forEach(async (id) => {
      let x = prisma.openApiFile.update({
        where: {
          id: id
        },
        data: {
          progress: Progress.FINISH
        }
      });
      fileBatch.push(x);
    });

    await Promise.all(fileBatch);

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

// reset the waiting status where test not complete within 10 mins after picking
route.post('/test-reset', async (req, res) => {
  try {
    const tests = await prisma.apiPath.findMany({
      where: {
        status: Progress.WAITING
      }
    });

    // Filtering test which status not not update within 10 mins
    const resetTests = tests.filter((test) => {
      const currentTime = new Date();
      const diff = currentTime.getTime() - test.updatedAt.getTime();
      return diff > 10 * 60 * 1000; // 60 min
    });

    if (resetTests.length === 0) {
      res.status(204).json({
        msg: "No test to reset"
      });
      return;
    }

    // reset of the test status using batching
    const apiBatch: any[] = []
    resetTests.forEach(async (test) => {
      let x = prisma.apiPath.update({
        where: {
          id: test.id
        },
        data: {
          status: Progress.TESTING
        }
      });
      apiBatch.push(x);
    });
    await Promise.all(apiBatch);

    res.json({
      msg: "Test reset",
      result: resetTests.map((test) => test.id)
    })
    return;
  } catch (error) {
    console.log("error occur ", error);
    res.status(500).json({
      msg: "Internal server error",
      error
    });
  }
})

// Delete old OTP from database - cronJob
route.post('/reset-otp', async (req, res) => {
  const currentTime = new Date();
  const result = await prisma.oTPVerify.deleteMany({
    where: {
      createdAt: {
        lt: new Date(currentTime.getTime() - 10 * 60 * 1000)
      }
    }
  });

  res.json({
    msg: "OTP reset",
    result
  });
});

export default route;