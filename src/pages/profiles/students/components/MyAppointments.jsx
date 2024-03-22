import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useUserStore from "../../../../stores/users/userStore";

const AppointmentCards = ({
    appointments,
    reset,
    setReset,
    api,
    user = null,
}) => {
    const handleRequestAppointment = async (appointmentId) => {
        try {
            const response = await api.put(`/appointments/${appointmentId}`, {
                studentId: user?.user?.Person?.Student?.studentId,
                status: "booked"
            });
            console.log(response.data);
            setReset(!reset);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelAppointment = async (appointmentId) => {
        try {
            const response = await api.put(`/appointments/${appointmentId}`, {
                studentId: null,
                status: "available"
            });
            console.log(response.data);
            setReset(!reset);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container spacing={2} paddingX={2}>
            {appointments.map((appointment) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={appointment.AppointmentId}
                >
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" component="h2">
                                Maestr
                                {appointment?.Functionary?.Person?.gender ===
                                "M"
                                    ? "o"
                                    : "a"}
                                :{" "}
                                {appointment.Functionary.Person.name +
                                    " " +
                                    appointment.Functionary.Person.lastName}
                            </Typography>
                            <Typography variant="body1">
                                {appointment.description}
                            </Typography>
                            <Typography variant="body2">
                                -Lugar: {appointment.location}
                            </Typography>
                            <Typography variant="body2">
                                -Fecha: {appointment.date}
                            </Typography>
                            <Typography variant="body2">
                                -Hora: {appointment.hour}
                            </Typography>
                            <Typography variant="body2">
                                -Duración: {appointment.duration}min
                            </Typography>
                            {appointment?.studentId === null ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        handleRequestAppointment(
                                            appointment.AppointmentId
                                        )
                                    }
                                >
                                    Solicitar Cita
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        handleCancelAppointment(
                                            appointment.AppointmentId
                                        )
                                    }
                                >
                                    Cancelar cita
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

const MyAppointments = () => {
    const api = useAxiosPrivate();
    const user = useUserStore((state) => state.user);
    const [appointments, setAppointments] = useState([]);
    const [myAppointments, setMyAppointments] = useState([]);
    const [reset, setReset] = useState(false);

    const [snackbar, setSnackbar] = useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const response = await api.get("/appointments");
                const myAppointments = await api.get(
                    `/appointments/${user?.user?.Person?.Student?.studentId}`
                );
                setAppointments(response.data);
                setMyAppointments(myAppointments.data);

                console.log(myAppointments.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getAppointments();
    }, [api, user?.user?.Person?.Student?.studentId, reset]);

    return (
        <div className="pt-2 mt-2">
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
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" component="h1" margin={2}>
                        Mis Citas
                    </Typography>
                    {myAppointments.length !== 0 ? (
                        <AppointmentCards
                            appointments={myAppointments}
                            reset={reset}
                            setReset={setReset}
                            api={api}
                            user={user}
                        />
                    ) : (
                        <Typography variant="h6" component="h2" margin={2}>
                            No tienes citas agendadas
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" component="h1" margin={2}>
                        Citas disponibles
                    </Typography>
                    {appointments.length !== 0 ? (
                        <AppointmentCards
                            appointments={appointments}
                            reset={reset}
                            setReset={setReset}
                            api={api}
                            user={user}
                        />
                    ) : (
                        <Typography variant="h6" component="h2" margin={2}>
                            No hay citas disponibles
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default MyAppointments;
