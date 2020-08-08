# Migration `20200808105813-fix-naming-in-comments`

This migration has been generated at 8/8/2020, 10:58:13 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200808095847-rename-answers-to-form-answers..20200808105813-fix-naming-in-comments
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
@@ -209,11 +209,11 @@
   content         String
   state           State        @default(PENDING)
   createdAt       DateTime     @default(now())
   updatedAt       DateTime     @updatedAt
-  Forum           Forum?       @relation(fields: [forumId], references: [id])
+  forum           Forum?       @relation(fields: [forumId], references: [id])
   forumId         String?
-  ForumAnswer     ForumAnswer? @relation(fields: [forumAnswerId], references: [id])
+  forumAnswer     ForumAnswer? @relation(fields: [forumAnswerId], references: [id])
   forumAnswerId   String?
-  Comment         Comment?     @relation("CommentToComment", fields: [commentId], references: [id])
+  comment         Comment?     @relation("CommentToComment", fields: [commentId], references: [id])
   commentId       String?
 }
```


