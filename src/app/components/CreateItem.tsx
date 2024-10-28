'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface CreateItemProps {
  router: AppRouterInstance
}

const CreateItem = ({router}: CreateItemProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Carregar categorias ao montar o componente
  useEffect(() => {
    const fetchCategories = async () => {
      let allCategories: Category[] = []
      let page = 1
      let hasMorePages = true

      while (hasMorePages){
        const res = await fetch(`http://127.0.0.1:8000/api/categories/?page=${page}`);
        const data = await res.json();
        allCategories = [...allCategories, ...data.results]

        if(data.next) {
          page += 1
        } else {
          hasMorePages = false
        }
      }
      setCategories(allCategories);

    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dados do novo item
    const newItem = {
      name,
      description,
      category: {
        name: categoryName || '',
      }
    };

    // Requisição POST para criar o item
    const res = await fetch("http://127.0.0.1:8000/api/items/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    if (res.ok) {
      const createdItem = await res.json();
      alert(`Item criado com sucesso ${createdItem.name}`);
      router.push(`/`)
    } else {
      alert("Erro ao criar o item");
    }
  };

  return (
    <div className="w-2/4 mx-auto m-20 text-black items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl text-white" > criar novo item</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          className="border p-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2"
        />
        <select
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2"
        >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
            ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">Cria item</button>
      </form>
    </div>
  );
};

export default CreateItem;
