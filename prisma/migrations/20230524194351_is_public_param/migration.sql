/*
  Warnings:

  - Added the required column `isPublic` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "idCreator" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "eventCode" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    CONSTRAINT "events_idCreator_fkey" FOREIGN KEY ("idCreator") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_events" ("date", "description", "eventCode", "id", "idCreator", "location", "maxParticipants", "name") SELECT "date", "description", "eventCode", "id", "idCreator", "location", "maxParticipants", "name" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE UNIQUE INDEX "events_eventCode_key" ON "events"("eventCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
