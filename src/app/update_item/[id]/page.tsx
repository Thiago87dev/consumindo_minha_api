"use client";
import UpdateItem from '@/app/components/UpdateItem'
import { use } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import BtnVoltar from '@/app/components/BtnVoltar';

const UpdateItemPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const router = useRouter();
    const searchParams = useSearchParams()
    const page = searchParams.get('page') || 1
  return (
    <div className='flex flex-col items-center'>
        <UpdateItem router={router}  id={id}/>
        <BtnVoltar endereço={`/${id}`} page={page} router={router}/>
    </div>
  )
}

export default UpdateItemPage