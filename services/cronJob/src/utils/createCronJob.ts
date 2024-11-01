import schedule from 'node-schedule';

export async function createCronJob(functionToExecute: any, delayInSeconds: number) {
  const job = schedule.scheduleJob(new Date(Date.now() + delayInSeconds * 1000), async () => {
    try {
      await functionToExecute();
    } catch (error) {
      console.log("Error occur while executing the function ", error);
      console.log("Restart in ", delayInSeconds, " sec");
    }
    createCronJob(functionToExecute, delayInSeconds);
  });

  job.on('error', (err) => {
    console.error('Error scheduling job:', err);
  });
}