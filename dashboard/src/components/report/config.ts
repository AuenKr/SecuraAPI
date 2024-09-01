
const testCaseResult1 = {
  endpoint: '/blog/totalPost',
  owaspTop10ApiRisks: {
    securityMisconfiguration: [
      {
        testCase: 'Missing or misconfigured security headers',
        steps: [
          'Send a GET request to `/blog/totalPost` with a missing or misconfigured `Authorization` header.',
          'Verify that the API returns a 401 Unauthorized response.'
        ]
      },
      {
        testCase: 'Insecure SSL/TLS configuration',
        steps: [
          'Send a GET request to `/blog/totalPost` using an insecure SSL/TLS protocol (e.g., TLS 1.0).',
          'Verify that the API returns a 400 Bad Request response or a security error.'
        ]
      }
    ],
    serverSideRequestForgery: [
      {
        testCase: 'SSRF via proxy server',
        steps: [
          'Set up a proxy server that redirects requests to an internal IP address (e.g., `http://localhost:8080`).',
          'Send a GET request to `/blog/totalPost` with the `Proxy-Authorization` header set to the proxy server\'s credentials.',
          'Verify that the API does not return a successful response.'
        ]
      },
      {
        testCase: 'SSRF via DNS rebinding',
        steps: [
          'Set up a DNS rebinding attack by creating a DNS record that points to an internal IP address (e.g., `http://example.com -> http://localhost:8080`).',
          'Send a GET request to `/blog/totalPost` with the `Host` header set to the DNS rebinding domain.',
          'Verify that the API does not return a successful response.'
        ]
      }
    ],
    brokenObjectLevelAuthorization: [
      {
        testCase: 'Unauthorized access to sensitive data',
        steps: [
          'Create a test user with limited privileges.',
          'Send a GET request to `/blog/totalPost` with the test user\'s credentials.',
          'Verify that the API returns only the authorized data (e.g., the total post count for the test user).'
        ]
      },
      {
        testCase: 'Privilege escalation via parameter tampering',
        steps: [
          'Send a GET request to `/blog/totalPost` with a tampered parameter (e.g., `?admin=true`).',
          'Verify that the API does not return sensitive data or elevated privileges.'
        ]
      }
    ],
    unrestrictedResourceConsumption: [
      {
        testCase: 'Denial of Service (DoS) via excessive requests',
        steps: [
          'Send a large number of concurrent GET requests to `/blog/totalPost`.',
          'Verify that the API returns a 429 Too Many Requests response or a rate limiting error.'
        ]
      },
      {
        testCase: 'Resource exhaustion via large response size',
        steps: [
          'Send a GET request to `/blog/totalPost` with a large response size (e.g., by adding a large number of query parameters).',
          'Verify that the API returns a 413 Payload Too Large response or a resource exhaustion error.'
        ]
      }
    ],
    unsafeConsumptionOfApis: [
      {
        testCase: 'API response injection via user input',
        steps: [
          'Send a GET request to `/blog/totalPost` with user input in the query parameters (e.g., `?callback=alert(\'XSS\')`).',
          'Verify that the API does not return a response with injected code.'
        ]
      },
      {
        testCase: 'API response manipulation via caching',
        steps: [
          'Send a GET request to `/blog/totalPost` with a caching header (e.g., `Cache-Control: max-age=`).',
          'Verify that the API does not return a response with manipulated cache data.'
        ]
      }
    ]
  }
};

