import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { paths } from "@/helpers/paths";
import db from "@/db";

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
  const comments = await db.comment.findMany({
    include: {
      user: { select: { name: true, image: true } },
    },
  });

  return (
    <div className='space-y-3'>
      <Link
        className='underline decoration-solid'
        href={paths.topicShow(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      {<PostShow postId={postId} />}
      <CommentCreateForm postId={postId} startOpen />
      <CommentList comments={comments} />
    </div>
  );
}
