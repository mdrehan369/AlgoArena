-- CreateTable
CREATE TABLE "CustomTestCase" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "input" TEXT NOT NULL,

    CONSTRAINT "CustomTestCase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomTestCase_id_key" ON "CustomTestCase"("id");

-- AddForeignKey
ALTER TABLE "CustomTestCase" ADD CONSTRAINT "CustomTestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
