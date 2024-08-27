import fs from 'fs';
import yaml from 'yaml';

// Function to parse OpenAPI spec and extract endpoint details
function parseOpenApiSpec(spec: any) {
  const paths = spec.paths;
  const endpoints = [];

  for (const path in paths) {
    const methods = paths[path];
    for (const method in methods) {
      const details = methods[method];
      const endpoint = {
        path,
        method,
        summary: details.summary || '',
        description: details.description || '',
        parameters: details.parameters || [],
        requestBody: details.requestBody || {},
        responses: details.responses || {},
      };
      endpoints.push(endpoint);
    }
  }

  return endpoints;
}

async function main() {
  // Read the OpenAPI spec file
  const filePath = 'openapi/binance.yaml'; // Update this path to your OpenAPI spec file
  const specContent = fs.readFileSync(filePath, 'utf8');
  const spec = yaml.parse(specContent);

  // Parse the OpenAPI spec and get the endpoints
  const endpoints = parseOpenApiSpec(spec);
  // Print the endpoints
  fs.writeFileSync(
    'openapi/parse/binanceParse.json',
    JSON.stringify({
      endpoints,
    })
  );
}

main().then(() => {
  console.log('Done');
});
