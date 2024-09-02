# SecuraAPI

Secure Your APIs with AI-Powered Testing

SecuraAPI uses advanced LLMs to automatically generate and run OWASP-compliant test cases for your API endpoints.

## Key Features

- **AI-Powered Test Generation**: Leverage LLMs to create comprehensive test cases automatically.
- **Based Existing Technology**: Use tools like ZAP to provide further security.
- **Automated Execution**: Run tests automatically and get detailed reports on vulnerabilities.
- **OWASP Compliance**: Ensure your APIs are protected against common OWASP vulnerabilities.

## How It Works

1. **Connect Your API**: Integrate SecuraAPI with your existing API infrastructure.
2. **AI Generates Tests**: Our LLM creates tailored test cases based on your API structure.
3. **Automated Testing**: Tests are executed automatically, and ZAP analysis simulates various attack scenarios.
4. **Detailed Reporting**: Receive comprehensive reports on vulnerabilities and recommended fixes.

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

## How testing Working
<img src="https://github.com/user-attachments/assets/90ebde7a-1c15-4b34-a481-612cb0543b52" width="500" height="auto">



