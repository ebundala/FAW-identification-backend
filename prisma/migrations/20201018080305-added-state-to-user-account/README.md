# Migration `20201018080305-added-state-to-user-account`

This migration has been generated at 10/18/2020, 8:03:06 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "state" "State"  NOT NULL DEFAULT E'PENDING'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201003111958-grade-to-question..20201018080305-added-state-to-user-account
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -19,8 +19,9 @@
   disabled      Boolean       @default(true)
   avator        Attachment?   @relation(fields: [avatorId], references: [id])
   avatorId      String?
   role          Role          @default(USER)
+  state         State         @default(PENDING)
   forms         Form[]
   responses     Response[]
   createdAt     DateTime      @default(now())
   updatedAt     DateTime      @updatedAt
```


