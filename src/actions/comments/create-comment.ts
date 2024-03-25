"use server";

import db from "@/db";

interface NewCommentProps {
  content: string;
  postId: string;
  userId: string;
  parentId?: string;
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
};
