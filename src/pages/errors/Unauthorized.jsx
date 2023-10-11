import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 text-center bg-white rounded shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Acceso No Autorizado</h2>
        <p className="mb-4 text-gray-700">
          Lo sentimos, no tienes permisos para acceder a esta página.
        </p>
        <button onClick={goBack} className="text-blue-500 hover:underline">
          Volver
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
