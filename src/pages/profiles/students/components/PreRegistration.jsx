import { useEffect, useState } from "react";
import { useUserStore } from "../../../../stores";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PreRegistration = () => {
    const api = useAxiosPrivate();
    const user = useUserStore((state) => state.user);
    const [snackbar, setSnackbar] = useState(null);
    const [showForm, setShowForm] = useState(true);
    const [preRegistrations, setPreRegistrations] = useState([]);
    const [reset, setReset] = useState(false);

    const gradeMap = {
        materno: "transición",
        transición: "primero",
        primero: "segundo",
        segundo: "tercero",
        tercero: "cuarto",
        cuarto: "quinto",
        quinto: "sexto",
    };

    const statusTranslationMap = {
        pending: "Pendiente",
        approved: "Aprobado",
        rejected: "Rechazado",
    };

    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        const fetchPreRegistrations = async () => {
            try {
                const response = await api.get(
                    `/preRegistrations/${user.user.Person.Student.studentId}`
                );
                const responseState = await api.get(
                    "/preregistrationPeriods/state"
                );
                setPreRegistrations(response.data);

                response.data.map((preRegistration) => {
                    if (
                        preRegistration.status === "pending" ||
                        responseState.data.active === false
                    )
                        setShowForm(false);
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchPreRegistrations();
    }, [api, user.user.Person.Student.studentId, reset]);

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/preRegistrations", {
                studentId: user.user.Person.Student.studentId,
                grade: gradeMap[user.user.Person.Student.Group.grade],
            });
            setSnackbar({
                children: "Nota Agregada con exito!",
                severity: "success",
            });
            setReset(!reset);
        } catch (err) {
            setSnackbar({
                children: "Error al agregar la prematricula",
                severity: "error",
            });
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full mt-3">
            <div className="container flex items-center justify-center w-full h-full bg-gray-50">
                {showForm && (
                    <Box
                        component="form"
                        sx={{
                            mt: 1,
                            padding: 2,
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <Typography variant="h5" gutterBottom margin={1}>
                            Formulario de Prematricula
                        </Typography>
                        <Typography variant="body2" gutterBottom margin={1}>
                            Por favor verifique la Cédula del estudiante para
                            realizar la prematrícula
                        </Typography>
                        <Typography variant="body2" gutterBottom margin={1}>
                            si la cédula no es correcta, por favor comuniquese
                            con la institución.
                        </Typography>
                        <Grid container spacing={2} margin={1}>
                            <Grid item="true" xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="text"
                                    name="studentId"
                                    value={user.user.Person.id}
                                    label="Cedula"
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid item="true" xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    type="text"
                                    name="grade"
                                    value={
                                        gradeMap[
                                            user.user.Person.Student.Group.grade
                                        ]
                                    }
                                    label="Grado"
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="contained" fullWidth>
                            Agregar Estudiante
                        </Button>
                    </Box>
                )}

                {!showForm && (
                    <Box
                        component="form"
                        sx={{
                            mt: 1,
                            padding: 2,
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <Card
                            sx={{
                                width: "100%",
                                marginRight: "1rem",
                                padding: "1rem",
                                "@media (min-width: 768px)": {
                                    // Aplicar estilos específicos para escritorio
                                    width: 375,
                                    marginBottom: "9.1rem",
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{
                                        fontSize: "1.1rem",
                                        "@media (min-width: 768px)": {
                                            fontSize: "2.5rem",
                                        },
                                    }}
                                >
                                    Prematriculas Realizadas
                                </Typography>
                                {preRegistrations.map(
                                    (preregistration, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-col w-full h-full mt-3 p-5 ${
                                                preregistration.status ===
                                                "approved"
                                                    ? "bg-green-200"
                                                    : preregistration.status ===
                                                      "rejected"
                                                    ? "bg-red-200"
                                                    : "bg-gray-200"
                                            }`}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    "@media (min-width: 768px)":
                                                        { fontSize: "1.5rem" },
                                                }}
                                            >
                                                <b>Para grado:</b>{" "}
                                                {preregistration.grade}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                component="p"
                                                sx={{
                                                    "@media (min-width: 768px)":
                                                        { fontSize: "1.5rem" },
                                                }}
                                            >
                                                <b>estado:</b>{" "}
                                                {
                                                    statusTranslationMap[
                                                        preregistration.status
                                                    ]
                                                }
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                component="p"
                                                sx={{
                                                    "@media (min-width: 768px)":
                                                        { fontSize: "1.5rem" },
                                                }}
                                            >
                                                <b>Fecha de envio:</b>{" "}
                                                {formatDate(
                                                    preregistration.createdAt
                                                )}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                component="p"
                                                sx={{
                                                    "@media (min-width: 768px)":
                                                        { fontSize: "1.5rem" },
                                                }}
                                            >
                                                {preregistration.updatedAt !==
                                                preregistration.createdAt ? (
                                                    <b>
                                                        Fecha de revisión:{" "}
                                                        {formatDate(
                                                            preregistration.updatedAt
                                                        )}{" "}
                                                    </b>
                                                ) : (
                                                    <b>No ha sido revisado</b>
                                                )}
                                            </Typography>
                                        </div>
                                    )
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </div>
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
    );
};

export default PreRegistration;
