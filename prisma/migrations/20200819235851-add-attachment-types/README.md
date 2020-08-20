# Migration `20200819235851-add-attachment-types`

This migration has been generated at 8/19/2020, 11:58:51 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "AttachmentType" AS ENUM ('AUDIO', 'VIDEO', 'DOCUMENT', 'IMAGE');

ALTER TABLE "public"."Attachment" ADD COLUMN "type" "AttachmentType" NOT NULL DEFAULT E'IMAGE';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200808105813-fix-naming-in-comments..20200819235851-add-attachment-types
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
@@ -34,8 +34,9 @@
   path             String
   filename         String?
   mimetype         String?
   encoding         String?
+  type             AttachmentType  @default(IMAGE)
   downloadable     Boolean         @default(false)
   placement        String          @default("default")
   createdAt        DateTime        @default(now())
   updatedAt        DateTime        @updatedAt
@@ -165,9 +166,14 @@
   APPROVED
   COMPLETED
   ARCHIVED
 }
-
+enum AttachmentType {
+  AUDIO
+  VIDEO
+  DOCUMENT
+  IMAGE
+}
 // forum part
 model Forum {
   id              String        @default(cuid()) @id
```


