/*
  Warnings:

  - A unique constraint covering the columns `[userId,url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_userId_url_key" ON "public"."Image"("userId", "url");
