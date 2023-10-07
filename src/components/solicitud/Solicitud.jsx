import React, { useState, useEffect } from 'react';
import api from '../../services/api.config';

function Solicitud() {
  const [solicitudesData, setSolicitudesData] = useState(null);

  useEffect(() => {
    // Llama a la API y actualiza el estado con los datos
    api.get('/solicitudes')
      .then(response => {
        setSolicitudesData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error);
      });
  }, []); // El segundo argumento del useEffect asegura que este se ejecute solo una vez (equivalente a componentDidMount)

  if (!solicitudesData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Solicitudes</h1>
      <h2>Tabla de Notas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Calificación</th>
            {/* Agrega más encabezados según tus necesidades */}
          </tr>
        </thead>
        <tbody>
          {solicitudesData.notas.map(nota => (
            <tr key={nota.id}>
              <td>{nota.id}</td>
              <td>{nota.calificacion}</td>
              {/* Agrega más columnas según tus necesidades */}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Tabla de Archivos</h2>
      {/* Agrega una tabla similar para los archivos */}

      <h2>Tabla de Prematrículas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estado</th>
            {/* Agrega más encabezados según tus necesidades */}
          </tr>
        </thead>
        <tbody>
          {solicitudesData.prematriculas.map(prematricula => (
            <tr key={prematricula.id}>
              <td>{prematricula.id}</td>
              <td>{prematricula.estado}</td>
              {/* Agrega más columnas según tus necesidades */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Solicitud;
