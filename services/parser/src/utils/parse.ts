export function getReferenceValue(json: Object, ref: string) {
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
export function getParameters(detail: Object, json: Object) {
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
export function getRequestBody(detail: Object, json: Object) {
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
export function getResponseBody(detail: Object, json: Object) {
  const data = detail["responses"]
  if (!data)
    return null

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
export function getSecurityBody(detail: Object, json: Object) {
  const data = detail["security"];
  if (!data || !json["security"])
    return null
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

export function openApiFileDetail(json: Object) {
  return {
    openapiVersion: json["openapi"],
    title: json["info"].title,
    description: json["info"].description,
    servers: json["servers"]
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
        paths: key,
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

  return { ...openApiFileDesc, paths: allPathDetail }
}