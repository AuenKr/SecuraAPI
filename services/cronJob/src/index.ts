import dotenv from 'dotenv';
import { checkOpenApiFileStatus } from './jobs/checkFileStatus';
import { createCronJob } from './utils/createCronJob';

dotenv.config();

async function main() {
  console.log("started creating cron jobs");
  await createCronJob(checkOpenApiFileStatus, 5 * 60);
}

main();