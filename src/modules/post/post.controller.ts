import { Request, Response } from "express";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/response";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);
    return sendResponse(res, 201, true, "Data Inserted Successfully", result);
  } catch (error: any) {
    return sendResponse(res, 404, false, error);
  }
};
const getAllPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.getAllPost();
    return sendResponse(res, 200, true, "Data Fetched Successfully", result);
  } catch (error: any) {
    return sendResponse(res, 404, false, error);
  }
};

export const postController = {
  createPost,
  getAllPost,
};
