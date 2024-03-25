import React from "react";

const TopicPage = ({
  params,
}: {
  params: { slug: string };
}) => {
  return (
    <div>
      <h1>Topic: {params.slug}</h1>
    </div>
  );
};

export default TopicPage;
