import type { Post, PrismaPromise } from "@prisma/client";
import db from "..";

export type PostWithData = Post & {
  topic: {
    slug: string;
  };
  user: { name: string | null };
  _count: {
    comments: number;
  };
};

export function fetchPostByTopicSlug(
  slug: string
): PrismaPromise<PostWithData[]> {
  return db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
export async function fetchPostById(
  postId: string
): Promise<PostWithData | null> {
  const response = await db.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });

  return response;
}
