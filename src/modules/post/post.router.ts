import express, { Router } from "express";
import { postController } from "./post.controller";
import access, { UserRole } from "../../middleware/access";
const router = express.Router();

router.post("/", access(UserRole.USER), postController.createPost);
router.get("/", postController.getAllPost);
export const postRouter: Router = router;
