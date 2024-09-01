export const json = {
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "description": "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    "version": "0.1.9"
  },
  "servers": [
    {
      "url": "http://api.example.com/v1",
      "description": "Optional server description, e.g. Main (production) server"
    },
    {
      "url": "http://staging-api.example.com",
      "description": "Optional server description, e.g. Internal staging server for testing"
    }
  ],
  "paths": {
    "/users": {
      "get": {
        "summary": "Returns a list of users.",
        "description": "Optional extended description in CommonMark or HTML.",
        "responses": {
          "200": {
            "description": "A JSON array of user names",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Creates a user.",
        "description": "Optional extended description in CommonMark or HTML.",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "The ID of the user to return.",
            "schema": {
              "type": "integer",
              "format": "int64",
              "minimum": 1
            }
          },
          {
            "$ref": "#/components/schemas/User"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      },
      "put": {
        "summary": "Creates a new user.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/users/{userId}": {
      "get": {
        "summary": "Returns a user by ID.",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "The ID of the user to return.",
            "schema": {
              "type": "integer",
              "format": "int64",
              "minimum": 1
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A user object.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "format": "int64",
                      "example": 4
                    },
                    "name": {
                      "type": "string",
                      "example": "Jessica Smith"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The specified user ID is invalid (not a number)."
          },
          "404": {
            "description": "A user with the specified ID was not found."
          },
          "default": {
            "description": "Unexpected error"
          }
        }
      },
      "put": {
        "summary": "Returns a user by ID.",
        "parameters": [
          {
            "in": "path",
            "name": "userId",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64",
              "minimum": 1
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          }
        }
      }
    },
    "/billing_info": {
      "get": {
        "summary": "Gets the account billing info",
        "security": [
          {
            "OAuth2": [
              "admin"
            ]
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Not authenticated"
          },
          "403": {
            "description": "Access token does not have the required scope"
          }
        }
      }
    },
    "/ping": {
      "get": {
        "summary": "Checks if the server is running",
        "security": [],
        "responses": {
          "200": {
            "description": "Server is up and running"
          },
          "default": {
            "description": "Something is wrong"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 4
          },
          "name": {
            "type": "string",
            "example": "Arthur Dent"
          }
        },
        "required": [
          "id",
          "name"
        ]
      }
    },
    "securitySchemes": {
      "BasicAuth": {
        "type": "http",
        "scheme": "basic"
      },
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer"
      },
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-Key"
      },
      "OpenID": {
        "type": "openIdConnect",
        "openIdConnectUrl": "https://example.com/.well-known/openid-configuration"
      },
      "OAuth2": {
        "type": "oauth2",
        "flows": {
          "authorizationCode": {
            "authorizationUrl": "https://example.com/oauth/authorize",
            "tokenUrl": "https://example.com/oauth/token",
            "scopes": {
              "read": "Grants read access",
              "write": "Grants write access",
              "admin": "Grants access to admin operations"
            }
          }
        }
      }
    }
  },
  "security": [
    {
      "ApiKeyAuth": []
    },
    {
      "OAuth2": [
        "read",
        "write"
      ]
    }
  ]
}