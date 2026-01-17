import { post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<post, "id" | "createdAt" | "updatedAt">,
) => {
  try {
    const result = await prisma.post.create({
      data,
    });
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getAllPost = async () => {
  try {
    const result = await prisma.post.findMany();
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postService = {
  createPost,
  getAllPost,
};
