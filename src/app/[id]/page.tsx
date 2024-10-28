"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, use } from "react";
import Detail from "../components/Detail";
import BtnVoltar from "../components/BtnVoltar";

interface CategoryProps {
  id: number;
  name: string;
  description?: string;
}

export interface ItemProps {
  id: number;
  name: string;
  description: string;
  category: CategoryProps;
}

const Itemdatail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // pega o id da url
  const router = useRouter();
  const searchParams = useSearchParams()

  const page = searchParams.get('page') || 1

  const [item, setItem] = useState<ItemProps | null>(null);

  useEffect(()=>{
    const fetchItem = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/items/${id}/`)
      if(!res.ok) {
        setItem(null)
      } else {
        const data = await res.json()
        setItem(data)
      }
    }
    fetchItem()
  },[id])

  if (!item) {
    return(
        <div>
            <h1>Item não encontrado</h1>
            <BtnVoltar endereço="/" page={page} router={router}/>
        </div>
    ) 
  }

  return (
    <div className="">
        <Detail item={item} page={page} router={router} id={id}/> 
    </div>
  );
};

export default Itemdatail;
