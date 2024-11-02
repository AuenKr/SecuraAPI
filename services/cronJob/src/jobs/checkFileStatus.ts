import axios from "axios";
import { ORCHESTRATOR_URL } from "../config";

export async function checkOpenApiFileStatus() {
  const response = await axios.post(`${ORCHESTRATOR_URL}/worker/file-status`);
  const data = response.data;

  console.log("List of file updated")
  console.log(data.result)
}