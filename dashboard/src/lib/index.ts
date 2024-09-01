import SwaggerParser from "@apidevtools/swagger-parser";
import { formatApi } from './parse';
import fs from 'fs';

async function main() {
  try {
    const parser = new SwaggerParser();
    const json = await parser.parse("src/openapiSpec/blog.yaml");
    const result = formatApi(json);

    const opPath = "src/openapiSpec/blogFinal.json"
    fs.writeFileSync(opPath, JSON.stringify(result))
    console.log("Save to ", opPath)
  } catch (error) {
    console.log("Error: ", error);
  }
}

main()