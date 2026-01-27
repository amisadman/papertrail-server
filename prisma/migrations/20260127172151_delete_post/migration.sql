-- DropForeignKey
ALTER TABLE "tbl_comments" DROP CONSTRAINT "tbl_comments_postId_fkey";

-- AddForeignKey
ALTER TABLE "tbl_comments" ADD CONSTRAINT "tbl_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "tbl_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
