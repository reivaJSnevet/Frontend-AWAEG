import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

function ListAllCategorias() {
    const api = useAxiosPrivate();
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        try {
            const fetchCategorias = async () => {
                const response = await api.get("cateInsumo");
                setCategorias(response.data);
            };
            fetchCategorias();
        } catch (error) {
            console.log(error);
        }

    }, []);



  return (
    <div className="h-[60vh] p-4 overflow-y-auto bg-purple-300 rounded-lg shadow-lg ">

      <table className="w-full bg-white rounded-lg font-serif font-thin border-collapse overflow-hidden shadow text-left">
        <thead className="text-white bg-purple-600">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Nivel de Privilegio</th>
            <th className="hidden p-2 md:table-cell">Descripción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className="text-gray-700 border-b hover:bg-purple-100 text-left">
              <td className="p-[15px]">{categoria.id}</td>
              <td className="p-[15px]">{categoria.nombreCateInsumo}</td>
              <td className="p-[15px]">{categoria.descripcionCateInsumo }</td><td className="hidden px-4 py-2 md:table-cell">{categoria.descripcionCateInsumo}</td>
              <td className="flex items-center p-[15px]">
                <Link to={`actualizar/${categoria.id}`} className="mr-4 text-purple-500 hover:text-yellow-500">
                  <IoMdCreate />
                </Link>
                <Link to={`borrar/${categoria.id}`} className="text-purple-500 hover:text-yellow-500">
                  <IoIosTrash />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  </div>
  )
}

export default ListAllCategorias