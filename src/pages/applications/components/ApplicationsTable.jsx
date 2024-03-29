import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import InfoIcon from "@mui/icons-material/Info";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
    DataGrid,
    GridToolbar,
    esES,
    GridActionsCellItem,
} from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useUserStore } from "../../../stores";
import Switch from "@mui/material/Switch";

function ApplicationsTable() {
    const user = useUserStore((state) => state.user);
    const [preregisterState, setPreregisterState] = useState(false);
    const [files, setFiles] = useState([]);
    const [preRegister, setPreRegister] = useState([]);
    const [loans, setLoans] = useState([]);
    const [reset, setReset] = useState(false);

    const pageSize = 5;
    const sizeOptions = [5, 10];

    const api = useAxiosPrivate();

    const [snackbar, setSnackbar] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get("/applications");
                const separatedArrays = response.data.reduce(
                    (acc, application) => {
                        const type = application.type;
                        if (!acc[type]) {
                            acc[type] = [];
                        }
                        acc[type].push(application);
                        return acc;
                    },
                    {}
                );
                setFiles(separatedArrays["file"] || []);
                setPreRegister(separatedArrays["preregistration"] || []);
                setLoans(separatedArrays["loan"] || []);
            } catch (error) {
                console.log(error);
                setSnackbar({
                    message: "Error fetching applications",
                    severity: "error",
                });
            }
        };

        const fetchPremaState = async () => {
            try {
                const response = await api.get( "/preregistrationPeriods/state");
                setPreregisterState(response.data.active);
            } catch (error) {
                console.error("Error fetching preRegistrations", error.message);
            }
        };

        fetchPremaState();
        fetchApplications();
    }, [api, reset]);

    const columns = [
        {
            field: "applicationId",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Estatus",
            flex: 1,
            valueGetter: (params) => {
                const value = params.row.status;
                return value === "pending"
                    ? "Pendiente"
                    : value === "approved"
                    ? "Aceptada"
                    : "Rechazada";
            },
        },
        {
            field: "type",
            headerName: "Tipo",
            flex: 1,
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
                            icon={<InfoIcon />}
                            label="Detalles"
                            onClick={() => {
                                if (params.row.type === "file") {
                                    handleDetailsFiles(params.row);
                                }
                                if (params.row.type === "preregistration") {
                                    handleDetailsPreRegister(params.row);
                                }
                                if (params.row.type === "loan") {
                                    handleDetailsLoan(params.row);
                                }
                            }}
                        />
                        <GridActionsCellItem
                            icon={<CheckIcon />}
                            label="Aceptar"
                            onClick={() => {
                                handleApprove(params.row);
                            }}
                        />
                        <GridActionsCellItem
                            icon={<CloseIcon />}
                            label="Eliminar"
                            onClick={() => {
                                handleReject(params.row);
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const csvOptions = {
        delimiter: ",",
        fileName: "applications",
        inlcudeHeaders: true,
        utf8WithBom: true,
    };

    const printOptions = {
        fileName: "applications",
        hideFooter: true,
        hideToolbar: true,
        pageStyle:
            ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
    };

    const handleApprove = async (application) => {
        try {
            await api.put(`/applications/${application.applicationId}`, {
                status: "approved",
                functionaryId: user.user.Person.Functionary.functionaryId,
            });
            if (application.type === "file") {
                await api.put(`/files/${application.File.fileId}`, {
                    active: true,
                });
            }
            if (application.type === "preregistration") {
                await api.put(
                    `/preRegistrations/${application.PreRegistration.preRegistrationId}`,
                    {
                        status: "approved",
                    }
                );
            }
            if (application.type === "loan") {
                await api.put(`/loans/${application.Loan.loanId}`, {
                    status: "APPROVED",
                });
            }

            setSnackbar({
                children: "Solicitud Aceptada con éxito!",
                severity: "success",
            });

            setReset(!reset);
        } catch (error) {
            console.log(error);
            setSnackbar({
                severity: "error",
                children: "Error al aprobar la solicitud",
            });
        }
    };

    const handleReject = async (application) => {
        try {
            await api.put(`/applications/${application.applicationId}`, {
                status: "rejected",
                functionaryId: user.user.Person.Functionary.functionaryId,
            });

            if (application.type === "file") {
                await api.put(`/files/${application.File.fileId}`, {
                    active: false,
                });
            }
            if (application.type === "preregistration") {
                await api.put(
                    `/preRegistrations/${application.PreRegistration.preRegistrationId}`,
                    {
                        status: "rejected",
                    }
                );
            }
            if (application.type === "loan") {
                await api.put(`/loans/${application.Loan.loanId}`, {
                    status: "REJECTED",
                });
            }

            setSnackbar({
                children: "Solicitud Rechazada con éxito!",
                severity: "success",
            });

            setReset(!reset);
        } catch (error) {
            console.log(error);
            setSnackbar({
                severity: "error",
                children: "Error al rechazar la solicitud",
            });
        }
    };

    // modal informacion
    const StyledCard = styled(Card)({
        maxWidth: 400,
        margin: "auto",
        marginBottom: 16,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    });
    const StyledCardContent = styled(CardContent)({
        padding: "16px",
    });

    const Title = styled(Typography)({
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "8px",
    });

    const Detail = styled(Typography)({
        fontSize: "1rem",
        marginBottom: "4px",
    });

    const [openDetails, setOpenDetails] = useState(false);
    const [openDetailsPreRegister, setOpenDetailsPreRegister] = useState(false);
    const [openDetailsLoan, setOpenDetailsLoan] = useState(false);
    const [detailsApplication, setDetailsApplication] = useState({});

    const handleOpenDetails = () => setOpenDetails(true);
    const handleCloseDetails = () => setOpenDetails(false);

    const handleOpenDetailsPreRegister = () => setOpenDetailsPreRegister(true);
    const handleCloseDetailsPreRegister = () =>
        setOpenDetailsPreRegister(false);

    const handleOpenDetailsLoan = () => setOpenDetailsLoan(true);
    const handleCloseDetailsLoan = () => setOpenDetailsLoan(false);

    const handleDetailsFiles = (application) => {
        setDetailsApplication(application);
        handleOpenDetails();
    };

    const handleDetailsPreRegister = (application) => {
        setDetailsApplication(application);
        handleOpenDetailsPreRegister();
    };

    const handleDetailsLoan = (application) => {
        setDetailsApplication(application);
        console.log(application);
        handleOpenDetailsLoan();
    };

    // Descargar archivo

    const handleDownload = async (fileId, originalName) => {
        try {
            const response = await api.get(`/files/${fileId}/download`, {
                responseType: "blob",
            });

            const contentType = response.headers["content-type"];
            const blob = new Blob([response.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", originalName);

            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);

            setSnackbar({
                children: "Archivo descargado correctamente",
                severity: "success",
            });
        } catch (error) {
            setSnackbar({
                children: "Error al descargar el archivo",
                severity: "error",
            });
            console.error("Error downloading file", error.message);
        }
    };

    const handleSwitchChange = async () => {
        try {

            if (!preregisterState) {
                await api.get("preregistrationPeriods/activate");
            }

            if (preregisterState){
                await api.get("preregistrationPeriods/deactivate");
            }

            setPreregisterState(!preregisterState);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="p-10 mb-10">
                <Typography variant="h4" component="h2" p={1}>
                    Archivos
                </Typography>
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
                    localeText={
                        esES.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={files}
                    getRowId={(row) => row.applicationId}
                    loading={files.length === 0}
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
                        ...files.initialState,
                        pagination: { paginationModel: { pageSize } },
                    }}
                    pageSizeOptions={sizeOptions}
                />
            </div>
            <div className="p-10 mb-10">
            <Typography variant="h4" component="h2" p={1}>
                    Pre-Matricula
                </Typography>Período de prematrícula:
                <Switch
                    checked={preregisterState}
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    size="medium"
                /> 
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
                    localeText={
                        esES.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={preRegister}
                    getRowId={(row) => row.applicationId}
                    loading={preRegister.length === 0}
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
                        ...preRegister.initialState,
                        pagination: { paginationModel: { pageSize } },
                    }}
                    pageSizeOptions={sizeOptions}
                />
            </div>
            <div className="p-10 mb-10">
                <Typography variant="h4" component="h2" p={1}>
                    Préstamos
                </Typography>
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
                    localeText={
                        esES.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={loans}
                    getRowId={(row) => row.applicationId}
                    loading={loans.length === 0}
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
                        ...loans.initialState,
                        pagination: { paginationModel: { pageSize } },
                    }}
                    pageSizeOptions={sizeOptions}
                />
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

            {/* Detalles Files */}
            <Modal
                open={openDetails}
                onClose={handleCloseDetails}
                aria-labelledby="modal-modal-title"
            >
                <Box>
                    <StyledCard>
                        <StyledCardContent>
                            <Title>Detalles de la solicitud</Title>
                            <Detail>
                                <strong>ID:</strong>{" "}
                                {detailsApplication.applicationId}
                            </Detail>
                            <Detail>
                                <strong>Estatus:</strong>{" "}
                                {detailsApplication.status === "pending"
                                    ? "Pendiente"
                                    : detailsApplication.status === "approved"
                                    ? "Aceptada"
                                    : "Rechazada"}
                            </Detail>
                            <Detail>
                                <strong>Nombre del archivo:</strong>{" "}
                                {detailsApplication?.File?.originalName || ""}
                            </Detail>
                            <Detail>
                                <strong>Tipo:</strong> {detailsApplication.type}
                            </Detail>

                            <Detail>
                                <strong>Solicitado por:</strong>{" "}
                                {detailsApplication?.File?.Functionary?.Person
                                    .name +
                                    " " +
                                    detailsApplication?.File?.Functionary
                                        ?.Person.lastName +
                                    " " +
                                    detailsApplication?.File?.Functionary
                                        ?.Person.lastName2}
                            </Detail>
                            <Button
                                onClick={() => {
                                    handleDownload(
                                        detailsApplication.File.fileId,
                                        detailsApplication.File.originalName
                                    );
                                }}
                            >
                                {" "}
                                Descargar archivo
                            </Button>
                        </StyledCardContent>
                    </StyledCard>
                </Box>
            </Modal>

            {/* Detalles Pre-Register */}
            <Modal
                open={openDetailsPreRegister}
                onClose={handleCloseDetailsPreRegister}
                aria-labelledby="modal-modal-title"
            >
                <Box>
                    <StyledCard>
                        <StyledCardContent>
                            <Title>Detalles de la solicitud</Title>
                            <Detail>
                                <strong>ID: </strong>{" "}
                                {detailsApplication.applicationId}
                            </Detail>
                            <Detail>
                                <strong>Estatus: </strong>{" "}
                                {detailsApplication.status === "pending"
                                    ? "Pendiente"
                                    : detailsApplication.status === "approved"
                                    ? "Aceptada"
                                    : "Rechazada"}
                            </Detail>
                            <Detail>
                                <strong>Tipo: </strong>{" "}
                                {detailsApplication.type}
                            </Detail>

                            <Detail>
                                <strong>Estudiante: </strong>{" "}
                                {detailsApplication?.PreRegistration?.Student
                                    ?.Person.name +
                                    " " +
                                    detailsApplication?.PreRegistration?.Student
                                        ?.Person.lastName +
                                    " " +
                                    detailsApplication?.PreRegistration?.Student
                                        ?.Person.lastName2}
                            </Detail>

                            <Detail>
                                <strong>Encargado: </strong>{" "}
                                {detailsApplication?.PreRegistration?.Student
                                    ?.Caregiver.Person.name +
                                    " " +
                                    detailsApplication?.PreRegistration?.Student
                                        ?.Caregiver.Person.lastName +
                                    " " +
                                    detailsApplication?.PreRegistration?.Student
                                        ?.Caregiver.Person.lastName2}
                            </Detail>

                            <Detail>
                                <strong>Grado: </strong>
                                {detailsApplication?.PreRegistration?.grade ||
                                    "Sin Datos"}
                            </Detail>

                            <Detail>
                                <strong>Ciclo: </strong>
                                {detailsApplication?.PreRegistration?.cycle ||
                                    "Sin Datos"}
                            </Detail>

                            <Detail>
                                <strong>Anterior sección: </strong>
                                {detailsApplication?.PreRegistration?.Student.section || "Sin asignar"}
                            </Detail>
                        </StyledCardContent>
                    </StyledCard>
                </Box>
            </Modal>

            {/* Detalles Loan */}
            <Modal
                open={openDetailsLoan}
                onClose={handleCloseDetailsLoan}
                aria-labelledby="modal-modal-title"
            >
                <Box>
                    <StyledCard>
                        <StyledCardContent>
                            <Title>Detalles de la solicitud</Title>
                            <Detail>
                                <strong>ID:</strong>{" "}
                                {detailsApplication?.applicationId}
                            </Detail>
                            <Detail>
                                <strong>Estatus:</strong>{" "}
                                {detailsApplication?.status === "pending"
                                    ? "Pendiente"
                                    : detailsApplication?.status === "approved"
                                    ? "Aceptada"
                                    : "Rechazada"}
                            </Detail>
                            <Detail>
                                <strong>Tipo:</strong> {detailsApplication?.type}
                            </Detail>
                            <Detail>
                                <strong>Fechas solicitadas:</strong> {"'"+detailsApplication?.Loan?.loanDate+"'"} al {"'"+detailsApplication?.Loan?.deadLine+"'"}
                            </Detail>
                            <Detail>
                                <strong>Funcionario:</strong> {detailsApplication?.Loan?.Debtor?.name + " " + detailsApplication?.Loan?.Debtor?.lastName + " " + detailsApplication?.Loan?.Debtor?.lastName2}
                            </Detail>
                            <Detail>
                                <strong>Artículo solicitado:</strong> {detailsApplication?.Loan?.Supplies[0]?.name}
                            </Detail>
                        </StyledCardContent>
                    </StyledCard>
                </Box>
            </Modal>
        </>
    );
}

export default ApplicationsTable;