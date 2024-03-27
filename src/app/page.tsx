import TopicCreatForm from "@/components/topics/TopicCreatForm";

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
      <div>
        <TopicCreatForm />
      </div>
    </div>
  );
}
