import axios from "axios"
import { zapApiTest } from "./utils";
import schedule from 'node-schedule';

const ORCHESTRATOR_URL = process.env.ORCHESTRATOR_URL || "http://localhost:3005"

// Execute the api testing logic
async function mainTask() {
  try {
    let response, result;

    // Getting the api details to test from orchestrator
    response = await axios.post(`${ORCHESTRATOR_URL}/test`)
    result = response.data

    if (!result.data.url) {
      console.log("Going to sleep for 60 min")
      return false;
    }

    // Started testing using zap
    const testResult = await zapApiTest(result.data.url);

    const set = new Set();
    const finalData = {
      nodeInfo: {
        apiId: result.data.apiId
      },
      // Filtering the test result (removing same result)
      result: testResult?.alerts.filter((each) => {
        if (set.has(each.messageId))
          return false;
        set.add(each.messageId);
        return true;
      }) || []
    }

    // Sending the result to orchestrator to save the result
    response = await axios(`${ORCHESTRATOR_URL}/result`, {
      method: "POST",
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(finalData)
    })
    console.log(response.data);
    return true;
  } catch (error) {
    console.log(error);
    console.log("going for sleep for 60 min, error occur");
    return false;
  }
}

// Created a Cron job to execute testing based on api details of test
function scheduleNextJob(delayInSeconds: number) {
  const job = schedule.scheduleJob(new Date(Date.now() + delayInSeconds * 1000), async () => {

    const result = await mainTask();
    console.log("main result : ", result);

    let nextDelay;
    if (!result) {
      nextDelay = 60 * 60;
    }
    else {
      nextDelay = 1;
    }

    scheduleNextJob(nextDelay);
  });

  job.on('error', (err) => {
    console.error('Error scheduling job:', err);
  });
}

console.log("Start in 30 sec")
scheduleNextJob(120); // waiting for zap to start for initial if using docker (about 2 min to start zap)

