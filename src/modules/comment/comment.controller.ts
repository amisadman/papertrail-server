import { Request, Response } from "express";
import { sendResponse } from "../../utils/response";
import { CommentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    req.body.authorId = userId;
    const payload = req.body;

    const result = await CommentService.createComment(payload);

    sendResponse(res, 201, true, "Comment Added successfully", result);
  } catch (error: any) {
    sendResponse(res, 404, false, error, null);
  }
};

const getCommentById = async (req: Request, res: Response) => {
  try {
    const result = await CommentService.getCommentById(req.params.id as string);

    sendResponse(res, 200, true, "Comment fetched successfully", result);
  } catch (error: any) {
    sendResponse(res, 404, false, error, null);
  }
};
const createCommentByAuthorId = async (req: Request, res: Response) => {
  try {
    const result = await CommentService.createCommentByAuthorId(
      req.params.id as string,
    );

    sendResponse(res, 200, true, "Comment fetched successfully", result);
  } catch (error: any) {
    sendResponse(res, 404, false, error, null);
  }
};
const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const result = await CommentService.deleteCommentById(
      req.params.id as string,
      req.user?.id as string,
    );

    sendResponse(res, 200, true, "Comment deleted successfully", result);
  } catch (error: any) {
    sendResponse(res, 404, false, error, null);
  }
};
const updateCommentById = async (req: Request, res: Response) => {
  try {
    const result = await CommentService.updateCommentById(
      req.params.id as string,
      req.body,
      req.user?.id as string,
    );

    sendResponse(res, 200, true, "Comment updated successfully", result);
  } catch (error: any) {
    sendResponse(res, 404, false, error, null);
  }
};

export const CommentController = {
  createComment,
  getCommentById,
  createCommentByAuthorId,
  deleteCommentById,
  updateCommentById,
};
