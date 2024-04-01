import type { Comment } from "@prisma/client";
import db from "..";

export type CommentWithUser = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export const fetchComments = async (): Promise<
  CommentWithUser[] | null
> => {
  const comments = await db.comment.findMany({
    include: {
      user: { select: { name: true, image: true } },
    },
  });

  return comments;
};
