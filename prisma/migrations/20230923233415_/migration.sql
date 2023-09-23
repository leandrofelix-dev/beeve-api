-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_registrations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idUser" TEXT NOT NULL,
    "idEvent" TEXT NOT NULL,
    CONSTRAINT "registrations_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registrations_idEvent_fkey" FOREIGN KEY ("idEvent") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_registrations" ("id", "idEvent", "idUser") SELECT "id", "idEvent", "idUser" FROM "registrations";
DROP TABLE "registrations";
ALTER TABLE "new_registrations" RENAME TO "registrations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
