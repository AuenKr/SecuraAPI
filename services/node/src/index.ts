import axios from "axios"
import { zapApiTest } from "./utils";
import schedule from 'node-schedule';
import dotenv from 'dotenv';

dotenv.config();

const ORCHESTRATOR_URL = process.env.ORCHESTRATOR_URL || "http://localhost:3005"
const SLEEP_TIME = process.env.SLEEP_TIME || "3600"; // 60 min

// Execute the api testing logic
async function mainTask() {
  try {
    let response, result;

    // Getting the api details to test from orchestrator
    response = await axios.post(`${ORCHESTRATOR_URL}/test`)
    result = response.data

    if (response.status === 204) {
      console.log("No pending test");
      return false;
    }

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

    let nextDelay: number;
    if (!result) {
      console.log("Going to sleep for 60 min");
      nextDelay = parseInt(SLEEP_TIME);
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

console.log("Start in 120 sec")
scheduleNextJob(120); // waiting for zap to start for initial if using docker (about 2 min to start zap)

