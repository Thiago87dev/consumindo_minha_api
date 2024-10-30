import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";


interface Category {
  id: number;
  name: string;
}

interface ItemProps {
  id: number;
  name: string;
  description: string;
  category: Category;
}

interface UpdateItemProps {
  id: string;
  router: AppRouterInstance
}

const UpdateItem = ({ id, router }: UpdateItemProps) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Carregar os dados do item para edição
  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/items/${id}/`);
      if (res.ok) {
        const data: ItemProps = await res.json();
        setName(data.name);
        setDescription(data.description);
        setCategoryName(data.category.name);
      }
    };
    const fetchCategories = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/categories/");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.results || []);
      }
    };
    fetchItem();
    fetchCategories();
  }, [id]);

  // Função para enviar os dados atualizados do item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedItem = {
      name,
      description,
      category: {
        name: categoryName,
      },
    };

    const res = await fetch(`http://127.0.0.1:8000/api/items/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    if (res.ok) {
      alert("Item atualizado ccom sucesso");
      router.push(`/${id}`);
    } else {
      alert("Erro ao atualizar o item");
    }
  };

  return (
    <div className="w-2/4 mx-auto m-20 text-black items-center ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <h2 className="text-2xl text-white"> Editar item</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          className="border p-2 "
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2"
        />
        <select
        value={categoryName || ''}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 ">
          Atualizar item
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
