"use server";

import db from "@/db";
import type { Topic } from "@prisma/client";

interface GetTopicsProps {
  error?: {
    general?: string[];
  };
  topics?: Topic[];
}

export const getTopics =
  async (): Promise<GetTopicsProps> => {
    try {
      const response = await db.topic.findMany({});

      return {
        topics: response,
      };
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
  };
