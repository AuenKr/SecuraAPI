/*
  Warnings:

  - You are about to drop the column `userId` on the `OpenApiFile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OpenApiFile" DROP CONSTRAINT "OpenApiFile_userId_fkey";

-- AlterTable
ALTER TABLE "OpenApiFile" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT;

-- AddForeignKey
ALTER TABLE "OpenApiFile" ADD CONSTRAINT "OpenApiFile_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
