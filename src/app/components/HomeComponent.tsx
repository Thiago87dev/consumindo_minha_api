"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Search from "./Search";
import Filter from "./Filter";

interface Category {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
  description: string;
  category: Category;
}

const HomeComponent = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [totalPages, setTotalPages] = useState(0); // Para armazenar o total de páginas

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/api/items/?page=${page}&search=${searchTerm}&category=${selectedCategory}`
      );
      const data = await res.json();
      setItems(data.results || []);
      setTotalPages(data.count ? Math.ceil(data.count / 4) : 0); // Calcule o total de páginas
    };
    fetchItems();
  }, [page, searchTerm, selectedCategory]);

  const handlePageChange = (newPage: number) => {
    if (searchTerm) {
      router.push(`/?page=${newPage}&search=${searchTerm}`);
    } else if (selectedCategory) {
      router.push(`/?page=${newPage}&category=${selectedCategory}`);
    } else if (searchTerm && selectedCategory) {
      router.push(
        `/?page=${newPage}&search=${searchTerm}&category=${selectedCategory}`
      );
    } else {
      router.push(`/?page=${newPage}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[600px] gap-4 m-10">
      <div className="flex flex-col items-center gap-4 m-10">
        <Link href="/" className="text-5xl mb-10">
          Items
        </Link>
        <Search />
        <Filter />
        <ul>
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/${item.id}?page=${page}&search=${searchTerm}&category=${selectedCategory}`}
            >
              <li>
                {item.name} - Categoria: {item.category.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex gap-2 items-center">
          <button
            className={`${page == 1 ? "text-gray-500" : "text-green-500"}`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || totalPages === 0}
          >
            Anterior
          </button>
          <span className="text-sm">
            Página {page} de {totalPages}
          </span>
          <button
            className={`${
              page == totalPages
                ? "text-gray-500"
                : totalPages === 0
                ? "text-gray-500"
                : "text-green-500"
            }`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages || totalPages === 0}
          >
            Próxima
          </button>
        </div>
        <div>
          <Link href={`/create_item/?page=${page}`}>Criar novo item</Link>
        </div>
        <div>
          <Link href={`/adicao/`}>Soma aleatória</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
