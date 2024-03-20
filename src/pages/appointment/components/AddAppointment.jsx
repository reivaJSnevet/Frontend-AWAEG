import { useState, useEffect } from "react";
import { create } from "zustand";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import { useUserStore } from "../../../stores";

const useFormStore = create((set) => ({
  formData: {
    date: "",
    hour: "",
    duration: "",
    location: "",
    description: "",
    functionaryId: "",
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: () =>
    set(() => ({
      formData: {
        date: "",
        hour: "",
        duration: "",
        location: "",
        description: "",
        functionaryId: "",
      },
    })),
}));

function AddAppointment() {
  const idFunctionary = useUserStore(
    (state) => state.user.user.Person.Functionary.functionaryId
  );

  const api = useAxiosPrivate();
  const { formData, setFormData, resetFormData } = useFormStore();
  const [error, setError] = useState({
    error: false,
    validations: [],
  });

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/appointments", formData);
      resetFormData();
      setError({
        error: false,
        validations: [],
      });
      setSnackbar({
        children: "Cita creada correctamente",
        severity: "success",
      });
      window.location.reload();
    } catch (error) {
      setError({
        error: true,
        validations: error.response.data,
      });
    }
  };

  const isBetween0800And1500 = (value) => {
    if (value < "08:00" || value > "15:00") {
      setSnackbar({
        children: "La hora de la cita debe estar entre las 08:00 y las 15:00",
        severity: "warning",
      });
    }
  };

  useEffect(() => {
    setFormData({ functionaryId: idFunctionary });
  }, [idFunctionary]);

  return (
    <>
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

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Crear Cita</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            component="form"
            sx={{ mt: 2 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  inputProps={{ min: getCurrentDate() }}
                />
              </Grid>

              <Grid xs={12}>
                <TextField
                  fullWidth
                  name="hour"
                  type="time"
                  value={formData.hour}
                  onChange={(e) => {
                    handleInputChange(e);
                    isBetween0800And1500(e.target.value);
                  }}
                />
              </Grid>

              <Grid xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Duración en minutos"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  SelectProps={{ native: true }}
                >
                  <option> </option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                  <option value="60">60</option>
                </TextField>
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained">
              Crear Cita
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AddAppointment;
