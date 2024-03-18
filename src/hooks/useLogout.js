import api from "../database/api";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await api("/logout", {
                withCredentials: true,
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;