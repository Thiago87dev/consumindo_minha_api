"use client";

import { useEffect, useState } from "react";

interface Adicoes {
  id: number;
  valor1: number;
  valor2: number;
  result: number;
}

const ListarAdicoes = () => {
  const [adicoes, setAdicoes] = useState<Adicoes[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchAdicoes = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/adds/?limit=10", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setAdicoes(data || []);
    };
    fetchAdicoes();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 ">
      <h1 className="text-xl">Histórico de adiçoes</h1>
      {adicoes && (
        <ul className="flex flex-col gap-1">
          {adicoes.map((adicao) => (
            <li key={adicao.id}>
              {adicao.valor1} + {adicao.valor2} = {adicao.result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListarAdicoes;
