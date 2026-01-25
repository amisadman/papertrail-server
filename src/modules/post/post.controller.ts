import { Request, Response } from "express";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/response";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/‎paginationSortingHelper";
import { send } from "node:process";

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

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query,
    );

    const result = await postService.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    return sendResponse(res, 200, true, "Data Fetched Successfully", result);
  } catch (error: any) {
    return sendResponse(res, 404, false, error);
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      throw new Error("Post Id is required!");
    }
    const result = await postService.getPostById(postId as string);
    sendResponse(res, 200, true, "Post fetched successfull", result);
  } catch (error: any) {
    sendResponse(res, 400, false, error.message, null);
  }
};

export const postController = {
  createPost,
  getAllPost,
  getPostById,
};
