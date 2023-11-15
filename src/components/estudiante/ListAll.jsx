import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

const ListEstudiantes = () => {
  const api = useAxiosPrivate();
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los estudiantes
    api
      .get("/estudiantes")
      .then((response) => {
        // Actualiza el estado con los estudiantes obtenidos
        setEstudiantes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los estudiantes:", error);
      });
  }, []);

  const openModal = (estudiante) => {
    setSelectedEstudiante(estudiante); // Establece el estudiante seleccionado cuando se abre el modal
    setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setSelectedEstudiante(null); // Resetea el estudiante seleccionado cuando se cierra el modal
    setIsModalOpen(false); // Cierra el modal
  };

  return (
    <div className="h-[60vh] p-4 overflow-y-auto bg-purple-300 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg font-serif font-thin border-collapse overflow-hidden shadow text-left">
        <thead className="text-white bg-purple-600">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Primer Apellido</th>
            <th className="p-2">Segundo Apellido</th>
            <th className="p-2">Fecha de Nacimiento</th>
            <th className="p-2">Edad</th>
            <th className="p-2">Género</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id} className=" text-gray-700 border-b hover:bg-purple-100 text-left">
              <td className="p-[15px]">{estudiante.id}</td>
              <td className="p-[15px]">{estudiante.nombre}</td>
              <td className="p-[15px]">{estudiante.apellido1}</td>
              <td className="p-[15px]">{estudiante.apellido2}</td>
              <td className="p-[15px]">{estudiante.fechaNacimiento}</td>
              <td className="p-[15px]">{estudiante.edad}</td>
              <td className="p-[15px]">
                {estudiante.sexo === false ? "Mujer" : "Hombre"}
              </td>
              <td className="flex items-center p-[15px]">
                <Link
                  to={`actualizar/${estudiante.id}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link
                  to={`borrar/${estudiante.id}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoIosTrash />
                </Link>
                <button
                  onClick={() => openModal(estudiante)}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedEstudiante && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50 modal-overlay"></div>
          <div className="z-50 w-1/2 p-4 bg-white rounded shadow-lg modal-container">
            <button className="text-right modal-close-btn" onClick={closeModal}>
              Cerrar
            </button>
            <h2 className="mb-4 text-xl font-bold">Detalles del Estudiante</h2>
            <p>Cedula: {selectedEstudiante.id}</p>
            <p>Nombre: {selectedEstudiante.nombre}</p>
            <p>Primer Apellido: {selectedEstudiante.apellido1}</p>
            <p>Segundo Apellido: {selectedEstudiante.apellido2}</p>
            <p>Fecha de Nacimiento: {selectedEstudiante.fechaNacimiento}</p>
            <p>Edad: {selectedEstudiante.edad}</p>
            <p>Sexo: {selectedEstudiante.sexo ? "Hombre" : "Mujer"}</p>
            <p>Direccion: {selectedEstudiante.direccion}</p>
            {selectedEstudiante.usuarioId ? (
              <p>Usuario Id: {selectedEstudiante.usuarioId}</p>
            ) : <p>Usuario Id: sin usuario asigando</p>}
            <h3 className="pt-2 font-bold">Grupo</h3>
            <p>seccion: {selectedEstudiante.seccion}</p>
            <p>Aula: {selectedEstudiante.grupo.aula}</p>
            <p>turno: {selectedEstudiante.grupo.turno ? "tarde" : "mañana"}</p>
            <h3 className="pt-2 font-bold">Encargado</h3>
            <p>Cedula: {selectedEstudiante.encargadoId}</p>
            <p>Nombre: {selectedEstudiante.encargado.nombre}</p>
            <p>Primer Apellido: {selectedEstudiante.encargado.apellido1}</p>
            <p>Segundo Apellido: {selectedEstudiante.encargado.apellido2}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEstudiantes;
