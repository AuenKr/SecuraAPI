import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const ORCHESTRATOR_URL = process.env.ORCHESTRATOR_URL || "http://localhost:3005"
export async function checkOpenApiFileStatus() {
  const response = await axios.post(`${ORCHESTRATOR_URL}/worker/file-status`);
  const data = response.data;

  console.log("List of file updated")
  console.log(data.result)
}