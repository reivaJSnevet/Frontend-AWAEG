import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import * as React from "react";
import {
    DataGrid,
    esES,
    GridToolbar,
    GridActionsCellItem,
} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import { useMediaQuery, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import InfoIcon from "@mui/icons-material/Info";

import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

function ClasesTable() {
    const [clases, setClases] = useState([]);
    const pageSize = 10;
    const sizeOptions = [5, 10, 15];
    const axiosPrivate = useAxiosPrivate();
    const [reset, setReset] = useState(false);

    const [snackbar, setSnackbar] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        const fetchClases = async () => {
            try {
                const response = await axiosPrivate.get("/groups");
                setClases(response.data);
            } catch (error) {
                setSnackbar({
                    children: "Error al obetner los grupos",
                    severity: "error",
                });
            }
        };
        fetchClases();
    }, [axiosPrivate, reset]);

    const columns = [
        {
            field: "section",
            headerName: "Sección",
            flex: 1,
        },
        {
            field: "shift",
            headerName: "Turno",
            flex: 1,
        },
        {
            field: "classRoom",
            headerName: "Aula",
            flex: 1,
        },
        {
            field: "studentCount",
            headerName: "Cantidad de estudiantes",
            flex: 1,
        },
        {
            field: "Functionary",
            headerName: "Profesor",
            flex: 1,
            valueGetter: (params) => {
                if (params.row.Functionary && params.row.Functionary.personId) {
                    return `${params.row.Functionary.personId} - ${
                        params.row.Functionary.Person.name ?? "Profesor"
                    }`;
                } else {
                    return "Sin Profesor asignado";
                }
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
                            icon={<EditIcon />}
                            label="Editar"
                            onClick={() => {
                                setEditClass(params.row);
                                handleOpenModal(true);
                                console.log(editClass);
                            }}
                        />
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Eliminar"
                            onClick={() => {
                                setSection(params.row.section);
                                handleClickOpen();
                            }}
                        />
                        <GridActionsCellItem
                            icon={<InfoIcon />}
                            label="Ver"
                            onClick={() => {
                                handleDetails(params.row);
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const csvOptions = {
        delimiter: ";",
        fileName: "Lista de Clases",
        includeHeaders: true,
        utf8WithBom: true,
    };

    const printOptions = {
        fileName: "Lista de Clases",
        hideFooter: true,
        hideToolbar: true,
        pageStyle:
            ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
    };

    ////Update
    const [openModal, setOpenModal] = useState(false);
    const [editClass, setEditClass] = useState({
        section: "",
        shift: "",
        classRoom: "",
    });

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isSmallScreen ? "90%" : "75%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 1,
        margin: "auto",
        mt: 1,
        maxHeight: "80vh",
        overflowY: "auto",
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosPrivate.put(
                `/groups/${editClass.section}`,
                editClass
            );
            console.log(response);
            setSnackbar({
                children: "Clase actualizado",
                severity: "success",
            });
            setReset(!reset);
        } catch (error) {
            setSnackbar({
                children: "Error al actualizar el Clase",
                severity: "error",
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditClass({ ...editClass, [name]: value });
    };

    ///Delete

    const [open, setOpen] = React.useState(false);
    const [section, setSection] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (section) => {
        try {
            const response = await axiosPrivate.delete(`/groups/${section}`);
            console.log(response);
            setSnackbar({
                children: "Clase eliminado",
                severity: "success",
            });
            setReset(!reset);
        } catch (error) {
            setSnackbar({
                children: "Error al eliminar el Clase",
                severity: "error",
            });
        }
    };

    //Group Details
    const [openModalGroup, setOpenModalGroup] = useState(false);
    const [detailsGroup, setDetailsGroup] = useState({});

    const handleOpenModalGroup = () => setOpenModalGroup(true);
    const handleCloseModalGroup = () => setOpenModalGroup(false);

    const handleDetails = (group) => {
        setDetailsGroup(group);
        handleOpenModalGroup();
    };

    const StyledCard = styled(Card)({
        maxWidth: 400,
        margin: "auto",
        marginBottom: 16,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    });
    const StyledCardContent = styled(CardContent)({
        padding: "16px", // Espaciado interno
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
                rows={clases}
                getRowId={(row) => row.section}
                loading={clases.length === 0}
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
                    ...clases.initialState,
                    pagination: { paginationModel: { pageSize } },
                }}
                pageSizeOptions={sizeOptions}
            />

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
            >
                <Box sx={style} component="form" onSubmit={handleEditSubmit}>
                    <div
                        id="ModalHead"
                        className="flex flex-row justify-between"
                    >
                        <Typography id="modal-modal-title" variant="h6">
                            Actualizar Clase
                        </Typography>
                        <Button onClick={handleCloseModal}>
                            <CancelIcon />
                        </Button>
                    </div>
                    <Grid
                        container
                        sx={{
                            width: "auto",
                        }}
                        spacing={1}
                        margin={1}
                    >
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                disabled
                                type="text"
                                name="section"
                                value={editClass.section}
                                label="Sección"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                select
                                fullWidth
                                type="text"
                                name="shift"
                                value={editClass.shift}
                                variant="outlined"
                                onChange={handleInputChange}
                                SelectProps={{ native: true }}
                            >
                                <option value="matutino">Matutino</option>
                                <option value="vespertino">Vespertino</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                name="classRoom"
                                value={editClass.classRoom}
                                label="Agregar Aula"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        startIcon={<SaveIcon />}
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Actualizar Clase
                    </Button>
                </Box>
            </Modal>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Seguro que desea eliminar la sección ${section}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Al elimanarlo no podra recuperar la informacion. ¿Desea
                        continuar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleDelete(section);
                            handleClose();
                        }}
                    >
                        Eliminar
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Detalles */}
            <Modal
                open={openModalGroup}
                onClose={handleCloseModalGroup}
                aria-labelledby="modal-modal-title"
            >
                <StyledCard>
                    <StyledCardContent>
                        <Title>Detalles del grupo</Title>
                        <Detail>Seccion: {detailsGroup.section}</Detail>
                        <Detail>
                            Profesor guía:{" "}
                            {detailsGroup.Functionary
                                ? `${detailsGroup.Functionary.Person.name} ${detailsGroup.Functionary.Person.lastName}`
                                : "No asignado"}
                        </Detail>
                        <Detail>Grado: {detailsGroup.grade}</Detail>
                        <Detail>Ciclo: {detailsGroup.cycle}</Detail>
                        <Detail>Aula: {detailsGroup.classRoom}</Detail>
                        <Detail>Turno: {detailsGroup.shift}</Detail>
                        <Detail>
                            Cantidad de estudiantes: {detailsGroup.studentCount}
                        </Detail>
                        <Title>Lista de estudiantes</Title>

                        {detailsGroup.Students &&
                            detailsGroup.Students.length > 0 &&
                            detailsGroup?.Students.map((student, index) => (
                                <Detail key={index + 1}>{`${index + 1}: ${
                                    student.Person.lastName
                                } ${student.Person.lastName2} ${
                                    student.Person.name
                                } ${student.Person.middleName}`}</Detail>
                            ))}
                    </StyledCardContent>
                </StyledCard>
            </Modal>
        </>
    );
}

export default ClasesTable;
