import { useState, useEffect } from 'react';
import api from '../../services/api.config.js';
import { useParams } from 'react-router-dom';

const UpdateClase = () => {
  const { id } = useParams();
  const [clase, setClase] = useState({
    dia: '',
    horaInicio: '',
    horaSalida: '',
    leccion: ''
  });

  useEffect(() => {
    if(!id) return;
    const fetchClase = async () => {
      try {
        const response = await api.get(`/clases/${id}`);
        setClase(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClase();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClase((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clases/${id}`, clase);
      alert('Clase actualizada con éxito.');
    } catch (error) {
      alert('Error al actualizar la clase.');
    }
  };

  return (
    <div>
      <h2>Actualizar Clase</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Día:</label>
          <input type="text" name="dia" value={clase.dia} onChange={handleInputChange} />
        </div>
        <div>
          <label>Hora de Inicio:</label>
          <input type="time" name="horaInicio" value={clase.horaInicio} onChange={handleInputChange} />
        </div>
        <div>
          <label>Hora de Salida:</label>
          <input type="time" name="horaSalida" value={clase.horaSalida} onChange={handleInputChange} />
        </div>
        <div>
          <label>Lección:</label>
          <input type="text" name="leccion" value={clase.leccion} onChange={handleInputChange} />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateClase;