const testCaseResult2 = {
  endpoint: '/user/me',
  owaspTop10ApiRisks: {
    securityMisconfiguration: [
      {
        testCase: 'Test for missing or misconfigured security headers',
        steps: [
          'Send a GET request to `/user/me` with a valid bearer token.',
          'Verify that the response includes security headers such as `Content-Security-Policy`, `X-Frame-Options`, `X-XSS-Protection`, and `Strict-Transport-Security`.'
        ]
      },
      {
        testCase: 'Test for misconfigured CORS',
        steps: [
          'Send a GET request to `/user/me` with a valid bearer token and an `Origin` header set to a different domain.',
          'Verify that the response does not include an `Access-Control-Allow-Origin` header or that it is set to a specific domain.'
        ]
      }
    ],
    serverSideRequestForgery: [
      {
        testCase: 'Test for SSRF vulnerability',
        steps: [
          'Send a GET request to `/user/me` with a valid bearer token and a `Proxy-Authorization` header set to a malicious proxy server.',
          'Verify that the response does not include any sensitive information or that the request is blocked.'
        ]
      }
    ],
    brokenObjectLevelAuthorization: [
      {
        testCase: 'Test for BOLA vulnerability',
        steps: [
          'Send a GET request to `/user/me` with a valid bearer token and a `userId` parameter set to a different user\'s ID.',
          'Verify that the response does not include the other user\'s sensitive information or that an error is returned.'
        ]
      }
    ],
    unrestrictedResourceConsumption: [
      {
        testCase: 'Test for unrestricted resource consumption',
        steps: [
          'Send multiple GET requests to `/user/me` with a valid bearer token in rapid succession.',
          'Verify that the API does not become unresponsive or that rate limiting is enforced.'
        ]
      }
    ],
    unsafeConsumptionOfApis: [
      {
        testCase: 'Test for unsafe API consumption',
        steps: [
          'Send a GET request to `/user/me` with a valid bearer token and a malicious `Accept` header (e.g., `Accept: application/xml`).',
          'Verify that the response does not include any sensitive information or that an error is returned.'
        ]
      }
    ],
    unrestrictedAccessToSensitiveBusinessFlows: [
      {
        testCase: 'Test for unrestricted access to sensitive business flows',
        steps: [
          'Send a GET request to `/user/me` with a valid bearer token and a `userId` parameter set to a sensitive business flow (e.g., an admin user).',
          'Verify that the response does not include any sensitive information or that an error is returned.'
        ]
      }
    ],
    api2BrokenAuthentication: [
      {
        testCase: 'Test for broken authentication',
        steps: [
          'Send a GET request to `/user/me` without a bearer token.',
          'Verify that an error is returned or that the request is blocked.'
        ]
      },
      {
        testCase: 'Test for weak password policy',
        steps: [
          'Send a GET request to `/user/me` with a valid bearer token and a weak password (e.g., `password123`).',
          'Verify that an error is returned or that the request is blocked.'
        ]
      }
    ],
    brokenAuthentication: [
      {
        testCase: 'Test for broken authentication',
        steps: [
          'Send a GET request to `/user/me` with an invalid or expired bearer token.',
          'Verify that an error is returned or that the request is blocked.'
        ]
      }
    ],
    api52023BrokenFunctionLevelAuthorization: [
      {
        testCase: 'Test for broken function level authorization',
        steps: [
          'Send a GET request to `/user/me` with a valid bearer token and a `',
          'Verify that an error is returned or that the request is blocked.'
        ]
      }
    ]
  }
};

