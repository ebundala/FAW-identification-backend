# Migration `20200808082130-add-forum`

This migration has been generated at 8/8/2020, 8:21:31 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Forum" (
"id" text  NOT NULL ,
"question" text  NOT NULL ,
"description" text  NOT NULL ,
"authorId" text  NOT NULL ,
"state" "State" NOT NULL DEFAULT E'PENDING',
"commentsEnabled" boolean  NOT NULL DEFAULT false,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."ForumAnswer" (
"id" text  NOT NULL ,
"authorId" text  NOT NULL ,
"forumId" text  NOT NULL ,
"commentsEnabled" boolean  NOT NULL DEFAULT false,
"state" "State" NOT NULL DEFAULT E'PENDING',
"content" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Comment" (
"id" text  NOT NULL ,
"authorId" text  NOT NULL ,
"commentsEnabled" boolean  NOT NULL DEFAULT false,
"content" text  NOT NULL ,
"state" "State" NOT NULL DEFAULT E'PENDING',
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
"forumId" text   ,
"forumAnswerId" text   ,
"commentId" text   ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."Attachment" ADD COLUMN "downloadable" boolean  NOT NULL DEFAULT false,
ADD COLUMN "placement" text  NOT NULL DEFAULT E'default',
ADD COLUMN "forumId" text   ,
ADD COLUMN "forumAnswerId" text   ,
ADD COLUMN "commentId" text   ;

ALTER TABLE "public"."Forum" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."ForumAnswer" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."ForumAnswer" ADD FOREIGN KEY ("forumId")REFERENCES "public"."Forum"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("forumId")REFERENCES "public"."Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("forumAnswerId")REFERENCES "public"."ForumAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("commentId")REFERENCES "public"."Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Attachment" ADD FOREIGN KEY ("forumId")REFERENCES "public"."Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Attachment" ADD FOREIGN KEY ("forumAnswerId")REFERENCES "public"."ForumAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Attachment" ADD FOREIGN KEY ("commentId")REFERENCES "public"."Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER INDEX "public"."User.email" RENAME TO "User.email_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200623192320-3..20200808082130-add-forum
--- datamodel.dml
+++ datamodel.dml
@@ -2,37 +2,42 @@
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
-  id            String     @default(cuid()) @id
-  email         String     @unique
+  id            String        @default(cuid()) @id
+  email         String        @unique
   displayName   String
   phoneNumber   String?
-  emailVerified Boolean    @default(false)
-  disabled      Boolean    @default(true)
-  avator        Attachment?      @relation(fields: [avatorId], references: [id])
+  emailVerified Boolean       @default(false)
+  disabled      Boolean       @default(true)
+  avator        Attachment?   @relation(fields: [avatorId], references: [id])
   avatorId      String?
-  role          Role       @default(USER)
+  role          Role          @default(USER)
   forms         Form[]
   responses     Response[]
-  createdAt     DateTime   @default(now())
-  updatedAt     DateTime   @updatedAt
+  createdAt     DateTime      @default(now())
+  updatedAt     DateTime      @updatedAt
+  Forum         Forum[]
+  ForumAnswer   ForumAnswer[]
+  Comment       Comment[]
 }
 model Attachment {
   id               String          @default(cuid()) @id
   path             String
   filename         String?
   mimetype         String?
   encoding         String?
+  downloadable     Boolean         @default(false)
+  placement        String          @default("default")
   createdAt        DateTime        @default(now())
   updatedAt        DateTime        @updatedAt
   User             User[]
   Form             Form?           @relation(fields: [formId], references: [id])
@@ -46,23 +51,29 @@
   Answer           Answer?         @relation(fields: [answerId], references: [id])
   answerId         String?
   Recommendation   Recommendation? @relation(fields: [recommendationId], references: [id])
   recommendationId String?
+  Forum            Forum?          @relation(fields: [forumId], references: [id])
+  forumId          String?
+  ForumAnswer      ForumAnswer?    @relation(fields: [forumAnswerId], references: [id])
+  forumAnswerId    String?
+  Comment          Comment?        @relation(fields: [commentId], references: [id])
+  commentId        String?
 }
 model Form {
-  id          String     @default(cuid()) @id
+  id          String       @default(cuid()) @id
   title       String
   description String?
-  state       State      @default(PENDING)
-  author      User       @relation(fields: [authorId], references: [id])
+  state       State        @default(PENDING)
+  author      User         @relation(fields: [authorId], references: [id])
   authorId    String
   questions   Question[]
   grades      Grade[]
   responses   Response[]
   attachments Attachment[]
-  createdAt   DateTime   @default(now())
-  updatedAt   DateTime   @updatedAt
+  createdAt   DateTime     @default(now())
+  updatedAt   DateTime     @updatedAt
 }
 model Grade {
   id              String           @default(cuid()) @id
@@ -81,20 +92,20 @@
   updatedAt       DateTime         @updatedAt
 }
 model Response {
-  id          String   @default(cuid()) @id
-  author      User     @relation(fields: [authorId], references: [id])
+  id          String       @default(cuid()) @id
+  author      User         @relation(fields: [authorId], references: [id])
   authorId    String
-  form        Form     @relation(fields: [formId], references: [id])
+  form        Form         @relation(fields: [formId], references: [id])
   formId      String
   answers     Answer[]
-  grade       Grade?   @relation(fields: [gradeId], references: [id])
+  grade       Grade?       @relation(fields: [gradeId], references: [id])
   gradeId     String?
   attachments Attachment[]
-  state       State    @default(PENDING)
-  createdAt   DateTime @default(now())
-  updatedAt   DateTime @updatedAt
+  state       State        @default(PENDING)
+  createdAt   DateTime     @default(now())
+  updatedAt   DateTime     @updatedAt
 }
 model Question {
   id             String       @default(cuid()) @id
@@ -111,28 +122,28 @@
   updatedAt      DateTime     @updatedAt
 }
 model Answer {
-  id           String   @default(cuid()) @id
-  response     Response @relation(fields: [responseId], references: [id])
+  id           String       @default(cuid()) @id
+  response     Response     @relation(fields: [responseId], references: [id])
   responseId   String
-  question     Question @relation(fields: [questionId], references: [id])
+  question     Question     @relation(fields: [questionId], references: [id])
   questionId   String
   attachments  Attachment[]
   booleanValue Boolean?
   textValue    String?
-  createdAt    DateTime @default(now())
-  updatedAt    DateTime @updatedAt
+  createdAt    DateTime     @default(now())
+  updatedAt    DateTime     @updatedAt
 }
 model Recommendation {
-  id          String   @default(cuid()) @id
+  id          String       @default(cuid()) @id
   content     String
   attachments Attachment[]
-  grade       Grade    @relation(fields: [gradeId], references: [id])
+  grade       Grade        @relation(fields: [gradeId], references: [id])
   gradeId     String
-  createdAt   DateTime @default(now())
-  updatedAt   DateTime @updatedAt
+  createdAt   DateTime     @default(now())
+  updatedAt   DateTime     @updatedAt
 }
 // use boolean and text question first for POC
 enum QuestionType {
@@ -153,5 +164,56 @@
   REJECTED
   APPROVED
   COMPLETED
   ARCHIVED
-}
+}
+
+// forum part
+
+model Forum {
+  id              String        @default(cuid()) @id
+  question        String
+  description     String
+  author          User          @relation(fields: [authorId], references: [id])
+  authorId        String
+  state           State         @default(PENDING)
+  answers         ForumAnswer[]
+  comments        Comment[]
+  commentsEnabled Boolean       @default(false)
+  attachments     Attachment[]
+  createdAt       DateTime      @default(now())
+  updatedAt       DateTime      @updatedAt
+}
+
+model ForumAnswer {
+  id              String       @default(cuid()) @id
+  author          User         @relation(fields: [authorId], references: [id])
+  authorId        String
+  forum           Forum        @relation(fields: [forumId], references: [id])
+  forumId         String
+  attachments     Attachment[]
+  comments        Comment[]
+  commentsEnabled Boolean      @default(false)
+  state           State        @default(PENDING)
+  content         String
+  createdAt       DateTime     @default(now())
+  updatedAt       DateTime     @updatedAt
+}
+
+model Comment {
+  id              String       @default(cuid()) @id
+  author          User         @relation(fields: [authorId], references: [id])
+  authorId        String
+  attachments     Attachment[]
+  comments        Comment[]    @relation("CommentToComment")
+  commentsEnabled Boolean      @default(false)
+  content         String
+  state           State        @default(PENDING)
+  createdAt       DateTime     @default(now())
+  updatedAt       DateTime     @updatedAt
+  Forum           Forum?       @relation(fields: [forumId], references: [id])
+  forumId         String?
+  ForumAnswer     ForumAnswer? @relation(fields: [forumAnswerId], references: [id])
+  forumAnswerId   String?
+  Comment         Comment?     @relation("CommentToComment", fields: [commentId], references: [id])
+  commentId       String?
+}
```


