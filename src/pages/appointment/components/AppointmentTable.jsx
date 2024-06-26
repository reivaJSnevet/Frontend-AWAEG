import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
    DataGrid,
    esES,
    GridToolbar,
    GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useUserStore } from "../../../stores";

const AppointmentCards = ({ reset, setReset }) => {
    const [appointments, setAppointments] = useState([]);
    const api = useAxiosPrivate();
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get(
                    `appointments/functionary/${user?.user?.Person?.Functionary?.functionaryId}`
                );
                setAppointments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAppointments();
    }, [api, reset, user]);


    const handleCancelAppointment = async (appointmentId, email) => {
        try {
            const response = await api.put(`/appointments/${appointmentId}`, {
                studentId: null,
                status: "cancelled",
                email: email,
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
                                Cita solicitada Estudiante:
                                {appointment.Student.Person.name +
                                    " " +
                                    appointment.Student.Person.lastName}
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
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    handleCancelAppointment(
                                        appointment.AppointmentId,
                                        appointment?.Student?.Person?.User?.email
                                    )
                                }
                            >
                                Cancelar cita
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

function AppointmentTable({ reset, setReset }) {
    const [appointments, setAppointments] = useState([]);
    const api = useAxiosPrivate();
    const pageSize = 5;
    const sizeOptions = [5, 10, 15];

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const isBetween0800And1500 = (value) => {
        if (value < "08:00" || value > "15:00") {
            setSnackbar({
                children:
                    "La hora de la cita debe estar entre las 08:00 y las 15:00",
                severity: "warning",
            });
        }
    };

    const statusTranslations = {
        available: "Disponible",
        booked: "Reservado",
        cancelled: "Cancelado",
        completed: "Completado",
        expired: "Caducado",
    };

    const [snackbar, setSnackbar] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get("/appointments");
                setAppointments(response.data);
            } catch (error) {
                setSnackbar({
                    children: "Error al cargar las citas",
                    severity: "error",
                });
            }
        };
        fetchAppointments();
    }, [api, reset]);

    const columns = [
        {
            field: "date",
            headerName: "Fecha",
            flex: 1,
        },
        {
            field: "hour",
            headerName: "Hora",
            flex: 1,
        },
        {
            field: "duration",
            headerName: "Duración",
            flex: 1,
            renderCell: (params) => {
                return <div>{params.row.duration} minutos</div>;
            },
        },
        {
            field: "location",
            headerName: "Ubicación",
            flex: 1,
        },
        {
            field: "description",
            headerName: "Descripción",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Estado",
            flex: 1,
            valueGetter: (params) => {
                return statusTranslations[params.row.status];
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Acciones",
            flex: 1,
            cellClassName: "actions",
            renderCell: (params) => {
                return (
                    <div>
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Eliminar"
                            onClick={() => {
                                setDeleteId(params.row.AppointmentId);
                                handleClickOpen();
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const csvOptions = {
        delimiter: ";",
        fileName: "Lista de Citas",
        includeHeaders: true,
        utf8WithBom: true,
    };

    const printOptions = {
        fileName: "Lista de Citas",
        hideFooter: true,
        hideToolbar: true,
        pageStyle:
            ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
    };

    //Delete

    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/appointments/${deleteId}`);
            setReset(!reset);
            setSnackbar({
                children: "Cita eliminada correctamente",
                severity: "success",
            });
            handleClose();
        } catch (error) {
            setSnackbar({
                children: "Error al eliminar la cita",
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
                    autoHideDuration={2000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}

            <DataGrid
                sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: "transparent",
                    "& .MuiDataGrid-cell:hover": {
                        color: "primary.main",
                    },
                }}
                style={{ height: 500, width: "100%" }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={appointments}
                getRowId={(row) => row.AppointmentId}
                loading={appointments.length === 0}
                columns={columns}
                editMode="row"
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        csvOptions,
                        printOptions,
                    },
                }}
                disableSelectionOnClick
                pageSize={pageSize}
                rowsPerPageOptions={pageSize}
                initialState={{
                    ...appointments.initialState,
                    pagination: { paginationModel: { pageSize } },
                }}
                pageSizeOptions={sizeOptions}
            />

            <div className="m-4 ">
                <AppointmentCards reset={reset} setReset={setReset} />
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Eliminar Cita"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estas seguro que deseas eliminar la cita?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AppointmentTable;
