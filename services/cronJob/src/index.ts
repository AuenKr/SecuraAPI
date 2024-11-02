import { checkOpenApiFileStatus } from './jobs/checkFileStatus';
import { resetOTP } from './jobs/resetOTP';
import { createCronJob } from './utils/createCronJob';

async function main() {
  console.log("started creating cron jobs");

  console.log("create for checkOpenApiFileStatus");
  await createCronJob(checkOpenApiFileStatus, 5 * 60); // runs every 5 mins

  console.log("created for reset OTP");
  await createCronJob(resetOTP, 5 * 60 * 60); // runs every 5 hours
}

main();