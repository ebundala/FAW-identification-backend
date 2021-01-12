# Migration `20201208135742-casbin-table-added`

This migration has been generated by Elias Bundala at 12/8/2020, 4:57:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "casbin_rule" (
"id" SERIAL,
    "ptype" TEXT NOT NULL,
    "v0" TEXT,
    "v1" TEXT,
    "v2" TEXT,
    "v3" TEXT,
    "v4" TEXT,
    "v5" TEXT,

    PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201018080305-added-state-to-user-account..20201208135742-casbin-table-added
--- datamodel.dml
+++ datamodel.dml
@@ -2,17 +2,17 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id            String        @default(cuid()) @id
+  id            String        @id @default(cuid())
   email         String        @unique
   displayName   String
   phoneNumber   String?
   emailVerified Boolean       @default(false)
@@ -30,9 +30,9 @@
   comments      Comment[]
 }
 model Attachment {
-  id               String          @default(cuid()) @id
+  id               String          @id @default(cuid())
   path             String
   filename         String?
   mimetype         String?
   encoding         String?
@@ -65,9 +65,9 @@
   FormCategory     FormCategory[]
 }
 model FormCategory {
-  id           String      @default(cuid()) @id
+  id           String      @id @default(cuid())
   name         String
   description  String?
   image        Attachment? @relation(fields: [attachmentId], references: [id])
   state        State       @default(PENDING)
@@ -77,9 +77,9 @@
   Form         Form[]
 }
 model Form {
-  id             String        @default(cuid()) @id
+  id             String        @id @default(cuid())
   title          String
   description    String?
   state          State         @default(PENDING)
   author         User          @relation(fields: [authorId], references: [id])
@@ -94,9 +94,9 @@
   formCategoryId String?
 }
 model Grade {
-  id              String           @default(cuid()) @id
+  id              String           @id @default(cuid())
   name            String
   description     String
   form            Form             @relation(fields: [formId], references: [id])
   formId          String
@@ -112,9 +112,9 @@
   updatedAt       DateTime         @updatedAt
 }
 model Response {
-  id          String       @default(cuid()) @id
+  id          String       @id @default(cuid())
   author      User         @relation(fields: [authorId], references: [id])
   authorId    String
   form        Form         @relation(fields: [formId], references: [id])
   formId      String
@@ -127,9 +127,9 @@
   updatedAt   DateTime     @updatedAt
 }
 model Question {
-  id             String       @default(cuid()) @id
+  id             String       @id @default(cuid())
   questionNumber Int
   question       String
   weight         Float        @default(0.0)
   instruction    String?
@@ -144,9 +144,9 @@
   updatedAt      DateTime     @updatedAt
 }
 model Answer {
-  id           String       @default(cuid()) @id
+  id           String       @id @default(cuid())
   response     Response     @relation(fields: [responseId], references: [id])
   responseId   String
   question     Question     @relation(fields: [questionId], references: [id])
   questionId   String
@@ -157,9 +157,9 @@
   updatedAt    DateTime     @updatedAt
 }
 model Recommendation {
-  id          String       @default(cuid()) @id
+  id          String       @id @default(cuid())
   content     String
   attachments Attachment[]
   grade       Grade        @relation(fields: [gradeId], references: [id])
   gradeId     String
@@ -198,9 +198,9 @@
 // forum part
 model Forum {
-  id              String        @default(cuid()) @id
+  id              String        @id @default(cuid())
   question        String
   description     String
   author          User          @relation(fields: [authorId], references: [id])
   authorId        String
@@ -213,9 +213,9 @@
   updatedAt       DateTime      @updatedAt
 }
 model ForumAnswer {
-  id              String       @default(cuid()) @id
+  id              String       @id @default(cuid())
   author          User         @relation(fields: [authorId], references: [id])
   authorId        String
   forum           Forum        @relation(fields: [forumId], references: [id])
   forumId         String
@@ -228,9 +228,9 @@
   updatedAt       DateTime     @updatedAt
 }
 model Comment {
-  id              String       @default(cuid()) @id
+  id              String       @id @default(cuid())
   author          User         @relation(fields: [authorId], references: [id])
   authorId        String
   attachments     Attachment[]
   comments        Comment[]    @relation("CommentToComment")
@@ -245,4 +245,19 @@
   forumAnswerId   String?
   comment         Comment?     @relation("CommentToComment", fields: [commentId], references: [id])
   commentId       String?
 }
+
+//casbin table
+
+model CasbinRule {
+  id    Int     @id @default(autoincrement())
+  ptype String
+  v0    String?
+  v1    String?
+  v2    String?
+  v3    String?
+  v4    String?
+  v5    String?
+
+  @@map("casbin_rule")
+}
```

