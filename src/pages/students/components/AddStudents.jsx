import { useState, useEffect } from "react";
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
import { useFormStore as useFormCarevigerStore } from "./AddCaregiver";
import AddCaregiver from "./AddCaregiver";
import Checkbox from "@mui/material/Checkbox";

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
      caregiverId: "",
      allergies: "",
      healthObservations: "",
      accommodation: "",
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
          caregiverId: "",
          allergies: "",
          healthObservations: "",
          accommodation: "",
        },
      })),
  }));

function AddStudents() {
    const api = useAxiosPrivate();
    const { formData, setFormData, resetFormData } = useFormStore();
    const [error, setError] = useState({
        error: false,
        validations: [],
    });

    const caregiver = useFormCarevigerStore((state) => state.formData);

    const [snackbar, setSnackbar] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        if (caregiver.id !== undefined || caregiver.id !== "") {
            setFormData({ caregiverId: caregiver.id });
        }
    }, [caregiver.id, setFormData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {
            caregiverId,
            allergies,
            healthObservations,
            accommodation,
            ...rest
        } = formData;
        try {
            console.log(formData);
            await api.post("/students", {
                ...rest,
                Student: {
                    caregiverId,
                    allergies,
                    healthObservations,
                    accommodation,
                },
            });

            resetFormData();
            setError({
                error: false,
                validations: [],
            });

            setSnackbar({
                children: "Estudiante Agregado con exito!",
                severity: "success",
            });
            window.location.reload();
        } catch (err) {
            console.log(formData);
            setSnackbar({
                children: "Error al agregar el Estudiante!",
                severity: "error",
            });
            setError({
                error: true,
                validations: [...err.response.data.unmetValidations],
            });
            console.log("Error al agregar el Estudiante:", err);
        }
    };

    const [showAddEncargado, setshowAddEncargado] = useState(false);

    const handleCheckboxChange = (event) => {
        setshowAddEncargado(event.target.checked);
    };

    return (
        <>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Agregar Estudiante</Typography>
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
                            Información del Estudiante
                        </Typography>

                        <Grid container spacing={2} margin={1}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={
                                        (formData.id === "" ||
                                            error.validations.some(
                                                (validation) =>
                                                    validation.field === "id"
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
                                            (validation) =>
                                                validation.field === "id"
                                        )
                                            ? error.validations.find(
                                                  (validation) =>
                                                      validation.field === "id"
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
                                                (validation) =>
                                                    validation.field === "name"
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
                                            (validation) =>
                                                validation.field === "name"
                                        )
                                            ? error.validations.find(
                                                  (validation) =>
                                                      validation.field ===
                                                      "name"
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
                                                (validation) =>
                                                    validation.field ===
                                                    "middleName"
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
                                            (validation) =>
                                                validation.field ===
                                                "middleName"
                                        )
                                            ? error.validations.find(
                                                  (validation) =>
                                                      validation.field ===
                                                      "middleName"
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
                                                (validation) =>
                                                    validation.field ===
                                                    "lastName"
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
                                            (validation) =>
                                                validation.field === "lastName"
                                        )
                                            ? error.validations.find(
                                                  (validation) =>
                                                      validation.field ===
                                                      "lastName"
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
                                                (validation) =>
                                                    validation.field ===
                                                    "lastName2"
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
                                            (validation) =>
                                                validation.field === "lastName2"
                                        )
                                            ? error.validations.find(
                                                  (validation) =>
                                                      validation.field ===
                                                      "lastName2"
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
                                                (validation) =>
                                                    validation.field ===
                                                    "birthDate"
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
                                            (validation) =>
                                                validation.field === "birthDate"
                                        )
                                            ? error.validations.find(
                                                  (validation) =>
                                                      validation.field ===
                                                      "birthDate"
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

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={
                                        (formData.address === "" ||
                                            error.validations.some(
                                                (validation) =>
                                                    validation.field ===
                                                    "address"
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
                                            (validation) =>
                                                validation.field === "address"
                                        )
                                            ? error.validations.find(
                                                  (validation) =>
                                                      validation.field ===
                                                      "address"
                                              )?.message
                                            : "Agregar Dirección"
                                    }
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={
                                        (formData.caregiverId === "" ||
                                            error.validations.some(
                                                (validation) =>
                                                    validation.field ===
                                                    "caregiverId"
                                            )) &&
                                        error.error
                                    }
                                    type="text"
                                    name="caregiverId"
                                    value={formData.caregiverId}
                                    label="Cedula del Encargado"
                                    variant="outlined"
                                    helperText={
                                        formData.userName === "" ||
                                        error.validations.some(
                                            (validation) =>
                                                validation.field ===
                                                "caregiverId"
                                        )
                                            ? error.validations.find(
                                                  (validation) =>
                                                      validation.field ===
                                                      "caregiverId"
                                              )?.message
                                            : "Agregar Cedula del Encargado"
                                    }
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    name="allergies"
                                    value={formData.allergies}
                                    label="Alergias o padecimientos del estudiante"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    name="healthObservations"
                                    value={formData.healthObservations}
                                    label="Observaciones de Salud"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    type="text"
                                    name="accommodation"
                                    value={formData.accommodation}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="">Tipo de Educación</option>
                                    <option value="regular">Regular</option>
                                    <option value="especial">Especial</option>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={showAddEncargado}
                                            onChange={handleCheckboxChange}
                                            color="primary"
                                        />
                                    }
                                    label="Agregar Encargado"
                                />
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="contained" fullWidth>
                            Agregar Estudiante
                        </Button>
                    </Box>

                    {showAddEncargado && (
                        <Grid item xs={12}>
                            <AddCaregiver />
                        </Grid>
                    )}
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

export default AddStudents;
