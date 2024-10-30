import { z } from "zod";

export const testSchema = z.object({
  nodeId: z.string().optional(),
  publicAddress: z.string().optional()
})

export const testResultSchema = z.object({
  nodeInfo: z.object({
    nodeId: z.string().optional(),
    publicKey: z.string().optional(),
    apiId: z.string()
  }),
  result: z.object({
    alert: z.any().optional(),
    attack: z.any().optional(),
    confidence: z.any().optional(),
    risk: z.any().optional(),
    description: z.any().optional(),
    evidence: z.any().optional(),
    method: z.any().optional(),
    name: z.any().optional(),
    other: z.any().optional(),
    param: z.any().optional(),
    reference: z.any().optional(),
    solution: z.any().optional(),
    tags: z.any().optional(),
    apiPathId: z.any().optional(),
    messageId: z.any().optional()
  }).array()
})