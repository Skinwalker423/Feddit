"use client";

import { search } from "@/actions/search";
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

const SearchInput = () => {
  const searchParams = useSearchParams();

  return (
    <form action={search}>
      <Input
        type='text'
        name='term'
        defaultValue={searchParams.get("term") || ""}
      />
    </form>
  );
};

export default SearchInput;
