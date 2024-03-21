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
import Grid from "@mui/system/Unstable_Grid";

const useFormStore = create((set) => ({
  formData: {
    section: "",
    grade: "",
    classRoom: "",
    shift: "",
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: () =>
    set(() => ({
      formData: {
        section: "",
        grade: "",
        classRoom: "",
        shift: "",
      },
    })),
}));

function AddClases({ reset, setReset}) {
  const api = useAxiosPrivate();
  const { formData, setFormData, resetFormData } = useFormStore();
  const [error, setError] = useState({
    error: false,
    validations: [],
  });

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      await api.post("/groups", formData);
      resetFormData();
      setError({
        error: false,
        validations: [],
      });
      setSnackbar({
        children: "Grupo Agregado con exito!",
        severity: "success",
      });
        setReset(!reset);
    } catch (err) {
      console.log(formData);
      setSnackbar({
        children: `Error al agregar el Grupo! ${err.response.data.message ?? ""}`,
        severity: "error",
      });
      setError({
        error: true,
        validations: [...err.response.data.unmetValidations],
      });
      console.log("Error al agregar el Grupo:", err);
    }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Agregar Grupo</Typography>
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
              Información del Grupo
            </Typography>

            <Grid container spacing={2} margin={1}>
              <Grid xs={12}>
                <TextField
                  required
                  fullWidth
                  error={
                    (formData.section === "" ||
                      error.validations.some(
                        (validation) => validation.field === "section"
                      )) &&
                    error.error
                  }
                  type="text"
                  name="section"
                  value={formData.section}
                  label="Agregar nombre de sección"
                  variant="outlined"
                  helperText={
                    formData.userName === "" ||
                    error.validations.some(
                      (validation) => validation.field === "section"
                    )
                      ? error.validations.find(
                          (validation) => validation.field === "section"
                        )?.message
                      : "Agregar nombre de sección"
                  }
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid  xs={12}>
                <TextField
                  required
                  select
                  fullWidth
                  error={
                    (formData.grade === "" ||
                      error.validations.some(
                        (validation) => validation.field === "grade"
                      )) &&
                    error.error
                  }
                  type="text"
                  name="grade"
                  value={formData.grade}
                  variant="outlined"
                  onChange={handleInputChange}
                  SelectProps={{ native: true }}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="materno">Materno</option>
                  <option value="transición">Transición</option>
                  <option value="primero">Primero</option>
                  <option value="segundo">Segundo</option>
                  <option value="tercero">Tercero</option>
                  <option value="cuarto">Cuarto</option>
                  <option value="quinto">Quinto</option>
                  <option value="sexto">Sexto</option>
                </TextField>
              </Grid>

              <Grid  xs={12}>
                <TextField
                  required
                  fullWidth
                  error={
                    (formData.classRoom === "" ||
                      error.validations.some(
                        (validation) => validation.field === "classRoom"
                      )) &&
                    error.error
                  }
                  type="text"
                  name="classRoom"
                  value={formData.classRoom}
                  label="Agregar Aula"
                  variant="outlined"
                  helperText={
                    formData.userName === "" ||
                    error.validations.some(
                      (validation) => validation.field === "classRoom"
                    )
                      ? error.validations.find(
                          (validation) => validation.field === "classRoom"
                        )?.message
                      : "Agregar Aula"
                  }
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid  xs={12}>
                <TextField
                  required
                  select
                  fullWidth
                  error={
                    (formData.shift === "" ||
                      error.validations.some(
                        (validation) => validation.field === "shift"
                      )) &&
                    error.error
                  }
                  type="text"
                  name="shift"
                  value={formData.shift}
                  helperText={
                    formData.shift === "" ||
                    error.validations.some(
                      (validation) => validation.field === "shift"
                    )
                      ? error.validations.find(
                          (validation) => validation.field === "shift"
                        )?.message
                      : "Eliga un turno para el grupo"
                  }
                  variant="outlined"
                  onChange={handleInputChange}
                  SelectProps={{ native: true }}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="matutino">Matutino</option>
                  <option value="vespertino">Vespertino</option>
                </TextField>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth>
              Agregar Grupo
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

export default AddClases;
