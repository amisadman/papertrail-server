import { post } from "../../generated/prisma/client";
import { config } from "../config/config";
import { prisma } from "../lib/prisma";

const seedPost = async () => {
  try {
    const userID = [
      "t1C7vnHeyrzBAwuX3EiazleeoHYyAjiW",
      "bpJqM8CwfZ868LkYtPhTXaZdiU3utQ19",
      "PL2UY3VVcfNMZums6uVfYO7s0Ijff1Fp",
      "4fUJ8UKXzUFPbyGvf9cPE0wvvjb0idUp",
      "4QQr7avuCTt4HvlZ7OZZDUIf0FvfEdlv",
      "ktkwOv7Xey0OU6UVf1IhnC6ut0QlpsMM",
      "UZsCFtvfPe8vOlvwv0PclwZ5ZUsf5Y6q",
      "qrvQ6ToJ2aJ359Oejf70q8yt7GQmlyxl",
      "w2p87gMGqCVMMa25JFlEOPzTXTThDpkq",
      "veS8pjC0RISlL9YXYiEbY5qlaZga7FzA",
      "h1QzN4Gq3CASj6r2PfGnvFu8y6ffAsbl",
    ];
    const postId: string[] = [];
    const posts = await fetch(`${config.serverUrl}/api/v1/post`);
    const postData = await posts.json();

    console.log(postData.data.length);
    postData.data.map((p: post) => {
      const id = p.id;
      postId.push(id);
    });

    let idx = 0;
    for (const pid of postId) {
      const randomUser: string | undefined = userID[idx];
      console.log("pid: ", pid);
      console.log("user: ", randomUser);

      await prisma.post.update({
        where: {
          id: pid as string,
        },
        data: {
          authorId: randomUser as string,
        },
      });
      idx = (idx + 1) % userID.length;
    }
  } catch (error) {
    console.log(error);
  }
};
seedPost();
