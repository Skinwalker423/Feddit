import { fetchPostsByQuery } from "@/actions/search";
import PostList from "@/components/posts/post-list";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  console.log("search params", searchParams);
  const term = searchParams.term;

  if (!term) redirect("/");

  return (
    <div>
      <div>Search results for {term}:</div>

      <PostList fetchData={() => fetchPostsByQuery(term)} />
    </div>
  );
};

export default SearchPage;
