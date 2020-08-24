# Migration `20200824224649-renamed-type-to-attachment-type`

This migration has been generated at 8/24/2020, 10:46:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Attachment" DROP COLUMN "type",
ADD COLUMN "attachmentType" "AttachmentType"  NOT NULL DEFAULT E'IMAGE'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200820081913-audio-duration-and-size..20200824224649-renamed-type-to-attachment-type
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
-  type             AttachmentType  @default(IMAGE)
+  attachmentType             AttachmentType  @default(IMAGE)
   downloadable     Boolean         @default(false)
   placement        String          @default("default")
   createdAt        DateTime        @default(now())
   updatedAt        DateTime        @updatedAt
```


