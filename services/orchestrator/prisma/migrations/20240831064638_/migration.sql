-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('QUEUE', 'START', 'PARSING', 'TESTING', 'FINISH');

-- AlterTable
ALTER TABLE "OpenApiFile" ADD COLUMN     "progress" "Progress" NOT NULL DEFAULT 'QUEUE';
