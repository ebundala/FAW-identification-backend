# Migration `20200808082700-user-forum-fields`

This migration has been generated at 8/8/2020, 8:27:00 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200808082130-add-forum..20200808082700-user-forum-fields
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
@@ -23,11 +23,11 @@
   forms         Form[]
   responses     Response[]
   createdAt     DateTime      @default(now())
   updatedAt     DateTime      @updatedAt
-  Forum         Forum[]
-  ForumAnswer   ForumAnswer[]
-  Comment       Comment[]
+  forums        Forum[]
+  forumAnswers  ForumAnswer[]
+  comments      Comment[]
 }
 model Attachment {
   id               String          @default(cuid()) @id
```


