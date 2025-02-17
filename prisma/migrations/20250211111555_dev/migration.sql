/*
  Warnings:

  - Added the required column `driverCode` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "Topic" AS ENUM ('ARRAY', 'STRING', 'TWO_POINTERS', 'SLIDING_WINDOW', 'PREFIX_SUM', 'BIT_MANIPULATION', 'LINKED_LIST', 'STACK', 'QUEUE', 'HASH_TABLE', 'HEAP', 'GRAPH', 'BINARY_TREE', 'BINARY_SEARCH_TREE', 'TRIE', 'SEGMENT_TREE', 'FENWICK_TREE', 'UNION_FIND', 'DOUBLY_LINKED_LIST', 'DEQUE', 'RECURSION', 'BACKTRACKING', 'BINARY_SEARCH', 'SORTING', 'GREEDY', 'DYNAMIC_PROGRAMMING', 'NUMBER_THEORY', 'BITWISE_OPERATIONS', 'SUFFIX_ARRAY');

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "driverCode" TEXT NOT NULL,
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'EASY',
ADD COLUMN     "topics" "Topic"[];

-- CreateTable
CREATE TABLE "ExampleTestCases" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "output" TEXT NOT NULL,

    CONSTRAINT "ExampleTestCases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExampleTestCases_id_key" ON "ExampleTestCases"("id");

-- AddForeignKey
ALTER TABLE "ExampleTestCases" ADD CONSTRAINT "ExampleTestCases_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
