import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import BtnDelete from "./BtnDelete"

interface HandleDeleteProps {
    router: AppRouterInstance
    id:string
}

const HandleDelete = ({router, id}: HandleDeleteProps) => {
    const handleDelete = async () => {
        const confirmDelete = confirm('Tem certeza que deseja excluir este item?')
        if(confirmDelete){
            const res = await fetch(`http://127.0.0.1:8000/api/items/${id}/`,{
                method:'DELETE',
            })
            if(res.ok){
                alert('Item excluido com sucesso!')
                router.push('/')
            }  else{
                alert('Erro ao excluir o item.')
            }
        }
    }
  return (
    <div>
        <BtnDelete handleDelete={handleDelete}/>
    </div>
  )
}

export default HandleDelete