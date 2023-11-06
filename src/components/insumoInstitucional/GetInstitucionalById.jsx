import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function GetInstitucionalById() {
  const api = useAxiosPrivate();
  const [id, setId] = useState("");
  const [institucional, setInstitucional] = useState({});

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .get(`insumoInst/${id}`)
      .then((response) => {
        setInstitucional(response.data);
      })
      .catch((error) => {
        console.error(
          "Error al obtener el insumo institucional por ID:",
          error
        );
      });
  };

  return (
    <div>
      <h2>Obtener insumo institucional por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del insumo institucional:</label>
          <input type="text" value={id} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">Obtener insumo institucional</button>
        </div>
      </form>
      {institucional && (
        <div>
          <h3>Información del insumo institucional</h3>
          <p>id: {institucional.id}</p>
          <p>Nombre: {institucional.nombreInsumoInst}</p>
          <p>Descripcion: {institucional.descripcion}</p>
          <p>Cantidad: {institucional.cantidad}</p>
          <p>Disponible: {institucional.disponible ? "Disponible" : "No Disponible"}</p>
          <p>Categoria: {institucional.cateInsumoId}</p>
        </div>
      )}
    </div>
  );
}

export default GetInstitucionalById;
