import { Skeleton } from "@nextui-org/react";

const PostShowSkeleton = () => {
  return (
    <div className='m-4'>
      <div className='my-2'>
        <Skeleton className='h-8 w-full max-w-lg' />
      </div>
      <div className='p-4 border rounded space-y-2'>
        <Skeleton className='h-6 w-full max-w-xl' />
        <Skeleton className='h-6 w-full max-w-xl' />
        <Skeleton className='h-6 w-full max-w-xl' />
      </div>
    </div>
  );
};

export default PostShowSkeleton;
