"use server";

import db from "@/db";
import { PostWithData } from "@/db/queries/posts";
import { redirect } from "next/navigation";

export const search = (formData: FormData) => {
  const term = formData.get("term");

  if (typeof term !== "string" || !term) {
    redirect("/");
  } else {
    redirect(`/search?term=${term}`);
  }
};

export const fetchPostsByQuery = (
  term: string
): Promise<PostWithData[]> => {
  const response = db.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: term,
          },
        },
        {
          content: {
            contains: term,
          },
        },
      ],
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      topic: {
        select: {
          slug: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return response;
};
