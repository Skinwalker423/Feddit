"use server";

import db from "@/db";
import { paths } from "@/helpers/paths";
import { error } from "console";
import { revalidatePath } from "next/cache";
import z from "zod";

interface CreateTopicFormState {
  error: { name?: string[]; description?: string[] };
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
  const slug = formData.get("name")?.toString();
  const description = formData
    .get("description")
    ?.toString();

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
    return {
      error: {},
    };
  }

  // if (!slug) {
  //   return;
  // }

  // if (!description) {
  //   return;
  // }

  // const topic = await db.topic.create({
  //   data: {
  //     slug,
  //     description,
  //   },
  // });
  // // revalidate home page
  // const path = paths.home();
  // revalidatePath(path);
};
