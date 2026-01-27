import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
  authorId: string;
  content: string;
  parentId?: string;
  postId: string;
}) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.authorId,
    },
  });

  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  try {
    const result = prisma.comment.create({
      data: payload,
    });
    return result;
  } catch (error: any) {
    throw Error(error);
  }
};

const getCommentById = async (id: string) => {
  try {
    return await prisma.comment.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            views: true,
          },
        },
      },
    });
  } catch (error: any) {
    throw Error(error);
  }
};

const createCommentByAuthorId = async (authorId: string) => {
  try {
    return await prisma.comment.findMany({
      where: {
        authorId: authorId,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
      },
    });
  } catch (error: any) {
    throw Error(error);
  }
};

const deleteCommentById = async (commentId: string, authorId: string) => {
  try {
    const valid = await prisma.comment.findFirst({
      where: {
        id: commentId,
        authorId,
      },
    });

    if (!valid) {
      throw Error("Comment not found");
    }

    return await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch (error: any) {
    throw Error(error);
  }
};
const updateCommentById = async (
  commentId: string,
  data: { content?: string; status?: CommentStatus },
  authorId: string,
) => {
  try {
    const valid = await prisma.comment.findFirst({
      where: {
        id: commentId,
        authorId,
      },
    });

    if (!valid) {
      throw Error("Comment not found");
    }

    return await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: data,
    });
  } catch (error: any) {
    throw Error(error);
  }
};
export const CommentService = {
  createComment,
  getCommentById,
  createCommentByAuthorId,
  deleteCommentById,
  updateCommentById,
};
