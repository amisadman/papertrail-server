import { Request, Response } from "express";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/response";
import { PostStatus } from "../../../generated/prisma/enums";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(
      req.body,
      req.user?.id as string,
    );
    return sendResponse(res, 201, true, "Data Inserted Successfully", result);
  } catch (error: any) {
    return sendResponse(res, 404, false, error);
  }
};
const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
          ? false
          : undefined
      : false;

    const status = req.query.status as PostStatus | undefined;

    const authorId = req.query.authorId as string | undefined;
    const result = await postService.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
    });
    return sendResponse(res, 200, true, "Data Fetched Successfully", result);
  } catch (error: any) {
    return sendResponse(res, 404, false, error);
  }
};

export const postController = {
  createPost,
  getAllPost,
};
