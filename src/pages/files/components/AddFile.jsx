import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useUserStore } from "../../../stores/users/userStore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function AddFile() {
    const api = useAxiosPrivate();
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState([]);
    const userStore = useUserStore((state) => state.user);

    const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const reponse = await api.get("/groups");
                const data = reponse.data;
                setSections(data);
                console.log(userStore.user.personId);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSections();
    }, [api]);

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            console.log(userStore.user.personId);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("functionaryId", userStore.user.personId);
            formData.append("section", `["${selectedSection}"]`);

            console.log(formData.get("file"));
            console.log(formData.get("functionaryId"));
            console.log(formData.get("section"));

            const response = await api.post(
                "/files",
                {
                    functionaryId: formData.get("functionaryId"),
                    section: formData.get("section"),
                    file: formData.get("file"),
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Manejar la respuesta de la API después de subir el archivo
            setSnackbar({
                children: "Archivo Subido con exito!",
                severity: "success",
              });
            window.location.reload();
            console.log(response.data.message); // Esto debería imprimir "Archivo subido correctamente" si la subida es exitosa
        } catch (error) {
            setSnackbar({
                children: "Error al subir el Archivo!, intentelo de nuevo",
                severity: "error",
              });
            console.error(error);
        }
    };

    return (
        <>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Subir Archivo</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Box
                        component="form"
                        sx={{ mt: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Seleccione una sección para subir el archivo"
                                    value={selectedSection}
                                    onChange={(e) =>
                                        setSelectedSection(e.target.value)
                                    }
                                >
                                    {sections.map((section) => (
                                        <MenuItem
                                            key={section.section}
                                            value={section.section}
                                        >
                                            {section.section}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className="">
                                    <input
                                        className=""
                                        type="file"
                                        onChange={handleFileChange}
                                    />

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleUpload}
                                    >
                                        Subir Archivo
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
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

export default AddFile;
