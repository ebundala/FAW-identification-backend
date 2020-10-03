# Migration `20200924230257-question-to-grade-association`

This migration has been generated at 9/24/2020, 11:02:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Question" ADD COLUMN "gradeId" text   NOT NULL 

ALTER TABLE "public"."Question" ADD FOREIGN KEY ("gradeId")REFERENCES "public"."Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200824224649-renamed-type-to-attachment-type..20200924230257-question-to-grade-association
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
@@ -36,9 +36,9 @@
   mimetype         String?
   encoding         String?
   duration         Int             @default(0)
   size             Int             @default(0)
-  attachmentType             AttachmentType  @default(IMAGE)
+  attachmentType   AttachmentType  @default(IMAGE)
   downloadable     Boolean         @default(false)
   placement        String          @default("default")
   createdAt        DateTime        @default(now())
   updatedAt        DateTime        @updatedAt
@@ -85,8 +85,9 @@
   form            Form             @relation(fields: [formId], references: [id])
   formId          String
   responses       Response[]
   recommendations Recommendation[]
+  questions       Question[]
   min             Float
   max             Float
   minInclusive    Boolean          @default(false)
   maxInclusive    Boolean          @default(false)
@@ -118,8 +119,10 @@
   instruction    String?
   questionType   QuestionType @default(BOOLEAN)
   form           Form         @relation(fields: [formId], references: [id])
   formId         String
+  grade          Grade        @relation(fields: [gradeId], references: [id])
+  gradeId        String
   answers        Answer[]
   attachments    Attachment[]
   createdAt      DateTime     @default(now())
   updatedAt      DateTime     @updatedAt
@@ -168,14 +171,16 @@
   APPROVED
   COMPLETED
   ARCHIVED
 }
+
 enum AttachmentType {
   AUDIO
   VIDEO
   DOCUMENT
   IMAGE
 }
+
 // forum part
 model Forum {
   id              String        @default(cuid()) @id
```


