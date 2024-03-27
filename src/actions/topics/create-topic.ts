"use server";

import db from "@/db";
import { paths } from "@/helpers/paths";
import { revalidatePath } from "next/cache";
import z from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";

interface CreateTopicFormState {
  error: {
    name?: string[];
    description?: string[];
    general?: string[];
  };
}

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message:
        "must be lowercase letters or dashe without spaces",
    }),
  description: z.string().min(10),
});

export const createTopic = async (
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> => {
  let topic: Topic;
  try {
    const session = await auth();
    if (!session || !session?.user)
      return {
        error: {
          general: ["Must be logged in to create topic"],
        },
      };
    const slug = formData.get("name")?.toString();
    const description = formData
      .get("description")
      ?.toString();

    if (!slug || !description)
      return {
        error: {},
      };

    const test = createTopicSchema.safeParse({
      name: slug,
      description: description,
    });

    if (!test.success) {
      const error = test.error.flatten().fieldErrors;
      console.log("error", error);

      return {
        error: {
          name: error.name || [],
          description: error.description || [],
        },
      };
    } else {
      const response = await db.topic.create({
        data: {
          slug: test.data.name,
          description: test.data.description,
        },
      });
      topic = response;
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
  const path = paths.home();
  revalidatePath(path);
  redirect(paths.topicShow(topic.slug));
};
