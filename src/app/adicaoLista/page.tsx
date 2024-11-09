"use client";
import ListarAdicoes from "../components/adicao/ListarAdicoes";
import Link from "next/link";

const AdicalLista = () => {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div className="m-20">
      {accessToken ? (
        <div>
          <Link href={"/adicao"}>Voltar</Link>
          <ListarAdicoes />
        </div>
      ) : (
        <p>Vc não esta logado</p>
      )}
    </div>
  );
};

export default AdicalLista;
