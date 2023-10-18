import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const GetAllFuncionarios = async () => {
    const api = useAxiosPrivate();
    try {
      const response = await api.get("/funcionarios");
      return response.data
    } catch (error) {
      console.error("Error al obtener la lista de profesores: ", error);
    }
  }; 