// @ts-nocheck
import SwaggerParser from "@apidevtools/swagger-parser";

function getReferenceValue(json: Object, ref: string) {
  const path = ref.split("/");
  let result = json;
  // #/components/schemas/User => ["#", "components", "schemas", "account"]
  path.forEach(element => {
    if (element !== "#") {
      result = result[element];
    }
  });
  return result;
}

// Processing Parameters $ref
function getParameters(detail: Object, json: Object): any[] {
  if (!detail["parameters"])
    return [];

  const data = detail["parameters"]
  const parameters = data.map((each) => {
    const schema = Object.keys(each)
    if (schema[0] == "$ref" && each["$ref"]) {
      const result = getReferenceValue(json, each["$ref"])
      return result;
    }
    return each;
  })
  return parameters;
}

// Processing Request Body $ref
function getRequestBody(detail: Object, json: Object): object | null {
  const data = detail["requestBody"]
  if (!data)
    return null
  let requestBody = data;
  let schema = requestBody["content"]["application/json"];
  let schemaKey = Object.keys(schema);
  if (schemaKey[0] === "$ref" && schema["$ref"])
    schema = getReferenceValue(json, schema["$ref"]);

  requestBody = {
    ...requestBody,
    content: {
      "application/json": schema
    }
  }
  return requestBody;
}

// Processing Response Body
function getResponseBody(detail: Object, json: Object): any[] {
  const data = detail["responses"]
  if (!data)
    return []

  const allStatus = Object.keys(data);
  let responsesBody = allStatus.map((each) => {
    let responseBody = data[each];
    if (!responseBody["content"])
      return null
    let schema = responseBody["content"]["application/json"]["schema"];
    let schemaKey = Object.keys(schema);
    if (schemaKey[0] === "$ref" && schema["$ref"])
      schema = getReferenceValue(json, schema["$ref"]);

    responseBody = {
      ...responseBody,
      content: {
        "application/json": {
          schema,
        }
      }
    }
    return responseBody;
  })

  return responsesBody.filter((each) => each);
}

// Processing Security Keys
function getSecurityBody(detail: Object, json: Object): any[] {
  const data = detail["security"];
  if (!data || !json["security"])
    return []
  const security = data;
  const result = security.map((each) => {
    const keys = Object.keys(each);
    const currReq = json["security"].filter((each) => {
      return each[keys[0]];
    })

    const detail = json["components"]["securitySchemes"][keys[0]]
    const data = {
      currValue: each[keys[0]],
      security: currReq,
      detail,
    }
    return data;
  })
  return result;
}

function openApiFileDetail(json: Object) {
  return {
    openapiVersion: json["openapi"] as string,
    title: json["info"].title as string | null,
    description: json["info"].description as string | null,
    servers: json["servers"] as any[],
    path: json["paths"] as any[],
  }
}

export function formatApi(json: Object) {
  const openApiFileDesc = openApiFileDetail(json);

  if (!json["paths"])
    return openApiFileDesc;

  const keys = Object.keys(json["paths"]);
  let allPathDetail: any[] = [];
  keys.forEach((key) => {
    const methods = Object.keys(json["paths"][key]);
    methods.forEach((method) => {
      const detail = json["paths"][key][method];

      // Parsing $ref value
      const parameters = getParameters(detail, json);
      const requestBody = getRequestBody(detail, json);
      const responseBody = getResponseBody(detail, json);
      const securityBody = getSecurityBody(detail, json);

      const finalDetail = {
        path: key,
        method,
        summary: detail["summary"],
        description: detail["description"],
        parameters,
        requestBody,
        responseBody,
        securityBody,
      }
      allPathDetail.push(finalDetail);
    })
  })

  return { ...openApiFileDesc, path: allPathDetail }
}

export async function OpenApiJsonConverter(path: string) {
  const parser = new SwaggerParser();
  const json = await parser.parse(path);
  return json;
}
export async function yamlToFormatJson(path: string) {
  const json = await OpenApiJsonConverter(path);
  const result = formatApi(json);
  return result
}