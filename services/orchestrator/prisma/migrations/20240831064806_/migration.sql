-- DropForeignKey
ALTER TABLE "OpenApiFile" DROP CONSTRAINT "OpenApiFile_email_fkey";

-- AlterTable
ALTER TABLE "OpenApiFile" ALTER COLUMN "email" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OpenApiFile" ADD CONSTRAINT "OpenApiFile_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
