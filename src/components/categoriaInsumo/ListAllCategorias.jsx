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
    <div className="h-[50vh] p-4 md:p-8 bg-purple-400 rounded-lg shadow-lg ">
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg">
        <thead className="text-white bg-purple-200">
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Nombre</th>
            <th className="py-2">Nivel de Privilegio</th>
            <th className="hidden py-2 md:table-cell">Descripción</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className="text-gray-700 border-b">
              <td className="px-4 py-2">{categoria.id}</td>
              <td className="px-4 py-2">{categoria.nombreCateInsumo}</td>
              <td className="px-4 py-2">{categoria.descripcionCateInsumo}</td><td className="hidden px-4 py-2 md:table-cell">{categoria.descripcion}</td>
              <td className="flex items-center px-4 py-2">
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
  </div>
  )
}

export default ListAllCategorias