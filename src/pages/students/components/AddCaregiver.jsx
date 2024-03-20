import * as React from "react";
import { useState } from "react";
import { create } from "zustand";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";


export const useFormStore = create((set) => ({
  formData: {
     id: "",
    name: "",
    middleName: "",
    lastName: "",
    lastName2: "",
    birthDate: "2000-01-01",
    gender: "",
    address: "",
    phoneNumber: "",
    relationTo: "",
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: () =>
    set(() => ({
      formData: {
        id: "",
        name: "",
        middleName: "",
        lastName: "",
        lastName2: "",
        birthDate: "2000-01-01",
        gender: "",
        address: "",
        phoneNumber: "",
        relationTo: "",
      },
    })),
}));

function AddCaregiverStudent() {

  const api = useAxiosPrivate();
  const { formData, setFormData, resetFormData } = useFormStore();
  const [error, setError] = useState({
    error: false,
    validations: [],
  });

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
        phoneNumber,
        relationTo,
        ...rest }
         = formData;
    try {
      await api.post("/caregivers", {
        ...rest,
        Caregiver: {
          phoneNumber,
          relationTo,
        },
      });

      resetFormData();
      setError({
        error: false,
        validations: [],
      });


      setSnackbar({
        children: "Encargado agregado correctamente",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        children: "Error al agregar el encargado",
        severity: "error",
      });
      setError({
        error: true,
        validations: [...err.response.data.unmetValidations],
      });
      console.log("Error al agregar el encargado", err);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ mt: 2 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" gutterBottom margin={1}>
          Información del Encargado
        </Typography>

        <Grid container spacing={2} margin={1}>
          <Grid item xs={12}>
            <TextField
               required
               fullWidth
               error={
                 (formData.id === "" ||
                   error.validations.some(
                     (validation) => validation.field === "id"
                   )) &&
                 error.error
               }
               type="text"
               name="id"
               value={formData.id}
               label="Cedula"
               variant="outlined"
               helperText={
                 formData.userName === "" ||
                 error.validations.some(
                   (validation) => validation.field === "id"
                 )
                   ? error.validations.find(
                       (validation) => validation.field === "id"
                     )?.message
                   : "Agregar Cedula"
               }
               onChange={handleInputChange}
               />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              error={
                (formData.name === "" ||
                  error.validations.some(
                    (validation) => validation.field === "name"
                  )) &&
                error.error
              }
              type="text"
              name="name"
              value={formData.name}
              label="Nombre"
              helperText={
                formData.name === "" ||
                error.validations.some(
                  (validation) => validation.field === "name"
                )
                  ? error.validations.find(
                      (validation) => validation.field === "name"
                    )?.message
                  : "Agregar Nombre"
              }
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              error={
                (formData.middleName === "" ||
                  error.validations.some(
                    (validation) => validation.field === "middleName"
                  )) &&
                error.error
              }
              type="text"
              name="middleName"
              value={formData.middleName}
              label="Segundo Nombre"
              helperText={
                formData.middleName === "" ||
                error.validations.some(
                  (validation) => validation.field === "middleName"
                )
                  ? error.validations.find(
                      (validation) => validation.field === "middleName"
                    )?.message
                  : "Agregar Segundo Nombre"
              }
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              error={
                (formData.lastName === "" ||
                  error.validations.some(
                    (validation) => validation.field === "lastName"
                  )) &&
                error.error
              }
              type="text"
              name="lastName"
              value={formData.lastName}
              label="Primer Apellido"
              helperText={
                formData.lastName === "" ||
                error.validations.some(
                  (validation) => validation.field === "lastName"
                )
                  ? error.validations.find(
                      (validation) => validation.field === "lastName"
                    )?.message
                  : "Agregar Primer Apellido"
              }
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              error={
                (formData.lastName2 === "" ||
                  error.validations.some(
                    (validation) => validation.field === "lastName2"
                  )) &&
                error.error
              }
              type="text"
              name="lastName2"
              value={formData.lastName2}
              label="Segundo Apellido"
              helperText={
                formData.lastName2 === "" ||
                error.validations.some(
                  (validation) => validation.field === "lastName2"
                )
                  ? error.validations.find(
                      (validation) => validation.field === "lastName2"
                    )?.message
                  : "Agregar Segundo Apellido"
              }
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={
                (formData.birthDate === "" ||
                  error.validations.some(
                    (validation) => validation.field === "birthDate"
                  )) &&
                error.error
              }
              type="date"
              name="birthDate"
              value={formData.birthDate}
              label="Fecha Nacimiento"
              helperText={
                formData.birthDate === "" ||
                error.validations.some(
                  (validation) => validation.field === "birthDate"
                )
                  ? error.validations.find(
                      (validation) => validation.field === "birthDate"
                    )?.message
                  : "Agregar Fecha de Nacimiento"
              }
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel id="gender">Genero</FormLabel>
            <RadioGroup
              aria-labelledby="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel value="M" control={<Radio />} label="Masculino" />
              <FormControlLabel value="F" control={<Radio />} label="Femenino" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              error={
                (formData.address === "" ||
                  error.validations.some(
                    (validation) => validation.field === "address"
                  )) &&
                error.error
              }
              type="text"
              name="address"
              value={formData.address}
              label="Direccion"
              helperText={
                formData.address === "" ||
                error.validations.some(
                  (validation) => validation.field === "address"
                )
                  ? error.validations.find(
                      (validation) => validation.field === "address"
                    )?.message
                  : "Agregar Dirección"
              }
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              select
              fullWidth
              error={
                (formData.relationTo === "" ||
                  error.validations.some(
                    (validation) => validation.field === "relationTo"
                  )) &&
                error.error
              }
              type="text"
              name="relationTo"
              value={formData.relationTo}
              helperText={
                formData.relationTo === "" ||
                error.validations.some(
                  (validation) => validation.field === "relationTo"
                )
                  ? error.validations.find(
                      (validation) => validation.field === "relationTo"
                    )?.message
                  : "Agregar Relación con el Estudiante"
              }
              variant="outlined"
              onChange={handleInputChange}
              SelectProps={{ native: true }}
            >
              <option value="Encargado legal">Selecciona una opción</option>
              <option value="Abuelo">Abuelo</option>
              <option value="Abuela">Abuela</option>
              <option value="Tio">Tío</option>
              <option value="Tia">Tía</option>
              <option value="Padre">Padre</option>
              <option value="Madre">Madre</option>
              <option value="Hermano">Hermano</option>
              <option value="Hermana">Hermana</option>
              <option value="Padrastro">Padrastro</option>
              <option value="Madrasta">Madrasta</option>
              <option value="Encargado legal">Encargado legal</option>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              error={
                (formData.phoneNumber === "" ||
                  error.validations.some(
                    (validation) => validation.field === "phoneNumber"
                  )) &&
                error.error
              }
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              label="Número de Telefono"
              helperText={
                formData.phoneNumber === "" ||
                error.validations.some(
                  (validation) => validation.field === "phoneNumber"
                )
                  ? error.validations.find(
                      (validation) => validation.field === "phoneNumber"
                    )?.message
                  : "Agregar Número de Telefono"
              }
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" fullWidth>
          Agregar Encargado
        </Button>
      </Box>
      

      <div>
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
      </div>
    </>
  );
}

export default AddCaregiverStudent;
