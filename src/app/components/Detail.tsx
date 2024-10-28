import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ItemProps } from "../[id]/page";
import BtnVoltar from "./BtnVoltar";
import HandleDelete from "./HandleDelete";

interface DetailProps {
  item: ItemProps | null;
  router: AppRouterInstance;
  page: string | number;
  id: string
}

const Detail = ({ item, router, page, id }: DetailProps) => {
  return (
    <div>
      {item && (
        <div className="flex flex-col items-center gap-6 m-10">
          <h1>{item.name}</h1>
          <div>
            <p>{item.description}</p>
            <p>Categoria: {item.category.name}</p>
          </div>
          <div className="flex gap-2">
            <HandleDelete id={id} router={router}/>
            <button className="bg-green-500 text-white p-2 mt-4" onClick={() => router.push(`/update_item/${id}?page=${page}`)}>
              Editar item
            </button>
          </div>
          <div>
            <BtnVoltar endereço="/" page={page} router={router} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
