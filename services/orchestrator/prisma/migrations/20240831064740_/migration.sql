/*
  Warnings:

  - Made the column `email` on table `OpenApiFile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OpenApiFile" DROP CONSTRAINT "OpenApiFile_email_fkey";

-- AlterTable
ALTER TABLE "OpenApiFile" ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "OpenApiFile" ADD CONSTRAINT "OpenApiFile_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
