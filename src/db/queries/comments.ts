import type { Comment } from "@prisma/client";
import { cache } from "react";
import db from "..";

export type CommentWithAuther = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export const fetchCommentsByPostId = cache(
  async (postId: string): Promise<CommentWithAuther[]> => {
    const comments = await db.comment.findMany({
      where: { postId },
      include: {
        user: { select: { name: true, image: true } },
      },
    });

    return comments;
  }
);
