"use server";

import db from "@/db";
import { paths } from "@/helpers/paths";
import { revalidatePath } from "next/cache";

interface NewCommentProps {
  content: string;
  postId: string;
  userId: string;
  parentId?: string;
  topic: string;
}

export const createComment = async (
  newComment: NewCommentProps
) => {
  const topic = await db.comment.create({
    data: {
      content: newComment.content,
      postId: newComment.postId,
      userId: newComment.userId,
    },
  });

  // revalidate post show page
  const path = paths.postShow(
    newComment.topic,
    newComment.postId
  );
  revalidatePath(path);
};
