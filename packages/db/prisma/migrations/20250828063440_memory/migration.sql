/*
  Warnings:

  - Added the required column `memory` to the `SubmittedResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubmittedResult" ADD COLUMN     "memory" DOUBLE PRECISION NOT NULL;
