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
    <div>
    <h2>Eliminar Categoria por ID</h2>
    <form onSubmit={handleDelete}>
      <div>
        <label>ID de la categoria a Eliminar:</label>
        <input
          type="text"
          value={categoriaId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit">Eliminar Categoria</button>
      </div>
    </form>
  </div>
  )
}

export default DeleteCategoria