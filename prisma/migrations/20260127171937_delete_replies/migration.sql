-- DropForeignKey
ALTER TABLE "tbl_comments" DROP CONSTRAINT "tbl_comments_parentId_fkey";

-- AddForeignKey
ALTER TABLE "tbl_comments" ADD CONSTRAINT "tbl_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "tbl_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
