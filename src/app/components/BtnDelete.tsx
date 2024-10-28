interface BtnDeleteProps {
    handleDelete: () => void
}

const BtnDelete = ({handleDelete}: BtnDeleteProps) => {
  return (
    <div>
        <button onClick={handleDelete} className='bg-red-500 text-white p-2 mt-4'>Excluir</button>
    </div>
  )
}

export default BtnDelete