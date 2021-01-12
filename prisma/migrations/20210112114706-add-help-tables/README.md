# Migration `20210112114706-add-help-tables`

This migration has been generated at 1/12/2021, 11:47:06 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Attachment" ADD COLUMN "helpStepId" text   

ALTER TABLE "public"."casbin_rule" ADD COLUMN "createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP

CREATE TABLE "public"."Help" (
"id" text   NOT NULL ,
"topic" text   NOT NULL ,
"description" text   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."HelpStep" (
"id" text   NOT NULL ,
"stepNumber" integer   NOT NULL ,
"title" text   NOT NULL ,
"description" text   ,
"helpId" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."HelpStep" ADD FOREIGN KEY ("helpId")REFERENCES "public"."Help"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Attachment" ADD FOREIGN KEY ("helpStepId")REFERENCES "public"."HelpStep"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201208135742-casbin-table-added..20210112114706-add-help-tables
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
@@ -62,8 +62,10 @@
   forumAnswerId    String?
   Comment          Comment?        @relation(fields: [commentId], references: [id])
   commentId        String?
   FormCategory     FormCategory[]
+  HelpStep         HelpStep?       @relation(fields: [helpStepId], references: [id])
+  helpStepId       String?
 }
 model FormCategory {
   id           String      @id @default(cuid())
@@ -249,15 +251,40 @@
 //casbin table
 model CasbinRule {
-  id    Int     @id @default(autoincrement())
-  ptype String
-  v0    String?
-  v1    String?
-  v2    String?
-  v3    String?
-  v4    String?
-  v5    String?
+  id        Int      @id @default(autoincrement())
+  ptype     String
+  v0        String?
+  v1        String?
+  v2        String?
+  v3        String?
+  v4        String?
+  v5        String?
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now()) @updatedAt
   @@map("casbin_rule")
 }
+
+//help table
+
+model Help {
+  id          String     @id @default(cuid())
+  topic       String
+  description String?
+  steps       HelpStep[]
+  createdAt   DateTime   @default(now())
+  updatedAt   DateTime   @updatedAt
+}
+
+model HelpStep {
+  id          String       @id @default(cuid())
+  stepNumber  Int
+  title       String
+  description String?
+  attachments Attachment[]
+  help        Help         @relation(fields: [helpId], references: [id])
+  helpId      String
+  createdAt   DateTime     @default(now())
+  updatedAt   DateTime     @updatedAt
+}
```


