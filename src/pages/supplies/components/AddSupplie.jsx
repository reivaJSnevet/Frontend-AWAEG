import { useState } from "react";
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

const useFormStore = create((set) => ({
  formData: {
    name: "",
    price: "",
    state: "",
    description: "",
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: () =>
    set(() => ({
      formData: {
        name: "",
        price: "",
        state: "",
        description: "",
      },
    })),
}));

function AddSupplie({ reset, setReset}) {
    
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
            await api.post("/supplies", formData);
            resetFormData();
            setError({
                error: false,
                validations: [],
            });
            setSnackbar({
                children: "Insumo agregado con exito",
                severity: "success",
            });
            setReset(!reset);
        } catch (err) {
            setError({
                error: true,
                validations: [...err.response.data.unmetValidations],
            });
            setSnackbar({
                children: "Error al agregar el insumo",
                severity: "error",
            });
        }
    };



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
                <Typography>Agregar Insumo</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Box
                component="form"
                sx={{mt: 2}}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                >
                    <Grid  container spacing={2}>
                        <Grid  xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre del insumo"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                error={error.validations.includes("name")}
                                helperText={
                                    error.validations.includes("name") &&
                                    "El nombre del insumo es requerido"
                                }
                            />
                        </Grid>
                        <Grid  xs={12}>
                            <TextField
                                fullWidth
                                label="Precio"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                error={error.validations.includes("price")}
                                helperText={
                                    error.validations.includes("price") &&
                                    "El precio del insumo es requerido"
                                }
                            />
                        </Grid>
                        <Grid  xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Estado"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                error={error.validations.includes("state")}
                                helperText={
                                    error.validations.includes("state") &&
                                    "El estado del insumo es requerido"
                                }
                                SelectProps={{ native: true }}
                            >
                                <option aria-label="None" value="" />
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </TextField>
                        </Grid>
                        <Grid  xs={12}>
                            <TextField
                                fullWidth
                                label="Descripcion"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                error={error.validations.includes("description")}
                                helperText={
                                    error.validations.includes("description") &&
                                    "La descripcion del insumo es requerida"
                                }
                            />
                        </Grid>
                        <Grid  xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Agregar Insumo
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </AccordionDetails>
        </Accordion>
    </>
  );
}

export default AddSupplie;
