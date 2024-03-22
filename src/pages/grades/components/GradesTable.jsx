import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
    DataGrid,
    esES,
    GridToolbar,
    GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function GradesTable({ reset, setReset }) {
    const [grades, setGrades] = useState([]);
    const pageSize = 10;
    const sizeOptions = [5, 10, 15];
    const axiosPrivate = useAxiosPrivate();

    const [snackbar, setSnackbar] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axiosPrivate.get("/grades");
                setGrades(response.data);
            } catch (error) {
                setSnackbar({
                    children: "Error al obtener las notas",
                    severity: "error",
                });
            }
        };
        fetchGrades();
    }, [axiosPrivate, reset]);

    const columns = [
        {
            field: "Student",
            headerName: "Estudiante",
            valueGetter: (params) => {
                return `${params.row.Student.Person.name || ""} ${
                    params.row.Student.Person.middleName || ""
                } ${params.row.Student.Person.lastName || ""} ${
                    params.row.Student.Person.lastName2 || ""
                }`;
            },
            flex: 1,
        },
        {
            field: "score",
            headerName: "Nota",
            flex: 1,
            renderCell: (params) => {
                return params.row.score >= 65 ? (
                    <div style={{ color: "green" }}>{params.row.score}</div>
                ) : (
                    <div style={{ color: "red" }}>{params.row.score}</div>
                );
            },
        },
        {
            field: "Subject",
            headerName: "Materia",
            flex: 1,
            valueGetter: (params) => {
                if (params.row.Subject) {
                    return params.row.Subject.subjectName;
                }
            },
        },
        {
            field: "Functionary",
            headerName: "Profesor",
            flex: 1,
            valueGetter: (params) => {
                if (params.row.Functionary.Person) {
                    return `${params.row.Functionary.Person.name}  ${params.row.Functionary.Person.lastName}`;
                }
            },
        },
        {
            field: "section",
            headerName: "Sección",
            flex: 1,
            valueGetter: (params) => {
                if (params.row.Student.section) {
                    return params.row.Student.section;
                }
            },
        },
        {
            field: "period",
            headerName: "Periodo",
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
                            icon={<DeleteIcon />}
                            label="Eliminar"
                            onClick={() => {
                                setGradesDelete(params.row.gradeId);
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
        fileName: "Lista de Notas",
        includeHeaders: true,
        utf8WithBom: true,
    };

    const printOptions = {
        fileName: "Lista de Notas",
        hideFooter: true,
        hideToolbar: true,
        pageStyle:
            ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
    };

    ////Update

    ////Borrar
    const [open, setOpen] = useState(false);
    const [gradesDelete, setGradesDelete] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (gradeId) => {
        try {
            await axiosPrivate.delete(`/grades/${gradeId}`);
            setSnackbar({
                children: "Nota eliminado",
                severity: "success",
            });
            setReset(!reset);
        } catch (error) {
            setSnackbar({
                children: "Error al eliminar el Nota",
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
                rows={grades}
                getRowId={(row) => row.gradeId}
                loading={grades.length === 0}
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
                    ...grades.initialState,
                    pagination: { paginationModel: { pageSize } },
                }}
                pageSizeOptions={sizeOptions}
            />

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Seguro que desea eliminar la Nota ${gradesDelete}?`}
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
                            handleDelete(gradesDelete);
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
        </>
    );
}

export default GradesTable;
