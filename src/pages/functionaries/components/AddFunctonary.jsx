import * as React from "react";
import { useState } from "react";
import { create } from "zustand";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import Divider from "@mui/material/Divider";

const useFormStore = create((set) => ({
  formData: {
    id: "",
    name: "",
    middleName: "",
    lastName: "",
    lastName2: "",
    birthDate: "2000-01-01",
    gender: "",
    address: "",
    degree: "",
    position: "",
    yearsService: 0,
    specialty: "",
    professionalGroup: "",
    phoneNumber: "",
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
        degree: "",
        position: "",
        yearsService: 0,
        specialty: "",
        professionalGroup: "",
        phoneNumber: "",
      },
    })),
}));

function AddFunctonary({reset, setReset}) {
  
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
      degree,
      position,
      yearsService,
      specialty,
      professionalGroup,
      phoneNumber,
      ...rest
    } = formData;
    try {

      await api.post("/functionaries", {
        ...rest,
        Functionary: {
          degree,
          position,
          yearsService,
          specialty,
          professionalGroup,
          phoneNumber,
        },
      });

      resetFormData();
      setError({
        error: false,
        validations: [],
      });
      setSnackbar({
        children: "Funcionario Agregado con exito!",
        severity: "success",
      });
        setReset(!reset);
    } catch (err) {
        console.log(formData);
      setSnackbar({
        children: "Error al agregar el Funcionario!",
        severity: "error",
      });
      setError({
        error: true,
        validations: [...err.response.data.unmetValidations],
      });
      console.log("Error al agregar el Funcionario:", err);
    }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Agregar Funcionario</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{ mt: 2 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Typography variant="h6" gutterBottom margin={1}>
              Información Personal
            </Typography>
            <Grid container spacing={2} margin={1}>
              <Grid item={"true"} xs={12}>
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
              <Grid item={"true"} xs={12} sm={6}>
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
              <Grid item={"true"} xs={12} sm={6}>
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
              <Grid item={"true"} xs={12} sm={6}>
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
              <Grid item={"true"} xs={12} sm={6}>
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
              <Grid item={"true"} xs={12}>
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

              <Grid item={"true"} xs={12}>
                <FormLabel id="gender">Genero</FormLabel>
                <RadioGroup
                  aria-labelledby="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="Masculino"
                  />
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Femenino"
                  />
                </RadioGroup>
              </Grid>

              <Grid item={"true"} xs={12}>
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
            </Grid>

            <Divider variant="fullWidth" orientation="horizontal" />
            <Typography variant="h6" gutterBottom margin={1}>
              Información Laboral
            </Typography>
            <Grid container spacing={2} margin={1}>
              <Grid item={"true"} xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={
                    (formData.degree === "" ||
                      error.validations.some(
                        (validation) => validation.field === "degree"
                      )) &&
                    error.error
                  }
                  type="text"
                  name="degree"
                  value={formData.degree}
                  label="Titulación"
                  helperText={
                    formData.degree === "" ||
                    error.validations.some(
                      (validation) => validation.field === "degree"
                    )
                      ? error.validations.find(
                          (validation) => validation.field === "degree"
                        )?.message
                      : "Agregar Titulación"
                  }
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item={"true"} xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={
                    (formData.position === "" ||
                      error.validations.some(
                        (validation) => validation.field === "position"
                      )) &&
                    error.error
                  }
                  type="text"
                  name="position"
                  value={formData.position}
                  label="Posición"
                  helperText={
                    formData.position === "" ||
                    error.validations.some(
                      (validation) => validation.field === "position"
                    )
                      ? error.validations.find(
                          (validation) => validation.field === "position"
                        )?.message
                      : "Agregar Posición"
                  }
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item={"true"} xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={
                    (formData.specialty === "" ||
                      error.validations.some(
                        (validation) => validation.field === "specialty"
                      )) &&
                    error.error
                  }
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  label="Especialidad"
                  helperText={
                    formData.specialty === "" ||
                    error.validations.some(
                      (validation) => validation.field === "specialty"
                    )
                      ? error.validations.find(
                          (validation) => validation.field === "specialty"
                        )?.message
                      : "Agregar Especialidad"
                  }
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item={"true"} xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  error={
                    (formData.professionalGroup === "" ||
                      error.validations.some(
                        (validation) => validation.field === "professionalGroup"
                      )) &&
                    error.error
                  }
                  type="text"
                  name="professionalGroup"
                  value={formData.professionalGroup}
                  label="Grupo Profesional"
                  helperText={
                    formData.professionalGroup === "" ||
                    error.validations.some(
                      (validation) => validation.field === "professionalGroup"
                    )
                      ? error.validations.find(
                          (validation) =>
                            validation.field === "professionalGroup"
                        )?.message
                      : "Agregar Grupo Profesional"
                  }
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item={"true"} xs={12} sm={6}>
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
                  label="Numero de Telefono"
                  helperText={
                    formData.phoneNumber === "" ||
                    error.validations.some(
                      (validation) => validation.field === "phoneNumber"
                    )
                      ? error.validations.find(
                          (validation) => validation.field === "phoneNumber"
                        )?.message
                      : "Agregar Numero de Telefono"
                  }
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item={"true"} xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={
                    (formData.yearsService === 0 ||
                      error.validations.some(
                        (validation) => validation.field === "yearsService"
                      )) &&
                    error.error
                  }
                  type="number"
                  name="yearsService"
                  value={formData.yearsService}
                  label="Años de Servicio"
                  helperText={
                    formData.yearsService === 0 ||
                    error.validations.some(
                      (validation) => validation.field === "yearsService"
                    )
                      ? error.validations.find(
                          (validation) => validation.field === "yearsService"
                        )?.message
                      : "Agregar Años de Servicio"
                  }
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" fullWidth>
              Agregar Funcionario
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

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

export default AddFunctonary;
