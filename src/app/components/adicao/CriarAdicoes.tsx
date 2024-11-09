"use client";
import { useState } from "react";

const CriarAdicoes = () => {
  const [valor1, setValor1] = useState("");
  const [valor2, setValor2] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    const accessToken = localStorage.getItem("accessToken");
    e.preventDefault();

    const novaAdicao = {
      valor1,
      valor2,
    };

    // Requisição POST para fazer a soma
    await fetch("http://127.0.0.1:8000/api/adds/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
         Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(novaAdicao),
    });
    alert('Salvo com sucesso')
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h2>Faça sua soma</h2>
      <form onSubmit={handleSubmit} className="md:flex flex md:flex-row flex-col text-center gap-1 items-center">
        <input
          type="number"
          value={valor1}
          onChange={(e) => setValor1(e.target.value)}
          className="md:w-20 md:h-20 text-center text-black"
        />{" "}
        <p>+</p>
        <input
          type="number"
          value={valor2}
          onChange={(e) => setValor2(e.target.value)}
          className="md:w-20 md:h-20 text-center text-black"
        />
        <p>=</p>
        <input
          type="number"
          value={Number(valor1) + Number(valor2)}
          onChange={(e) => setValor2(e.target.value)}
          className="md:w-20 md:h-20 text-center text-black bg-white"
          disabled
        /><div>
        <button type="submit" className="text-white">
          Salvar
        </button>

        </div>
      </form>
    </div>
  );
};

export default CriarAdicoes;
