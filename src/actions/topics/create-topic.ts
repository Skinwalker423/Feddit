"use server";

import db from "@/db";
import { paths } from "@/helpers/paths";
import { revalidatePath } from "next/cache";

interface CreateTopicProps {
  slug: string;
  description: string;
}

export const createTopic = async ({
  slug,
  description,
}: CreateTopicProps) => {
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