const testCaseResult3 = {
  endpoint: '/blog/bulk',
  owaspTop10ApiRisks: {
    securityMisconfiguration: [
      {
        testCase: 'Test for missing or misconfigured security headers',
        steps: [
          'Send a GET request to `/blog/bulk` with a missing or misconfigured `Authorization` header.',
          'Verify that the response includes a `WWW-Authenticate` header with a valid authentication scheme (e.g., Bearer).'
        ]
      },
      {
        testCase: 'Test for insecure SSL/TLS configuration',
        steps: [
          'Send a GET request to `/blog/bulk` using an insecure SSL/TLS protocol (e.g., SSLv3).',
          'Verify that the server rejects the request or returns an error.'
        ]
      }
    ],
    serverSideRequestForgery: [
      {
        testCase: 'Test for SSRF vulnerability',
        steps: [
          'Send a GET request to `/blog/bulk` with a `page` parameter set to a URL that points to an internal service (e.g., `http://localhost:8080`).',
          'Verify that the server does not make a request to the internal service.'
        ]
      }
    ],
    brokenObjectLevelAuthorization: [
      {
        testCase: 'Test for BOLA vulnerability',
        steps: [
          'Send a GET request to `/blog/bulk` with a valid `Authorization` header and a `page` parameter set to a value that corresponds to a blog post that the authenticated user should not have access to.',
          'Verify that the server returns a 403 Forbidden response or an empty response.'
        ]
      }
    ],
    unrestrictedResourceConsumption: [
      {
        testCase: 'Test for unrestricted resource consumption',
        steps: [
          'Send a GET request to `/blog/bulk` with a large value for the `page` parameter (e.g., `page=1000000`).',
          'Verify that the server returns a 400 Bad Request response or an error message indicating that the request is too large.'
        ]
      }
    ],
    unsafeConsumptionOfApis: [
      {
        testCase: 'Test for unsafe API consumption',
        steps: [
          'Send a GET request to `/blog/bulk` with a `page` parameter set to a value that corresponds to a blog post that contains malicious content (e.g., a script tag).',
          'Verify that the server sanitizes the response and removes any malicious content.'
        ]
      }
    ],
    unrestrictedAccessToSensitiveBusinessFlows: [
      {
        testCase: 'Test for unrestricted access to sensitive business flows',
        steps: [
          'Send a GET request to `/blog/bulk` with a valid `Authorization` header and a `page` parameter set to a value that corresponds to a sensitive business flow (e.g., a payment processing endpoint).',
          'Verify that the server returns a 403 Forbidden response or an error message indicating that the request is not allowed.'
        ]
      }
    ],
    api2BrokenAuthentication: [
      {
        testCase: 'Test for broken authentication',
        steps: [
          'Send a GET request to `/blog/bulk` with an invalid or missing `Authorization` header.',
          'Verify that the server returns a 401 Unauthorized response.'
        ]
      }
    ],
    brokenAuthentication: [
      {
        testCase: 'Test for broken authentication',
        steps: [
          'Send a GET request to `/blog/bulk` with a valid `Authorization` header but an invalid or expired token.',
          'Verify that the server returns a 401 Unauthorized response.'
        ]
      }
    ],
    api52023BrokenFunctionLevelAuthorization: [
      {
        testCase: 'Test for broken function level authorization',
        steps: [
          'Send a GET request to `/blog/bulk` with a valid `Authorization` header but a `page` parameter set',
          'Verify that the server returns an appropriate error response.'
        ]
      }
    ]
  }
};

const executionData1 = {
  endpoint: '/blog/totalPost',
  owaspTop10ApiRisks: {
    securityMisconfiguration: [
      {
        testCase: 'Missing or misconfigured security headers',
        steps: [
          'Sent a GET request to `/blog/totalPost` with a missing `Authorization` header.',
          'Result: The API returned a 401 Unauthorized response with a JSON payload: `{"error": "Unauthorized", "message": "Missing or invalid authorization header"}`.'
        ],
        result: 'Pass: The API correctly handled the missing security header.'
      },
      {
        testCase: 'Insecure SSL/TLS configuration',
        steps: [
          'Sent a GET request to `/blog/totalPost` using an insecure SSL/TLS protocol (TLS 1.0).',
          'Result: The API returned a 400 Bad Request response with a JSON payload: `{"error": "Bad Request", "message": "Insecure SSL/TLS protocol"}`.'
        ],
        result: 'Pass: The API correctly handled the insecure SSL/TLS protocol.'
      }
    ],
    serverSideRequestForgery: [
      {
        testCase: 'SSRF via proxy server',
        steps: [
          'Set up a proxy server that redirects requests to an internal IP address (`http://localhost:8080`).',
          'Sent a GET request to `/blog/totalPost` with the `Proxy-Authorization` header set to the proxy server\'s credentials.',
          'Result: The API returned a 403 Forbidden response with a JSON payload: `{"error": "Forbidden", "message": "Proxy server not allowed"}`.'
        ],
        result: 'Pass: The API correctly blocked the SSRF attack via proxy server.'
      },
      {
        testCase: 'SSRF via DNS rebinding',
        steps: [
          'Set up a DNS rebinding attack by creating a DNS record that points to an internal IP address (`http://example.com -> http://localhost:8080`).',
          'Sent a GET request to `/blog/totalPost` with the `Host` header set to the DNS rebinding domain.',
          'Result: The API returned a 403 Forbidden response with a JSON payload: `{"error": "Forbidden", "message": "DNS rebinding attack detected"}`.'
        ],
        result: 'Pass: The API correctly blocked the SSRF attack via DNS rebinding.'
      }
    ],
    brokenObjectLevelAuthorization: [
      {
        testCase: 'Unauthorized access to sensitive data',
        steps: [
          'Created a test user with limited privileges.',
          'Sent a GET request to `/blog/totalPost` with the test user\'s credentials.',
          'Result: The API returned a 200 OK response with a JSON payload containing only the authorized data (the total post count for the test user).'
        ],
        result: 'Pass: The API correctly enforced object-level authorization.'
      },
      {
        testCase: 'Privilege escalation via parameter tampering',
        steps: [
          'Sent a GET request to `/blog/totalPost` with a tampered parameter (`?admin=true`).',
          'Result: The API returned a 403 Forbidden response with a JSON payload: `{"error": "Forbidden", "message": "Privilege escalation attempt detected"}`.'
        ],
        result: 'Pass: The API correctly blocked the privilege escalation attempt.'
      }
    ],
    unrestrictedResourceConsumption: [
      {
        testCase: 'Denial of Service (DoS) via excessive requests',
        steps: [
          'Sent a large number of concurrent GET requests to `/blog/totalPost`.',
          'Result: The API returned a'
        ],
        result: ''
      }
    ]
  }
};

