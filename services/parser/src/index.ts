import SwaggerParser from "@apidevtools/swagger-parser";
import { formatApi } from "./utils/parse";
import fs from 'fs';

async function main() {
  try {
    // async/await syntax
    let parser = new SwaggerParser();
    let parse = await parser.parse('openapi/binance.yaml');

    const result = formatApi(parse);
    fs.writeFileSync('openapi/parse/finalBinance.json', JSON.stringify(result));
    // console.log("result : ", result);
    // fs.writeFileSync('openapi/parse/test.json', JSON.stringify(parse));
    // Success
  } catch (err) {
    // Error
    console.log('error', err);
  }
}

main();