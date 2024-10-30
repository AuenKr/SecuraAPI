import axios from "axios";
import type { zapActiveScanReportType, zapActiveScanResultType } from "./zapType";

export class ZapProxy {
  apiKey: string;
  zapURL: string;

  constructor(ZAP_API_KEY: string, BASE_URL = "http://localhost:8080", FORMAT = "JSON") {
    this.apiKey = ZAP_API_KEY;
    this.zapURL = `${BASE_URL}/${FORMAT}`
  }

  // Spider Scan Start
  public async spiderScan(targetUrl: string) {
    const url = `${this.zapURL}/spider/action/scan/?apiKey=${this.apiKey}&url=${targetUrl}`;
    const response = await axios.get(url);
    return {
      scanId: parseInt(response.data.scan)
    }
  }

  // To view the scan status/ percentage of work done
  public async spiderScanStatus(scanId: number) {
    const url = `${this.zapURL}/spider/view/status/?apiKey=${this.apiKey}&scanId=${scanId}`;
    const response = await axios.get(url);
    return {
      status: parseInt(response.data.status)
    }
  }

  // # To view the scan results
  public async spiderScanResult(scanId: number) {
    const url = `${this.zapURL}/spider/view/results/?apiKey=${this.apiKey}&scanId=${scanId}`;
    const response = await axios.get(url);
    return {
      results: [...response.data.results as string[]]
    }
  }

  /*
    # To stop the scanning
    $ curl "http://localhost:8080/JSON/spider/action/stop/?apiKey=<ZAP_API_KEY>&scanId=<SCAN_ID>"
    # To pause the scanning
    $ curl "http://localhost:8080/JSON/spider/action/pause/?apiKey=<ZAP_API_KEY>&scanId=<SCAN_ID>"
    # To resume the scanning
    $ curl "http://localhost:8080/JSON/spider/action/resume/?apiKey=<ZAP_API_KEY>&scanId=<SCAN_ID>"
  */

  // # To view the number of records left to be scanned
  public async noRecordLeftScan() {
    const url = `${this.zapURL}/pscan/view/recordsToScan/?apiKey=${this.apiKey}`;
    const response = await axios.get(url);
    return {
      recordsToScan: parseInt(response.data.recordsToScan)
    }
  }

  // # To view the alerts of passive scan
  public async alertsScan(baseurl: string, start = 0, count = 10) {
    const url = `${this.zapURL}/core/view/alerts/?apiKey=${this.apiKey}&baseurl=${baseurl}&start=${start}&count=${count}`;
    const response = await axios.get(url);
    return {
      alerts: [...response.data.alerts]
    }
  }

  // # To start the the active scan, spider scan must be completed first
  public async activeScan(targetUrl: string, recurse = true, inScopeOnly = "", scanPolicyName = "", method = "", postData = "", contextId = "") {
    const url = `${this.zapURL}/ascan/action/scan/?apiKey=${this.apiKey}&url=${targetUrl}&recurse=${recurse}&inScopeOnly=${inScopeOnly}&scanPolicyName=${scanPolicyName}&method=${method}&postData=${postData}&contextId=${contextId}`;
    const response = await axios.get(url);
    return {
      scanId: parseInt(response.data.scan)
    }
  }

  // To view the status of active scan
  public async activeScanStatus(scanId: number) {
    const url = `${this.zapURL}/ascan/view/status/?apiKey=${this.apiKey}&scanId=${scanId}`;
    const response = await axios.get(url);
    return {
      status: parseInt(response.data.status)
    }
  }

  // To view the alerts of active scan
  public async activeScanAlert(baseUrl: string, start = 0, count = 10) {
    const url = `${this.zapURL}/core/view/alerts/?apiKey=${baseUrl}&baseurl=${baseUrl}&start=${start}&count=${count}`;
    const response = await axios.get(url);
    return {
      alerts: [...response.data.alerts]
    } as zapActiveScanResultType
  }

  // To stop the active scan
  // "http://localhost:8080/JSON/ascan/action/stop/?apiKey=<ZAP_API_KEY>&scanId=<SCAN_ID>"
}