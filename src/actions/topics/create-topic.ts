"use server";

import db from "@/db";
import { paths } from "@/helpers/paths";
import { revalidatePath } from "next/cache";

export const createTopic = async (formData: FormData) => {
  const slug = formData.get("name")?.toString();
  const description = formData
    .get("description")
    ?.toString();

  if (!slug) {
    return;
  }

  if (!description) {
    return;
  }

  const topic = await db.topic.create({
    data: {
      slug,
      description,
    },
  });
  // revalidate home page
  const path = paths.home();
  revalidatePath(path);
};