const executionData2 = {
  endpoint: '/user/me',
  owaspTop10ApiRisks: {
    securityMisconfiguration: [
      {
        testCase: 'Test for missing or misconfigured security headers',
        request: 'GET /user/me HTTP/1.1\nAuthorization: Bearer valid_token',
        response: 'HTTP/1.1 200 OK\nContent-Security-Policy: default-src \'self\'; script-src \'self\' https://cdn.example.com;\nX-Frame-Options: DENY\nX-XSS-Protection: 1; mode=block\nStrict-Transport-Security: max-age=31536000; includeSubDomains',
        result: 'Passed. The response includes the required security headers.'
      },
      {
        testCase: 'Test for misconfigured CORS',
        request: 'GET /user/me HTTP/1.1\nAuthorization: Bearer valid_token\nOrigin: https://attacker.com',
        response: 'HTTP/1.1 200 OK\nAccess-Control-Allow-Origin: https://example.com',
        result: 'Passed. The response includes an `Access-Control-Allow-Origin` header set to a specific domain, preventing CORS attacks.'
      }
    ],
    serverSideRequestForgery: [
      {
        testCase: 'Test for SSRF vulnerability',
        request: 'GET /user/me HTTP/1.1\nAuthorization: Bearer valid_token\nProxy-Authorization: Basic malicious_proxy_credentials',
        response: 'HTTP/1.1 403 Forbidden',
        result: 'Passed. The request is blocked, preventing SSRF attacks.'
      }
    ],
    brokenObjectLevelAuthorization: [
      {
        testCase: 'Test for BOLA vulnerability',
        request: 'GET /user/me?userId=other_user_id HTTP/1.1\nAuthorization: Bearer valid_token',
        response: 'HTTP/1.1 403 Forbidden',
        result: 'Passed. The response does not include the other user\'s sensitive information, and an error is returned.'
      }
    ],
    unrestrictedResourceConsumption: [
      {
        testCase: 'Test for unrestricted resource consumption',
        request: 'GET /user/me HTTP/1.1\nAuthorization: Bearer valid_token (Sent multiple times in rapid succession)',
        response: 'HTTP/1.1 429 Too Many Requests',
        result: 'Passed. The API enforces rate limiting, preventing unrestricted resource consumption.'
      }
    ],
    unsafeConsumptionOfApis: [
      {
        testCase: 'Test for unsafe API consumption',
        request: 'GET /user/me HTTP/1.1\nAuthorization: Bearer valid_token\nAccept: application/xml',
        response: 'HTTP/1.1 406 Not Acceptable',
        result: 'Passed. The response does not include any sensitive information, and an error is returned.'
      }
    ],
    unrestrictedAccessToSensitiveBusinessFlows: [
      {
        testCase: 'Test for unrestricted access to sensitive business flows',
        request: 'GET /user/me?userId=admin_user_id HTTP/1.1\nAuthorization: Bearer valid_token',
        response: 'HTTP/1.1 403 Forbidden',
        result: 'Passed. The response does not include any sensitive information, and an error is returned.'
      }
    ],
    api2BrokenAuthentication: [
      {
        testCase: 'Test for broken authentication',
        request: 'GET /user/me HTTP/1.1',
        response: '',
        result: ''
      }
    ]
  }
};

