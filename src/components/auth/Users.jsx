import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/usuarios", {
          signal: controller.signal
        });
        if(isMounted){
            /* console.log(response.data); */
          setUsers(response.data);
        }

        /* console.log(response.data);
        isMounted && setUsers(response.data); */
      } catch (err) {
        if(isMounted){
           /*  console.error(err); */
            navigate("/login", { state: { from: location }, replace: true});
        }
        /* console.error(err);
        navigate("/login", { state: { from: location }, replace: true}); */
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2> Lista de usuarios</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.nombre}</li>
          ))}
        </ul>
      ) : (
        <p> Sin usuarios</p>
      )}
    </article>
  );
};

export default Users;
