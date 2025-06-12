/*
  Warnings:

  - Added the required column `total_access_count` to the `sharers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sharers" ADD COLUMN     "total_access_count" INTEGER NOT NULL;
