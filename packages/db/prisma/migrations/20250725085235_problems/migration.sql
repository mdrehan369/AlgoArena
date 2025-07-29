-- CreateEnum
CREATE TYPE "Language" AS ENUM ('CPP', 'C', 'JS', 'PYTHON');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('STARTER', 'APPRENTICE', 'CHALLENGER', 'EXPERT', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "Topic" AS ENUM ('ARRAY', 'STRING', 'TWO_POINTERS', 'SLIDING_WINDOW', 'PREFIX_SUM', 'BIT_MANIPULATION', 'LINKED_LIST', 'STACK', 'QUEUE', 'HASH_TABLE', 'HEAP', 'GRAPH', 'BINARY_TREE', 'BINARY_SEARCH_TREE', 'TRIE', 'SEGMENT_TREE', 'FENWICK_TREE', 'UNION_FIND', 'DOUBLY_LINKED_LIST', 'DEQUE', 'RECURSION', 'BACKTRACKING', 'BINARY_SEARCH', 'SORTING', 'GREEDY', 'DYNAMIC_PROGRAMMING', 'NUMBER_THEORY', 'BITWISE_OPERATIONS', 'SUFFIX_ARRAY');

-- CreateTable
CREATE TABLE "TestCase" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverCode" (
    "id" SERIAL NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'CPP',
    "beforeCode" TEXT NOT NULL,
    "afterCode" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,

    CONSTRAINT "DriverCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "constraints" TEXT[],
    "topics" "Topic"[],
    "level" "Level" NOT NULL DEFAULT 'STARTER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExampleTestCases" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "output" TEXT NOT NULL,

    CONSTRAINT "ExampleTestCases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmittedResult" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "language" "Language" NOT NULL,
    "runtime" DOUBLE PRECISION NOT NULL,
    "testCasesPassed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmittedResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestCase_id_key" ON "TestCase"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DriverCode_id_key" ON "DriverCode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_id_key" ON "Problem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_title_key" ON "Problem"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_slug_key" ON "Problem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ExampleTestCases_id_key" ON "ExampleTestCases"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubmittedResult_id_key" ON "SubmittedResult"("id");

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverCode" ADD CONSTRAINT "DriverCode_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleTestCases" ADD CONSTRAINT "ExampleTestCases_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedResult" ADD CONSTRAINT "SubmittedResult_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedResult" ADD CONSTRAINT "SubmittedResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