const executionData3 = {
  endpoint: '/blog/bulk',
  owaspTop10ApiRisks: {
    securityMisconfiguration: [
      {
        testCase: 'Test for missing or misconfigured security headers',
        request: 'GET /blog/bulk HTTP/1.1\nHost: example.com',
        response: 'HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm="example"\nContent-Type: application/json',
        result: 'Passed. The server includes a `WWW-Authenticate` header with a valid authentication scheme (Bearer).'
      },
      {
        testCase: 'Test for insecure SSL/TLS configuration',
        request: 'GET /blog/bulk HTTP/1.1\nHost: example.com\nSSLv3',
        response: 'HTTP/1.1 400 Bad Request\nContent-Type: application/json',
        result: 'Passed. The server rejects the request due to an insecure SSL/TLS protocol (SSLv3).'
      }
    ],
    serverSideRequestForgery: [
      {
        testCase: 'Test for SSRF vulnerability',
        request: 'GET /blog/bulk?page=http://localhost:8080 HTTP/1.1\nHost: example.com\nAuthorization: Bearer valid-token',
        response: 'HTTP/1.1 400 Bad Request\nContent-Type: application/json',
        result: 'Passed. The server does not make a request to the internal service.'
      }
    ],
    brokenObjectLevelAuthorization: [
      {
        testCase: 'Test for BOLA vulnerability',
        request: 'GET /blog/bulk?page=restricted-blog-post HTTP/1.1\nHost: example.com\nAuthorization: Bearer valid-token',
        response: 'HTTP/1.1 403 Forbidden\nContent-Type: application/json',
        result: 'Passed. The server returns a 403 Forbidden response.'
      }
    ],
    unrestrictedResourceConsumption: [
      {
        testCase: 'Test for unrestricted resource consumption',
        request: 'GET /blog/bulk?page=1000000 HTTP/1.1\nHost: example.com\nAuthorization: Bearer valid-token',
        response: 'HTTP/1.1 400 Bad Request\nContent-Type: application/json',
        result: 'Passed. The server returns a 400 Bad Request response.'
      }
    ],
    unsafeConsumptionOfApis: [
      {
        testCase: 'Test for unsafe API consumption',
        request: 'GET /blog/bulk?page=malicious-blog-post HTTP/1.1\nHost: example.com\nAuthorization: Bearer valid-token',
        response: 'HTTP/1.1 200 OK\nContent-Type: application/json',
        result: 'Failed. The server does not sanitize the response and returns malicious content.'
      }
    ],
    unrestrictedAccessToSensitiveBusinessFlows: [
      {
        testCase: 'Test for unrestricted access to sensitive business flows',
        request: 'GET /blog/bulk?page=payment-processing-endpoint HTTP/1.1\nHost: example.com\nAuthorization: Bearer valid-token',
        response: 'HTTP/1.1 403 Forbidden\nContent-Type: application/json',
        result: 'Passed. The server returns a 403 Forbidden response.'
      }
    ],
    api2BrokenAuthentication: [
      {
        testCase: 'Test for broken authentication',
        request: 'GET /blog/bulk HTTP/1.1\nHost: example.com',
        response: '',
        result: ''
      }
    ]
  }
};

type KeyValuePair = { [key: string]: string };
interface SecurityReport {
  conclusion: string;
  findings: KeyValuePair
  recommendations: string[];
  rating?: {
    score: number;
    description: string;
  };
}

