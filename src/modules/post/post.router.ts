import express, { Router } from "express";
import { postController } from "./post.controller";
import access, { UserRole } from "../../middleware/access";
const router = express.Router();

router.get("/", postController.getAllPost);
router.post("/", access(UserRole.USER), postController.createPost);
export const postRouter: Router = router;
