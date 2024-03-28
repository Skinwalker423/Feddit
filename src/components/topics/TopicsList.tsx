import { getTopics } from "@/actions/topics/get-topics";
import { paths } from "@/helpers/paths";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const TopicsList = async () => {
  const { topics, error } = await getTopics();
  console.log("list", topics);
  if (error?.general) {
    return <p>{error.general}</p>;
  }

  return (
    <div>
      {topics ? (
        <ul className='flex flex-row flex-wrap gap-2'>
          {topics.map((topic) => {
            return (
              <li className='underline' key={topic.id}>
                <Link href={paths.topicShow(topic.slug)}>
                  <Chip variant='shadow' color='warning'>
                    {topic.slug}
                  </Chip>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No Topics available</p>
      )}
    </div>
  );
};

export default TopicsList;
