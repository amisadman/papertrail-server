import { Express, Router } from "express";
import access, { UserRole } from "../../middleware/access";
import { CommentController } from "./comment.controller";

const router = Router();

router.post(
  "/",
  access(UserRole.ADMIN, UserRole.USER),
  CommentController.createComment,
);
router.get(
  "/:id",
  access(UserRole.ADMIN, UserRole.USER),
  CommentController.getCommentById,
);
router.get(
  "/author/:id",
  access(UserRole.ADMIN, UserRole.USER),
  CommentController.createCommentByAuthorId,
);
router.delete(
  "/:id",
  access(UserRole.ADMIN, UserRole.USER),
  CommentController.deleteCommentById,
);
router.patch(
  "/:id",
  access(UserRole.ADMIN, UserRole.USER),
  CommentController.updateCommentById,
);

export const commentRoute: Router = router;
