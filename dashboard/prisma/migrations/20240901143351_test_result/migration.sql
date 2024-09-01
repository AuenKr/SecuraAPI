-- AlterTable
ALTER TABLE "ApiPath" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'TESTING';

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "alert" TEXT NOT NULL,
    "attack" TEXT,
    "confidence" TEXT NOT NULL,
    "risk" TEXT,
    "description" TEXT,
    "evidence" TEXT,
    "method" TEXT,
    "name" TEXT,
    "other" TEXT,
    "param" TEXT,
    "reference" TEXT,
    "solution" TEXT,
    "tags" JSONB,
    "apiPathId" TEXT NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_apiPathId_fkey" FOREIGN KEY ("apiPathId") REFERENCES "ApiPath"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
