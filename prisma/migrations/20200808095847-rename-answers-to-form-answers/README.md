# Migration `20200808095847-rename-answers-to-form-answers`

This migration has been generated at 8/8/2020, 9:58:47 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200808082700-user-forum-fields..20200808095847-rename-answers-to-form-answers
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
@@ -175,9 +175,9 @@
   description     String
   author          User          @relation(fields: [authorId], references: [id])
   authorId        String
   state           State         @default(PENDING)
-  answers         ForumAnswer[]
+  forumAnswers    ForumAnswer[]
   comments        Comment[]
   commentsEnabled Boolean       @default(false)
   attachments     Attachment[]
   createdAt       DateTime      @default(now())
```


