import type { Comment } from "@prisma/client";
import db from "..";

export type CommentWithAuther = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export const fetchCommentsByPostId = async (
  postId: string
): Promise<CommentWithAuther[]> => {
  const comments = await db.comment.findMany({
    where: { postId },
    include: {
      user: { select: { name: true, image: true } },
    },
  });

  return comments;
};
