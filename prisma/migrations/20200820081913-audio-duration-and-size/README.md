# Migration `20200820081913-audio-duration-and-size`

This migration has been generated at 8/20/2020, 8:19:13 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Attachment" ADD COLUMN "duration" integer  NOT NULL DEFAULT 0,
ADD COLUMN "size" integer  NOT NULL DEFAULT 0;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200819235851-add-attachment-types..20200820081913-audio-duration-and-size
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
@@ -34,8 +34,10 @@
   path             String
   filename         String?
   mimetype         String?
   encoding         String?
+  duration         Int             @default(0)
+  size             Int             @default(0)
   type             AttachmentType  @default(IMAGE)
   downloadable     Boolean         @default(false)
   placement        String          @default("default")
   createdAt        DateTime        @default(now())
```


