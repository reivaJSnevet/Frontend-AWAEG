import { useState, useEffect } from "react";
import { create } from "zustand";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const useFormStore = create((set) => ({
  formData: {
    userName: "",
    email: "",
    password: "",
    roleId: 0,
    personId: "",
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: () =>
    set(() => ({
      formData: {
        userName: "",
        email: "",
        password: "",
        roleId: 0,
        personId: "",
      },
    })),
}));

function AddUser({ reset, setReset}) {
  const api = useAxiosPrivate();
  const { formData, setFormData, resetFormData } = useFormStore();
  const [roles, setRoles] = useState([]);
  const [people, setPeople] = useState([]);
  const [error, setError] = useState({
    error: false,
    validations: [],
  });
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roles = await api.get("/roles");
        setRoles(roles.data);

        const students = await api.get("/students");
        const teachers = await api.get("/functionaries");

        const people = [...students.data, ...teachers.data];

        const filteredPeople = people.filter((person) => !person.User);
        const peopleOptions = filteredPeople.map((person) => {
          return `${person.name} ${person.lastName} - ${person.id}`;
        });

        console.log(peopleOptions);
        setPeople(peopleOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [api]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/users", formData);
      setSnackbar({ children: "Usuario Agregado con exito!", severity: "success" });
        setReset(!reset);
    } catch (err) {
        console.log(err);
      setSnackbar({
        children: "Error al agregar el usuario",
        severity: "error",
      });
      setError({
        error: true,
        validations: [...err.response.data.unmetValidations],
      });
      console.log(error);
    }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Agregar Usuario</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <TextField
                required
                error={
                  (formData.userName === "" ||
                    error.validations.some(
                      (validation) => validation.field === "userName"
                    )) &&
                  error.error
                }
                type="text"
                name="userName"
                value={formData.userName}
                label="Nombre de Usuario"
                variant="outlined"
                helperText={
                  formData.userName === "" ||
                  error.validations.some(
                    (validation) => validation.field === "userName"
                  )
                    ? error.validations.find(
                        (validation) => validation.field === "userName"
                      )?.message
                    : "Agregar nombre de usuario"
                }
                onChange={handleInputChange}
              />
              <TextField
                required
                error={
                  (formData.password === "" ||
                    error.validations.some(
                      (validation) => validation.field === "password"
                    )) &&
                  error.error
                }
                type="password"
                name="password"
                value={formData.password}
                label="Contraseña"
                helperText={
                  formData.password === "" ||
                  error.validations.some(
                    (validation) => validation.field === "password"
                  )
                    ? error.validations.find(
                        (validation) => validation.field === "password"
                      )?.message
                    : "Agregar contraseña"
                }
                variant="outlined"
                onChange={handleInputChange}
              />
              <TextField
                required
                error={
                  (formData.email === "" ||
                    error.validations.some(
                      (validation) => validation.field === "email"
                    )) &&
                  error.error
                }
                type="email"
                name="email"
                value={formData.email}
                label="Correo Electrónico"
                helperText={
                  formData.email === "" ||
                  error.validations.some(
                    (validation) => validation.field === "email"
                  )
                    ? error.validations.find(
                        (validation) => validation.field === "email"
                      )?.message
                    : "Agregar correo electrónico"
                }
                variant="outlined"
                onChange={handleInputChange}
              />
              <Autocomplete
                disablePortal
                id="auto-complete"
                options={people}
                name="personId"
                value={formData.personId}
                onChange={(event, newValue) => {
                    setFormData({ personId: newValue.split(" - ")[1] });
                }
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona una persona"
                    error={
                      (formData.personId === "" ||
                        error.validations.some(
                          (validation) => validation.field === "personId"
                        )) &&
                      error.error
                    }
                    helperText={
                      formData.personId === "" ||
                      error.validations.some(
                        (validation) => validation.field === "personId"
                      )
                        ? error.validations.find(
                            (validation) => validation.field === "personId"
                          )?.message
                        : "Agregar cedula de la persona"
                    }
                    variant="outlined"
                  />
                )}
              />
              <TextField
                label="Selecciona un rol"
                select
                value={formData.roleId}
                name="roleId"
                onChange={handleInputChange}
                helperText={
                  formData.roleId === 0 ||
                  error.validations.some(
                    (validation) => validation.field === "roleId"
                  )
                    ? error.validations.find(
                        (validation) => validation.field === "roleId"
                      )?.message
                    : "Selecciona un rol"
                }
                error={
                  (formData.roleId === 0 ||
                    error.validations.some(
                      (validation) => validation.field === "roleId"
                    )) &&
                  error.error
                }
              >
                <MenuItem value={0}>Selecciona un rol</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.roleId} value={role.roleId}>
                    {role.roleName}
                  </MenuItem>
                ))}
              </TextField>
              <Button type="submit" variant="contained">
                Agregar Usuario
              </Button>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>

      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}
export default AddUser;

// import create from 'zustand';

// // Definimos el store para el estado del formulario
// const useFormStore = create((set) => ({
//   formData: {
//     // Inicializamos los campos del formulario
//     username: '',
//     email: '',
//     password: '',
//   },
//   // Función para actualizar el estado del formulario
//   setFormData: (newFormData) => set((state) => ({ formData: { ...state.formData, ...newFormData } })),
// }));

// // Componente de formulario
// const MyForm = () => {
//   // Usamos el hook useFormStore para acceder al estado del formulario y la función para actualizarlo
//   const { formData, setFormData } = useFormStore();

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     // Actualizamos el estado del formulario con los nuevos valores
//     setFormData({ [name]: value });}
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Aquí puedes realizar cualquier lógica de envío del formulario utilizando los datos en formData
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
//       <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
//       <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyForm;