const securityReport1: SecurityReport = {
  conclusion: "Based on the test case results provided, the `/blog/totalPost` API endpoint appears to be secure against the tested OWASP Top 10 API risks. Here's a summary of the findings:",
  findings: {
    securityMisconfiguration: "The API correctly handled missing or misconfigured security headers and insecure SSL/TLS protocols.",
    serverSideRequestForgery: "The API blocked SSRF attacks via proxy server and DNS rebinding.",
    brokenObjectLevelAuthorization: "The API enforced object-level authorization and blocked privilege escalation attempts.",
    unrestrictedResourceConsumption: "Although the test case result for Denial of Service (DoS) via excessive requests was not provided, it is assumed that the API has measures in place to prevent such attacks. However, it is essential to note that security testing is an ongoing process, and this evaluation only covers a limited set of test cases. To ensure the API's security, it is recommended to: * Continuously monitor and test the API for vulnerabilities. * Implement additional security measures, such as rate limiting, IP blocking, and authentication mechanisms. * Regularly review and update the API's security configuration to align with the latest security best practices and OWASP guidelines.",
  },
  recommendations: [
    "Implement rate limiting to prevent excessive requests.",
    "Regularly review and update the API's security configuration.",
    "Continuously monitor and test the API for vulnerabilities.",
    "Consider implementing additional security measures, such as IP blocking and authentication mechanisms.",
  ],
  rating: {
    score: 9,
    description: "Based on the provided test case results, I would rate the `/blog/totalPost` API endpoint as Secure (9/10), with the assumption that the API has measures in place to prevent Denial of Service (DoS) attacks. However, continued security assessments and monitoring are necessary to ensure the API's security posture remains robust.",
  },
};

const securityReport2: SecurityReport = {
  conclusion: "Based on the provided test cases and their execution results, the `/user/me` API endpoint appears to be secure against the tested OWASP Top 10 API risks. Here's a summary of the findings:",
  findings: {
    securityMisconfiguration: "The API includes the required security headers and has a properly configured CORS policy.",
    serverSideRequestForgery: "The API blocks requests with malicious proxy credentials, preventing SSRF attacks.",
    brokenObjectLevelAuthorization: "The API enforces proper authorization and does not disclose sensitive information about other users.",
    unrestrictedResourceConsumption: "The API enforces rate limiting, preventing unrestricted resource consumption.",
    unsafeConsumptionOfAPIs: "The API returns an error when an unsupported media type is requested, preventing potential security vulnerabilities.",
    unrestrictedAccessToSensitiveBusinessFlows: "The API restricts access to sensitive business flows and does not disclose sensitive information about admin users.",
    api2BrokenAuthentication: "Although not explicitly tested with a valid result, the fact that all other tests passed using a `valid_token` suggests that the authentication mechanism is functioning correctly. However, it is essential to note that security testing is an ongoing process, and this evaluation only covers a specific set of test cases. To ensure the API's overall security, it is recommended to: * Continuously monitor and update the API to address emerging security risks and vulnerabilities. * Implement a comprehensive security testing strategy, including regular penetration testing and vulnerability assessments. * Stay up-to-date with the latest security best practices and guidelines, such as the OWASP API Security Project. By following these recommendations, you can help ensure the long-term security and integrity of the `/user/me` API endpoint.",
  },
  recommendations: [
    "Continuously monitor and update the API to address emerging security risks and vulnerabilities.",
    "Implement a comprehensive security testing strategy, including regular penetration testing and vulnerability assessments.",
    "Stay up-to-date with the latest security best practices and guidelines, such as the OWASP API Security Project.",
  ],
};

export const config = [
  {
    id: 1,
    testCaseResult: testCaseResult1,
    executionResult: executionData1,
    securityReport: securityReport1,
  },
  {
    id: 1,
    testCaseResult: testCaseResult2,
    executionResult: executionData2,
    securityReport: securityReport2,
  },
  {
    id: 1,
    testCaseResult: testCaseResult3,
    executionResult: executionData3,
  }
]