import api from "./api.config";

export const GetAllFuncionarios = async () => {
    try {
      const response = await api.get("/funcionarios");
      return response.data
    } catch (error) {
      console.error("Error al obtener la lista de profesores: ", error);
    }
  }; 