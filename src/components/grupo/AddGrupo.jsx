import { useEffect, useState } from 'react';
import api from '../../services/api.config.js';

const AddGrupo = () => {
  const [seccion, setSeccion] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [grado, setGrado] = useState('');
  const [aula, setAula] = useState('');
  const [cantAlumno, setCantAlumno] = useState('');
  const [turno, setturno] = useState('');
  const [profesorId, setProfesorId] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get("funcionarios");
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Error fetching funcionarios:", error.response?.data || error.message);
      }
    };
    fetchFuncionarios();
  }, []);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'seccion') {
      setSeccion(value);
    }else if (name === 'ciclo') {
        setCiclo(value);
    }else if (name === 'grado') {
        setGrado(value);
      } else if (name === 'aula') {
        setAula(value);
      }else if (name === 'cantAlumno') {
        setCantAlumno(value);
      } else if (name === 'turno') {
        setturno(value);
      } else if (name === 'profesorId') {
        setProfesorId(value);
      }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    if (!seccion || !grado || !aula || !cantAlumno || !turno || !ciclo) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post('/grupos', {
        seccion,
        ciclo,
        grado,
        aula,
        cantAlumno,
        turno
      });

      // Limpiar el formulario después de enviar los datos
      setSeccion('');
      setCiclo('')
      setGrado('');
      setAula('');
      setCantAlumno('');
      setturno('');
     

      alert('Grupo agregado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el Grupo:', error);
      alert('Hubo un error al agregar el Grupo. Por favor, inténtelo de nuevo.');
    }
  }

  return (
    <div>
      <h2>Agregar Grupo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>seccion:</label>
          <input
            type="text"
            name="seccion"
            value={seccion}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label>Ciclo:</label>
          <input
            type="text"
            name="ciclo"
            value={ciclo}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label>Grado:</label>
          <input
            type="text"
            name="grado"
            value={grado}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Aula:</label>
          <input
            type="text"
            name="aula"
            value={aula}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label>Cantidad de Estudiantes:</label>
          <input
            type="number"
            name="cantAlumno"
            value={cantAlumno}
            onChange={handleInputChange}
          />
            <label>turno:</label>
          <input
            type="text"
            name="turno"
            value={turno}
            onChange={handleInputChange}
          />
          <div>
          <label>Profesor:</label>
          <select
            name="profesor"
            value={profesorId}
            onChange={handleSubmit}
          >
            <option value="" disabled>
              Seleccione un profesor
            </option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nombre} {funcionario.apellido1} {funcionario.apellido2}
              </option>
            ))}
          </select>
        </div>
          <button type="submit">Agregar Grupo</button>
        </div>
      </form>
    </div>
  );
}

export default AddGrupo;




