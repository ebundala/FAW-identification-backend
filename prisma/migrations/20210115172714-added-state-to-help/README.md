# Migration `20210115172714-added-state-to-help`

This migration has been generated at 1/15/2021, 5:27:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Help" ADD COLUMN "state" "State"  NOT NULL DEFAULT E'PENDING'

ALTER TABLE "public"."HelpStep" ADD COLUMN "state" "State"  NOT NULL DEFAULT E'PENDING'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210112114706-add-help-tables..20210115172714-added-state-to-help
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
@@ -272,8 +272,9 @@
   id          String     @id @default(cuid())
   topic       String
   description String?
   steps       HelpStep[]
+  state       State      @default(PENDING)
   createdAt   DateTime   @default(now())
   updatedAt   DateTime   @updatedAt
 }
@@ -281,8 +282,9 @@
   id          String       @id @default(cuid())
   stepNumber  Int
   title       String
   description String?
+  state       State        @default(PENDING)
   attachments Attachment[]
   help        Help         @relation(fields: [helpId], references: [id])
   helpId      String
   createdAt   DateTime     @default(now())
```


