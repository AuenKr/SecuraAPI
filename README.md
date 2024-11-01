# SecuraAPI

SecuraAPI uses advanced Testing Tools to automatically test OWASP-compliant for your API endpoints.

## Key Features

- **Automated Testing**: Use testing tools like ZAP to test the API endpoint.
- **Test Report Generation**: Run tests automatically and get detailed reports on vulnerabilities.
- **OWASP Compliance**: Ensure your APIs are protected against common OWASP vulnerabilities.

## Local Setup

1. **Install Docker**:

   - Ensure Docker is installed on your system.

2. **Update Environment Variables**:

   - Update all `sample.env` files to `.env` and paste all required secrets into the `.env` file.

3. **Start Docker Compose**:

   - For Linux: `docker compose up`
   - For other systems: `docker-compose up`

4. **(Optional)** If want to run in dev mode change all docker build file Start commands from `docker:start` to `docker:dev`
   - dashboard/Dockerfile.dashboard
   - services/test-orchestrator/Dockerfile.Orchestrator

## How It Works

1. **Connect Your API**: Upload the OpenAPI specification file of API.
2. **API Endpoint Detection**: After uploading, each endpoint detail is parsed.
3. **Automated Testing**: Each endpoint is tested on tools like ZAP automatically.
4. **Automated Test Report**: After each endpoint is tested, the report can be seen from the dashboard.

## How Testing network work

1. Change the testing architecture to a distributed testing system.
   ![image](https://github.com/user-attachments/assets/abc66416-1b9b-432c-aad7-0c37561e2d4c)
2. Testing Nodes can join the network and test the endpoint.
   This will significantly improve the testing speed.

### Note 
> If u want to join the testing network 

#### Prerequisite : You need to install docker

1. Copy test-node.yaml file, rename to docker-compose.yaml

2. `docker compose up -d` or `docker-compose up -d`

This will start the testing node in background and improve the testing speed.
