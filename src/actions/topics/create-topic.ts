"use server";

import db from "@/db";

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
};
