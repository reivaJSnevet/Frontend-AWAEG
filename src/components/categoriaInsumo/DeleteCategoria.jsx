import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function DeleteCategoria() {
    const api = useAxiosPrivate();
    const [categoriaId, setCategoriaId] = useState('');
    const {paramId} = useParams();

const handleInputChange = (event) => {
    setCategoriaId(event.target.value);
}

useEffect(() => { 
    if(paramId){
        setCategoriaId(paramId);
    }else{
        setCategoriaId('');
    }
  }, [paramId]);

const handleDelete = (event) => {
    event.preventDefault();

    api.delete(`/cateInsumo/${paramId}`)
    .then(() => {
        alert('Categoria eliminada con éxito.');
        setCategoriaId('');
    })
    .catch((error) => {
        console.error('Error al eliminar la categoria por ID:', error);
    });
}


  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
    <h2  className="mb-4 text-2xl font-bold text-white">Eliminar Categoria por ID</h2>
    <form className="space-y-4" onSubmit={handleDelete}>
      <div>
        <label className="block mb-1 text-sm font-medium text-white">ID de la categoria a Eliminar:</label>
        <input
          type="text"
          value={categoriaId}
          onChange={handleInputChange}
          disabled
            className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div>
        <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Eliminar Categoria</button>
      </div>
    </form>
  </div>
  )
}

export default DeleteCategoria