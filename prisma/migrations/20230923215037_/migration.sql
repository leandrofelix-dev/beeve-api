-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicUrl" TEXT,
    "isExternal" BOOLEAN NOT NULL,
    "studentCode" TEXT,
    "course" TEXT,
    "semesterOfEntry" TEXT
);
INSERT INTO "new_users" ("course", "dateOfBirth", "email", "firstName", "id", "isExternal", "lastName", "password", "profilePicUrl", "semesterOfEntry", "studentCode") SELECT "course", "dateOfBirth", "email", "firstName", "id", "isExternal", "lastName", "password", "profilePicUrl", "semesterOfEntry", "studentCode" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
