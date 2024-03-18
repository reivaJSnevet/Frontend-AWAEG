import api from "../database/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await api.get("/auth/refresh-token", {
      withCredentials: true,
    });
    setAuth(prev => {
      //   console.log(JSON.stringify(prev)); 
      //  console.log(response.data.accessToken); 
      return { 
        ...prev,
        roleArray: response.data.user.Role.roleName ? [response.data.user.Role.roleName] : ["anonimo"],
        accessToken: response.data.accessToken,
        idUser: response?.data?.user.Person.id
      };
    });
    
    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
