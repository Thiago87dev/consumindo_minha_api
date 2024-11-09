"use client";
import Link from "next/link";
import CriarAdicoes from "../components/adicao/CriarAdicoes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const Adicao = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);
  return (
    <div className="flex flex-col items-center gap-10 my-20">
      <CriarAdicoes />
      <Link href={'/adicaoLista'}>Historico de somas</Link>
      <Link href={'/'}>Voltar</Link>
    </div>
  );
};

export default Adicao;
