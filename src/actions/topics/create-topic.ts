"use server";

import db from "@/db";
import { paths } from "@/helpers/paths";
import { revalidatePath } from "next/cache";
import z from "zod";
import { auth } from "@/auth";

interface CreateTopicFormState {
  error: {
    name?: string[];
    description?: string[];
    general?: string | string[];
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
  try {
    const session = await auth();
    if (!session?.user)
      return {
        error: {
          general: "Must be logged in to create topic",
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
      const topic = await db.topic.create({
        data: {
          slug,
          description,
        },
      });
      // revalidate home page
      const path = paths.home();
      revalidatePath(path);
      return {
        error: {},
      };
    }
  } catch (error: any) {
    return {
      error: {
        general: error?.message,
      },
    };
  }
};
