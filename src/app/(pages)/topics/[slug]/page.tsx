import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/post-list";
import { fetchPostByTopicSlug } from "@/db/queries/posts";
import React from "react";

interface TopicPageProps {
  params: { slug: string };
}

const TopicPage = ({ params }: TopicPageProps) => {
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='text-2xl font-bold mb-2'>
          {params.slug}
        </h1>
        <PostList
          fetchData={() => {
            return fetchPostByTopicSlug(params.slug);
          }}
        />
      </div>
      <div className='border shadow py-3 px-2'>
        <PostCreateForm slug={params.slug} />
      </div>
    </div>
  );
};

export default TopicPage;
