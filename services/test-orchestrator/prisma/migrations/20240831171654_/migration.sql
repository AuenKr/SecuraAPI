-- AlterTable
ALTER TABLE "OpenApiFile" ADD COLUMN     "description" TEXT,
ADD COLUMN     "openapiVersion" TEXT,
ADD COLUMN     "servers" JSONB[],
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "ApiPath" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "summary" TEXT,
    "parameters" JSONB[],
    "requestBody" TEXT,
    "responseBody" JSONB[],
    "securityBody" JSONB[],
    "openApiFileId" TEXT,

    CONSTRAINT "ApiPath_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApiPath" ADD CONSTRAINT "ApiPath_openApiFileId_fkey" FOREIGN KEY ("openApiFileId") REFERENCES "OpenApiFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
