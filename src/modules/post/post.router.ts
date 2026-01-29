import express, { Router } from "express";
import { postController } from "./post.controller";
import access, { UserRole } from "../../middleware/access";
const router = express.Router();

router.get("/", postController.getAllPost);
router.post(
  "/",
  access(UserRole.USER, UserRole.ADMIN),
  postController.createPost,
);
router.get(
  "/myposts",
  access(UserRole.ADMIN, UserRole.USER),
  postController.getMyPosts,
);
router.get("/:id", postController.getPostById);

router.patch(
  "/:postId",
  access(UserRole.ADMIN, UserRole.USER),
  postController.updateMyPost,
);
router.delete(
  "/:postId",
  access(UserRole.ADMIN, UserRole.USER),
  postController.deletePost,
);

export const postRouter: Router = router;
