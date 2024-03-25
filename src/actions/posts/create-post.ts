"use server";

import db from "@/db";

interface NewPost {
  title: string;
  content: string;
  userId: string;
  topicId: string;
}

export const createPost = async (newPost: NewPost) => {
  const response = await db.post.create({
    data: {
      title: newPost.title,
      content: newPost.content,
      userId: newPost.userId,
      topicId: newPost.topicId,
    },
  });
};
