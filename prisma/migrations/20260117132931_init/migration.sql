-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "tbl_posts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" TEXT,
    "isFeatured" BOOLEAN NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "tags" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "parentId" TEXT,
    "status" "CommentStatus" NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tbl_posts_authorId_idx" ON "tbl_posts"("authorId");

-- CreateIndex
CREATE INDEX "tbl_comments_postId_idx" ON "tbl_comments"("postId");

-- CreateIndex
CREATE INDEX "tbl_comments_authorId_idx" ON "tbl_comments"("authorId");

-- AddForeignKey
ALTER TABLE "tbl_comments" ADD CONSTRAINT "tbl_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "tbl_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_comments" ADD CONSTRAINT "tbl_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "tbl_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
