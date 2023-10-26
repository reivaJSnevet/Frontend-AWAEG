import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ListFuncionarios = () => {
    const api = useAxiosPrivate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los funcionarios
    api
      .get('/funcionarios')
      .then((response) => {
        // Actualiza el estado con los funcionarios obtenidos
        setFuncionarios(response.data);
      })
      .catch((error) => {
        console.error('Error fetching funcionarios:', error);
      });
  }, []);


  const openModal = (funcionario) => {
    setSelectedFuncionario(funcionario); // Establece el estudiante seleccionado cuando se abre el modal
    setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setSelectedFuncionario(null); // Resetea el estudiante seleccionado cuando se cierra el modal
    setIsModalOpen(false); // Cierra el modal
  };



  return (
    <div>
    <table className="list-roles-table">
      <thead>
        <tr className="list-roles-tr">
          <th className="roles-th">ID</th>
          <th className="roles-th">Nombre</th>
          <th className="roles-th">Primer Apellido</th>
          <th className="roles-th">Segundo Apellido</th>
          <th className="roles-th">Fecha de Nacimiento</th>
          <th className="roles-th">Edad</th>
          <th className="roles-th">Género</th>
          <th className="roles-th">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {funcionarios.map((funcionario) => (
          <tr key={funcionario.id} className="list-roles-tr">
            <td className="list-roles-td">{funcionario.id}</td>
            <td className="list-roles-td">{funcionario.nombre}</td>
            <td className="list-roles-td">{funcionario.apellido1}</td>
            <td className="list-roles-td">{funcionario.apellido2}</td>
            <td className="list-roles-td">{funcionario.fechaNacimiento}</td>
            <td className="list-roles-td">{funcionario.edad}</td>
            <td className="list-roles-td">{funcionario.sexo ? "Hombre" : "Mujer"}</td>
            <td className="list-roles-td">
              <Link to={`actualizar/${funcionario.id}`}>Actualizar</Link>
              &nbsp;|&nbsp;
              <Link to={`borrar/${funcionario.id}`}>Borrar</Link>
            </td>
            <td className="list-roles-td">
                <button
                  onClick={() => openModal(funcionario)}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Detalles
                </button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isModalOpen && selectedFuncionario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50 modal-overlay"></div>
          <div className="z-50 w-1/2 p-4 bg-white rounded shadow-lg modal-container">
            <button className="text-right modal-close-btn" onClick={closeModal}>
              Cerrar
            </button>
            <h2 className="mb-4 text-xl font-bold">Detalles del Funcionario</h2>
            <p>Cedula: {selectedFuncionario.id}</p>
            <p>Nombre: {selectedFuncionario.nombre}</p>
            <p>Primer Apellido: {selectedFuncionario.apellido1}</p>
            <p>Segundo Apellido: {selectedFuncionario.apellido2}</p>
            <p>Fecha de Nacimiento: {selectedFuncionario.fechaNacimiento}</p>
            <p>Edad: {selectedFuncionario.edad}</p>
            <p>Sexo: {selectedFuncionario.sexo ? "Hombre" : "Mujer"}</p>
          </div>
        </div>
      )}
  </div>
  );
}

export default ListFuncionarios;