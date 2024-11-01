import { ZapProxy } from "./zapTest";
import dotenv from 'dotenv';

dotenv.config();

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ZAP_API_KEY = `${process.env.ZAP_API_KEY || "RoRaxA6c1e8x+U1NvdPLMlmboJqnEYGfr1/VlnrNvW8="}`;
const ZAP_API_URL = `${process.env.ZAP_API_URL || "http://localhost:8081"}`;
const waitTime = parseInt(process.env.WAIT_TIME || "") || 2000;

export async function zapApiTest(testUrl: string) {
    const zap = new ZapProxy(ZAP_API_KEY, ZAP_API_URL, "JSON");
    console.log("test started for ", testUrl);

    let result, statusCode;
    result = await zap.alertsScan(testUrl);

    const { scanId } = await zap.spiderScan(testUrl);

    result = await zap.spiderScanStatus(scanId);

    statusCode = (await zap.spiderScanStatus(scanId)).status
    while (statusCode < 100) {
      await delay(waitTime);
      statusCode = (await zap.spiderScanStatus(scanId)).status
      console.log("restart spider scan process ", statusCode)
    }

    result = await zap.spiderScanResult(scanId);

    const { scanId: activeId } = await zap.activeScan(testUrl);

    result = await zap.activeScanStatus(activeId);

    statusCode = result.status;
    while (statusCode < 100) {
      await delay(waitTime);
      statusCode = (await zap.activeScanStatus(activeId)).status
      console.log("restarted active status search ", statusCode)
    }

    result = await zap.activeScanAlert(testUrl);

    console.log("length of alerts : ", result.alerts.length)
    return result;
}