"use server";

import db from "@/db";
import { paths } from "@/helpers/paths";
import { revalidatePath } from "next/cache";
import z from "zod";
import { auth } from "@/auth";
import type { Post, Topic } from "@prisma/client";
import { redirect } from "next/navigation";

interface CreateTopicFormState {
  error: {
    title?: string[];
    content?: string[];
    general?: string[];
  };
}

const createPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message:
        "must be lowercase letters or dashe without spaces",
    }),
  content: z.string().min(10),
});

export const createPost = async (
  slug: string,
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> => {
  let post: Post;

  try {
    const session = await auth();
    if (!session || !session?.user)
      return {
        error: {
          general: ["Must be logged in to create topic"],
        },
      };
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();

    if (!title || !content || !slug)
      return {
        error: {},
      };

    const test = createPostSchema.safeParse({
      title: title,
      content: content,
    });

    if (!test.success) {
      const error = test.error.flatten().fieldErrors;
      console.log("error", error);

      return {
        error: {
          title: error.title || [],
          content: error.content || [],
        },
      };
    } else {
      const topicResponse = await db.topic.findUnique({
        where: { slug: slug },
      });
      if (!topicResponse)
        return {
          error: {
            general: ["problem getting topic id"],
          },
        };

      const response = await db.post.create({
        data: {
          title: test.data.title,
          content: test.data.content,
          userId: session.user.id,
          topicId: topicResponse.id,
        },
      });
      post = response;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: {
          general: [error?.message],
        },
      };
    } else {
      return {
        error: {
          general: ["something unexpected went wrong"],
        },
      };
    }
  }

  // revalidate topics show
  const path = paths.topicShow(slug);
  const rpath = paths.postShow(slug, post.id, true);
  console.log("redirect", rpath);
  revalidatePath(path);
  redirect(rpath);
};
