import { fetchPostById } from "@/db/queries/posts";
import { notFound } from "next/navigation";

interface PostShowProps {
  postId: string;
}

export default async function PostShow({
  postId,
}: PostShowProps) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const post = await fetchPostById(postId);

  if (!post) return notFound();

  return (
    <div className='m-4'>
      <h1 className='text-2xl font-bold my-2'>
        {post.title}
      </h1>
      <p className='p-4 border rounded'>{post.content}</p>
    </div>
  );
}
