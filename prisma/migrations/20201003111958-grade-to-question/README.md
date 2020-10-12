# Migration `20201003111958-grade-to-question`

This migration has been generated at 10/3/2020, 11:19:58 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Form" ADD COLUMN "formCategoryId" text   

CREATE TABLE "public"."FormCategory" (
"id" text   NOT NULL ,
"name" text   NOT NULL ,
"description" text   ,
"state" "State"  NOT NULL DEFAULT E'PENDING',
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"attachmentId" text   ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."FormCategory" ADD FOREIGN KEY ("attachmentId")REFERENCES "public"."Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Form" ADD FOREIGN KEY ("formCategoryId")REFERENCES "public"."FormCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200924230257-question-to-grade-association..20201003111958-grade-to-question
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
@@ -60,23 +60,38 @@
   ForumAnswer      ForumAnswer?    @relation(fields: [forumAnswerId], references: [id])
   forumAnswerId    String?
   Comment          Comment?        @relation(fields: [commentId], references: [id])
   commentId        String?
+  FormCategory     FormCategory[]
 }
+model FormCategory {
+  id           String      @default(cuid()) @id
+  name         String
+  description  String?
+  image        Attachment? @relation(fields: [attachmentId], references: [id])
+  state        State       @default(PENDING)
+  createdAt    DateTime    @default(now())
+  updatedAt    DateTime    @updatedAt
+  attachmentId String?
+  Form         Form[]
+}
+
 model Form {
-  id          String       @default(cuid()) @id
-  title       String
-  description String?
-  state       State        @default(PENDING)
-  author      User         @relation(fields: [authorId], references: [id])
-  authorId    String
-  questions   Question[]
-  grades      Grade[]
-  responses   Response[]
-  attachments Attachment[]
-  createdAt   DateTime     @default(now())
-  updatedAt   DateTime     @updatedAt
+  id             String        @default(cuid()) @id
+  title          String
+  description    String?
+  state          State         @default(PENDING)
+  author         User          @relation(fields: [authorId], references: [id])
+  authorId       String
+  category       FormCategory? @relation(fields: [formCategoryId], references: [id])
+  questions      Question[]
+  grades         Grade[]
+  responses      Response[]
+  attachments    Attachment[]
+  createdAt      DateTime      @default(now())
+  updatedAt      DateTime      @updatedAt
+  formCategoryId String?
 }
 model Grade {
   id              String           @default(cuid()) @id
```


