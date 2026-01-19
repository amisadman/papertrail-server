import { post, PostStatus } from "../../../generated/prisma/client";
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
}: {
  search: string | undefined;
  tags: string[];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
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
      where: {
        AND: andConditions,
      },
    });
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postService = {
  createPost,
  getAllPost,
};
