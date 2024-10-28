"use client";
import BtnVoltar from "../components/BtnVoltar";
import CreateItem from "../components/CreateItem";
import { useSearchParams, useRouter } from "next/navigation";

const CreateItemPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <CreateItem router={router} />
      <div className="m-auto">
        <BtnVoltar endereço="/" page={page} router={router} />
      </div>
    </div>
  );
};

export default CreateItemPage;
