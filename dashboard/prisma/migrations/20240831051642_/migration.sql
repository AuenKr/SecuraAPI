-- CreateTable
CREATE TABLE "OpenApiFile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "OpenApiFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpenApiFile" ADD CONSTRAINT "OpenApiFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
