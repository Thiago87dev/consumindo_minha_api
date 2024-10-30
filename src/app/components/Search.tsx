"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryString = currentCategory
      ? `/?search=${searchTerm}&category=${currentCategory}`
      : `/?search=${searchTerm}`;

    router.push(queryString);
  };
  return (
    <form onSubmit={handleSearch} className="text-black flex gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar..."
      />
      <button type="submit" className="text-white">
        Pesquisar
      </button>
    </form>
  );
};

export default Search;
