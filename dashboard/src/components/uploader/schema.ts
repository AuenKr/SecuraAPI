import { z } from "zod"

const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || "5000000"); // 5MB
const ACCEPTED_YAML_TYPES = ["text/yaml", "text/x-yaml", "application/x-yaml"];

export const uploadFormSchema = z.object({
  backendUrl: z.string().url(),
  file: z.any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_YAML_TYPES.includes(files?.[0]?.type),
      "Only .yaml and .yml formats are supported."
    )
})
