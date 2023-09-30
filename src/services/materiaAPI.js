import api from "./api.config";

export const GetAllMaterias = async () => {
    try {
      const response = await api.get("/materias");
      return response.data
    } catch (error) {
      console.error("Error al obtener la lista de materias: ", error);
    }
};