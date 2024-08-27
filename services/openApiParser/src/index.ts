import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';

async function main() {
  try {
    // async/await syntax
    let parser = new SwaggerParser();
    let parse = await parser.parse('openapi/binance.yaml');
    fs.writeFileSync('openapi/parse/binance.json', JSON.stringify(parse));
    // Success
  } catch (err) {
    // Error
    console.log('error', err);
  }
}

main();
