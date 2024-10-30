import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

interface BtnVoltarProps {
  router: AppRouterInstance;
  page: string | number;
  endereço: string
  searchTerm?: string
  selectedCategory?: string
}

const BtnVoltar = ({router, page, endereço, searchTerm, selectedCategory}: BtnVoltarProps) => {
  return (
    <div>
      {searchTerm && selectedCategory ?(
    <button
      className="text-white"
      onClick={() => router.push(`${endereço}?page=${page}&search=${searchTerm}&category=${selectedCategory}`)}
    >
      Voltar
    </button>

      ):selectedCategory ? (
        <button
      className="text-white"
      onClick={() => router.push(`${endereço}?page=${page}&category=${selectedCategory}`)}
    >
      Voltar
    </button>
      ): searchTerm ? (
        <button
      className="text-white"
      onClick={() => router.push(`${endereço}?page=${page}&search=${searchTerm}`)}
    >
      Voltar
    </button>
      ): (
        <button
      className="text-white"
      onClick={() => router.push(`${endereço}?page=${page}`)}
    >
      Voltar
    </button>
      )}
    </div>
  );
};

export default BtnVoltar;
