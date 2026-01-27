import {
  CommentStatus,
  post,
  PostStatus,
} from "../../../generated/prisma/client";
import { postWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string,
) => {
  try {
    const result = await prisma.post.create({
      data: {
        ...data,
        authorId: userId,
      },
    });
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllPost = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  tags: string[];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string | undefined;
  sortOrder: string | undefined;
}) => {
  try {
    const andConditions: postWhereInput[] = [];
    if (search) {
      andConditions.push({
        OR: [
          {
            content: {
              contains: search as string,
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: search as string,
              mode: "insensitive",
            },
          },
          {
            tags: {
              has: search as string,
            },
          },
        ],
      });
    }

    if (tags.length > 0) {
      andConditions.push({
        tags: {
          hasEvery: tags,
        },
      });
    }

    if (typeof isFeatured === "boolean") {
      andConditions.push({
        isFeatured,
      });
    }

    if (status) {
      andConditions.push({
        status,
      });
    }

    if (authorId) {
      andConditions.push({
        authorId,
      });
    }

    const result = await prisma.post.findMany({
      take: limit,
      skip: skip,
      where: {
        AND: andConditions,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "desc" },
      include: {
        _count: { select: { comments: true } },
      },
    });
    const total = await prisma.post.count({
      where: {
        AND: andConditions,
      },
    });
    return {
      data: result,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const getPostById = async (postId: string) => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: postId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const postData = await tx.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: {
          where: {
            parentId: null,
            status: CommentStatus.APPROVED,
          },
          orderBy: { createdAt: "desc" },
          include: {
            replies: {
              where: {
                status: CommentStatus.APPROVED,
              },
              orderBy: { createdAt: "asc" },
              include: {
                replies: {
                  where: {
                    status: CommentStatus.APPROVED,
                  },
                  orderBy: { createdAt: "asc" },
                },
              },
            },
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });

    return postData;
  });
};

export const postService = {
  createPost,
  getAllPost,
  getPostById,
};
