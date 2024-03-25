import React from "react";

const ShowPostPage = ({
  params: { postId, slug },
}: {
  params: { postId: string; slug: string };
}) => {
  return (
    <div>
      Show Post Page
      <h1>{slug}</h1>
      <p>Post Id: {postId}</p>
    </div>
  );
};

export default ShowPostPage;
