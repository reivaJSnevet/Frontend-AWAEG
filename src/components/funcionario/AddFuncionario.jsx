import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const AddFuncionario = () => {
  const api = useAxiosPrivate();

  const [funcionarioData, setFuncionarioData] = useState({
    id: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    fechaNacimiento: '',
    sexo: true,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFuncionarioData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    const { id, nombre, apellido1, apellido2, fechaNacimiento } = funcionarioData;
    if (!id || !nombre || !apellido1 || !apellido2 || !fechaNacimiento) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      console.log(funcionarioData);
      await api.post('/funcionarios', funcionarioData);
      

      // Limpiar el formulario después de enviar los datos
      setFuncionarioData({
        id: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        fechaNacimiento: '',
        sexo: true,
      });

      alert('Funcionario agregado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el funcionario:', error);
      alert('Hubo un error al agregar el funcionario. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Agregar Funcionario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Id:</label>
          <input type="text" name="id" value={funcionarioData.id} onChange={handleInputChange} />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={funcionarioData.nombre} onChange={handleInputChange} />
        </div>
        <div>
          <label>Primer Apellido:</label>
          <input type="text" name="apellido1" value={funcionarioData.apellido1} onChange={handleInputChange} />
        </div>
        <div>
          <label>Segundo Apellido:</label>
          <input type="text" name="apellido2" value={funcionarioData.apellido2} onChange={handleInputChange} />
        </div>
        <div>
          <label>Fecha Nacimiento:</label>
          <input type="date" name="fechaNacimiento" value={funcionarioData.fechaNacimiento} onChange={handleInputChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-600">Sexo:</label>
          <select name="sexo" value={funcionarioData.sexo.toString()} onChange={handleInputChange}>
            <option value="true">Hombre</option>
            <option value="false">Mujer</option>
          </select>
        </div>
        <div>
          <button type="submit">Agregar Funcionario</button>
        </div>
      </form>
    </div>
  );
};

export default AddFuncionario;
