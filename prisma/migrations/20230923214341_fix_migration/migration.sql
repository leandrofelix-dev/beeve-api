/*
  Warnings:

  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isLinkedToIfce` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `events` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isExternal` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicUrl" TEXT,
    "isExternal" BOOLEAN NOT NULL,
    "studentCode" TEXT,
    "course" TEXT,
    "semesterOfEntry" TEXT
);
INSERT INTO "new_users" ("course", "email", "firstName", "id", "lastName", "password", "profilePicUrl", "studentCode") SELECT "course", "email", "firstName", "id", "lastName", "password", "profilePicUrl", "studentCode" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "idCreator" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "eventCode" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "coverUrl" TEXT,
    CONSTRAINT "events_idCreator_fkey" FOREIGN KEY ("idCreator") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_events" ("coverUrl", "date", "description", "eventCode", "id", "idCreator", "isPublic", "maxParticipants", "name") SELECT "coverUrl", "date", "description", "eventCode", "id", "idCreator", "isPublic", "maxParticipants", "name" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE UNIQUE INDEX "events_eventCode_key" ON "events"("eventCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
