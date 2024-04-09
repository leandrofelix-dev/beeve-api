/*
  Warnings:

  - You are about to drop the column `dateTime` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `role_users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[institutionalCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDateTime` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isRemote` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('PENDING', 'COMPLETED', 'MISSED');

-- DropForeignKey
ALTER TABLE "role_users" DROP CONSTRAINT "role_users_idRole_fkey";

-- DropForeignKey
ALTER TABLE "role_users" DROP CONSTRAINT "role_users_idUser_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "dateTime",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isRemote" BOOLEAN NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "maxParticipants" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "status" "SubscriptionStatus" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "dateOfBirth";

-- DropTable
DROP TABLE "role_users";

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "roleId" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_institutionalCode_key" ON "users"("institutionalCode");

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
