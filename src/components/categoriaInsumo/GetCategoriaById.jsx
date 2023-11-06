import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function GetCategoriaById() {
  const api = useAxiosPrivate();
  const [id, setId] = useState("");
  const [categoria, setCategoria] = useState({});

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .get(`cateInsumo/${id}`)
      .then((response) => {
        setCategoria(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la nota por ID:", error);
      });
  };

  return (
    <div>
      <h2>Obtener nota por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del nota:</label>
          <input type="text" value={id} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">Obtener nota</button>
        </div>
      </form>
      {categoria && (
        <div>
          <h3>Información del la categoria</h3>
          <p>id: {categoria.id}</p>
          <p>Nombre: {categoria.nombreCateInsumo}</p>
          <p>Descripcion: {categoria.descripcionCateInsumo}</p>
        </div>
      )}
    </div>
  );
}

export default GetCategoriaById;
