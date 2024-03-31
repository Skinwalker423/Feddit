import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { paths } from "@/helpers/paths";
import db from "@/db";
import { PostWithData } from "@/db/queries/posts";
import { notFound } from "next/navigation";

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

  const post = await db.post.findFirst({
    where: { id: postId },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });

  if (!post) return notFound();

  return (
    <div className='space-y-3'>
      <Link
        className='underline decoration-solid'
        href={paths.topicShow(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      {<PostShow post={post} />}
      {/* <CommentCreateForm postId={postId} startOpen /> */}
      {/* <CommentList comments={comments} /> */}
    </div>
  );
}
