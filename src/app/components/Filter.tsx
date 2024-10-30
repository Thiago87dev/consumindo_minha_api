import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

const Filter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const router = useRouter();
  
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const searchTerm = searchParams.get("search");

  // Mantém o valor do filtro ao recarregar
  useEffect(() => {
    setSelectedCategory(currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/categories/");
      const data = await res.json();
      setCategories(data.results || []);
    };
    fetchCategory();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    const queryString = searchTerm
      ? `/?category=${category}&search=${searchTerm}`
      : `/?category=${category}`;
    router.push(queryString);
  };

  return (
    <div className="text-black flex gap-4 items-center">
      <label className="text-white" htmlFor="category">
        Filtrar por categoria
      </label>
      <select
        id="category"
        onChange={handleFilterChange}
        value={selectedCategory || ""}
        className="border p-2"
      >
        <option value="">Todas as categorias</option>
        {categories.map((v) => (
          <option key={v.id} value={v.id.toString()}>
            {v.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
