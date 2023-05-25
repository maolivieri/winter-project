/*
  Warnings:

  - Added the required column `domain` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "domain" TEXT NOT NULL;
