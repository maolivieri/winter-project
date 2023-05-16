/*
  Warnings:

  - You are about to drop the column `userId` on the `user_refresh_token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_refresh_token" DROP CONSTRAINT "user_refresh_token_userId_fkey";

-- AlterTable
ALTER TABLE "user_refresh_token" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "user_refresh_token" ADD CONSTRAINT "user_refresh_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
