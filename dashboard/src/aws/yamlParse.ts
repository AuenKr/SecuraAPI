import { yamlToFormatJson } from "@/lib/parse";
import fs from 'fs';

export async function downloadAndParseYaml(presignedUrl: string, key: string) {

  const path = `src/openapiSpec/${key}`;
  if (!fs.existsSync(path)) {
    const response = await fetch(presignedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch YAML file: ${response.status} ${response.statusText}`);
    }
    const yamlContent = await response.text();
    fs.writeFileSync(path, yamlContent);
  }
  const parsedData = await yamlToFormatJson(path);
  return parsedData;
}