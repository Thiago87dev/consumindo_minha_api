import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

interface BtnVoltarProps {
  router: AppRouterInstance;
  page: string | number;
  endereço: string
}

const BtnVoltar = ({router, page, endereço}: BtnVoltarProps) => {
  return (
    <button
      className="text-white"
      onClick={() => router.push(`${endereço}?page=${page}`)}
    >
      Voltar
    </button>
  );
};

export default BtnVoltar;
