import { useState, useEffect } from "react";
import { IoMdCreate, IoIosTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ListFuncionarios = () => {
  const api = useAxiosPrivate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los funcionarios
    api
      .get("/funcionarios")
      .then((response) => {
        // Actualiza el estado con los funcionarios obtenidos
        setFuncionarios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los funcionarios:", error);
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
        {funcionarios.map((funcionario) => (
          <tr key={funcionario.id} className="text-gray-700 border-b hover:bg-purple-100 text-left">
            <td className="p-[15px]">{funcionario.id}</td>
            <td className="p-[15px]">{funcionario.nombre}</td>
            <td className="p-[15px]">{funcionario.apellido1}</td>
            <td className="p-[15px]">{funcionario.apellido2}</td>
            <td className="p-[15px]">{funcionario.fechaNacimiento}</td>
            <td className="p-[15px]">{funcionario.edad}</td>
            <td className="p-[15px]">
              {funcionario.sexo === false ? "Mujer" : "Hombre"}
            </td>
            <td className="flex items-center p-[15px]">
              <Link
                to={`actualizar/${funcionario.id}`}
                className="mr-4 text-purple-500 hover:text-yellow-500"
              >
                <IoMdCreate />
              </Link>
              <Link
                to={`borrar/${funcionario.id}`}
                className="mr-4 text-purple-500 hover:text-yellow-500"
              >
                <IoIosTrash />
              </Link>
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
          <p className="block mb-2 text-sm font-semibold text-black">Cedula: {selectedFuncionario.id}</p>
          <p className="block mb-2 text-sm font-semibold text-black">Nombre: {selectedFuncionario.nombre}</p>
          <p className="block mb-2 text-sm font-semibold text-black">Primer Apellido: {selectedFuncionario.apellido1}</p>
          <p className="block mb-2 text-sm font-semibold text-black">Segundo Apellido: {selectedFuncionario.apellido2}</p>
          <p className="block mb-2 text-sm font-semibold text-black">Fecha de Nacimiento: {selectedFuncionario.fechaNacimiento}</p>
          <p className="block mb-2 text-sm font-semibold text-black">Edad: {selectedFuncionario.edad}</p>
          <p className="block mb-2 text-sm font-semibold text-black">Sexo: {selectedFuncionario.sexo ? "Mujer" : "Hombre"}</p>
          {selectedFuncionario.usuarioId ? (
            <p className="block mb-2 text-sm font-semibold text-black">Usuario Id: {selectedFuncionario.usuarioId}</p>
          ) : <p className="block mb-2 text-sm font-semibold text-black">Usuario Id: sin usuario asigando</p>}
        </div>
      </div>
    )}
  </div>



  //   <div>
  //   <table className="list-roles-table">
  //     <thead>
  //       <tr className="list-roles-tr">
  //         <th className="roles-th">ID</th>
  //         <th className="roles-th">Nombre</th>
  //         <th className="roles-th">Primer Apellido</th>
  //         <th className="roles-th">Segundo Apellido</th>
  //         <th className="roles-th">Fecha de Nacimiento</th>
  //         <th className="roles-th">Edad</th>
  //         <th className="roles-th">Género</th>
  //         <th className="roles-th">Acciones</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {funcionarios.map((funcionario) => (
  //         <tr key={funcionario.id} className="list-roles-tr">
  //           <td className="list-roles-td">{funcionario.id}</td>
  //           <td className="list-roles-td">{funcionario.nombre}</td>
  //           <td className="list-roles-td">{funcionario.apellido1}</td>
  //           <td className="list-roles-td">{funcionario.apellido2}</td>
  //           <td className="list-roles-td">{funcionario.fechaNacimiento}</td>
  //           <td className="list-roles-td">{funcionario.edad}</td>
  //           <td className="list-roles-td">{funcionario.sexo ? "Hombre" : "Mujer"}</td>
  //           <td className="list-roles-td">
  //             <Link to={`actualizar/${funcionario.id}`}>Actualizar</Link>
  //             &nbsp;|&nbsp;
  //             <Link to={`borrar/${funcionario.id}`}>Borrar</Link>
  //           </td>
  //           <td className="list-roles-td">
  //               <button
  //                 onClick={() => openModal(funcionario)}
  //                 className="text-blue-500 underline cursor-pointer"
  //               >
  //                 Detalles
  //               </button>
  //             </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  //   {isModalOpen && selectedFuncionario && (
  //       <div className="fixed inset-0 z-50 flex items-center justify-center">
  //         <div className="fixed inset-0 bg-black opacity-50 modal-overlay"></div>
  //         <div className="z-50 w-1/2 p-4 bg-white rounded shadow-lg modal-container">
  //           <button className="text-right modal-close-btn" onClick={closeModal}>
  //             Cerrar
  //           </button>
  //           <h2 className="mb-4 text-xl font-bold">Detalles del Funcionario</h2>
  //           <p>Cedula: {selectedFuncionario.id}</p>
  //           <p>Nombre: {selectedFuncionario.nombre}</p>
  //           <p>Primer Apellido: {selectedFuncionario.apellido1}</p>
  //           <p>Segundo Apellido: {selectedFuncionario.apellido2}</p>
  //           <p>Fecha de Nacimiento: {selectedFuncionario.fechaNacimiento}</p>
  //           <p>Edad: {selectedFuncionario.edad}</p>
  //           <p>Sexo: {selectedFuncionario.sexo ? "Hombre" : "Mujer"}</p>
  //         </div>
  //       </div>
  //     )}
  // </div>
  );
};

export default ListFuncionarios;
