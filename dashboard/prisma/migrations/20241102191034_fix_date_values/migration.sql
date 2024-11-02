/*
  Warnings:

  - Made the column `createdAt` on table `ApiPath` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `ApiPath` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `OpenApiFile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `OpenApiFile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ApiPath" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "OpenApiFile" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
