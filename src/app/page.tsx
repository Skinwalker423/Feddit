import TopicCreateForm from "@/components/topics/TopicCreatForm";
import TopicsList from "@/components/topics/TopicsList";
import { Divider } from "@nextui-org/react";

export default async function Home() {
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3 bg-red-300'>
        <h1>Posts</h1>
        <ul>
          <li>Post 1</li>
          <li>Post 2</li>
        </ul>
      </div>
      <div className='border shadow py-3 px-2'>
        <TopicCreateForm />
        <Divider className='my-2' />
        <h3 className='text-lg'>Topics</h3>
        <TopicsList />
      </div>
    </div>
  );
}
