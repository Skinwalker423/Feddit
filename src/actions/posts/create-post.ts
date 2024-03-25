"use server";

import db from "@/db";
import { paths } from "@/helpers/paths";
import { revalidatePath } from "next/cache";

interface NewPost {
  title: string;
  content: string;
  userId: string;
  topicId: string;
  topic: string;
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

  // revalidate topics show
  const path = paths.topicShow(newPost.topic);
  revalidatePath(path);
};
