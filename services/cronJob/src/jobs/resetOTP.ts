import axios from "axios";
import { ORCHESTRATOR_URL } from "../config";

export async function resetOTP() {
  const response = await axios.post(`${ORCHESTRATOR_URL}/worker/reset-otp`);
  console.log("OTP reset ");
  console.log(response.data);
}