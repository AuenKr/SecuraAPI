import dotenv from 'dotenv';

dotenv.config();

export const ORCHESTRATOR_URL = process.env.ORCHESTRATOR_URL || "http://localhost:3005"
