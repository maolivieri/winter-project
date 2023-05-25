/*
  Warnings:

  - A unique constraint covering the columns `[permission_id,role_id]` on the table `role_permissions` will be added. If there are existing duplicate values, this will fail.
  - Made the column `role_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_permission_id_role_id_key" ON "role_permissions"("permission_id", "role_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
