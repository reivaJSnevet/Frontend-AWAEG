import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const GetAllMaterias = async () => {
    const api = useAxiosPrivate();
    try {
      const response = await api.get("/materias");
      return response.data
    } catch (error) {
      console.error("Error al obtener la lista de materias: ", error);
    }
};