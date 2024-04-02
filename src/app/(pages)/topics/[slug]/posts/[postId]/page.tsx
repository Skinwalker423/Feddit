import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { paths } from "@/helpers/paths";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Suspense } from "react";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({
  params,
}: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className='space-y-3'>
      <Link
        className='underline decoration-solid'
        href={paths.topicShow(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      <Suspense
        fallback={
          <div className='m-4 animate-pulse'>
            <h1 className='text-2xl font-bold my-2 '>
              Loading...
            </h1>
            <p className='h-[57.6px] bg-gray-200 rounded dark:bg-gray-700 mb-2.5'></p>
          </div>
        }
      >
        <PostShow postId={postId} />
      </Suspense>

      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
