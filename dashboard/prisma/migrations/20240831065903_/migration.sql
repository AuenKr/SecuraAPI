-- AlterTable
ALTER TABLE "OpenApiFile" ADD COLUMN     "report" TEXT,
ADD COLUMN     "totalEndpoint" INTEGER NOT NULL DEFAULT 0;
