import { useState, useEffect } from "react";
import {
    DataGrid,
    GridToolbar,
    esES,
    GridActionsCellItem,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useUserStore from "../../../../stores/users/userStore";

const HomeWork = () => {
    const user = useUserStore((state) => state.user);
    const [files, setFiles] = useState([]);
    const pageSize = 10;
    const sizeOptions = [5, 10];
    const axiosPrivate = useAxiosPrivate();

    const [snackbar, setSnackbar] = useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/files/${user?.user?.Person?.Student?.Group?.section}`
                );
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files", error.message);
            }
        };
        fetchFiles();
    }, [axiosPrivate, user?.user?.Person?.Student?.Group?.section]);

    const columns = [
        {
            field: "originalName",
            headerName: "Nombre del archivo",
            flex: 1,
        },
/*         {
            field: "size",
            headerName: "Tamaño",
            flex: 1,
            valueGetter: (params) => {
                return `${(params.row.size / 1024).toFixed()} KB`;
            },
        }, */
        {
            field: "Subido por",
            headerName: "Subido por",
            flex: 1,
            valueGetter: (params) => {
                return `${params.row.Functionary.Person.name} ${params.row.Functionary.Person.lastName}`;
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
                            icon={<FileDownloadIcon />}
                            label="Descargar"
                            onClick={() => {
                                handleDownload(
                                    params.row.fileId,
                                    params.row.originalName
                                );
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const handleDownload = async (fileId, originalName) => {
        try {
            const response = await axiosPrivate.get(
                `/files/${fileId}/download`,
                {
                    responseType: "blob",
                }
            );

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

<Box
    /* sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "3rem",
        padding: "1rem", // Agregar un padding por defecto
        margin: "1rem", // Agregar un margen por defecto
        "@media (min-width: 768px)": {
            padding: "2rem", // Ajustar el padding en dispositivos de escritorio
            margin: "2rem", // Ajustar el margen en dispositivos de escritorio
        },
    }} */
>
    <DataGrid
        sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "transparent",
            "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
            },
        }}
        style={{ width: "100%" }} // Eliminar la altura fija
        localeText={
            esES.components.MuiDataGrid.defaultProps.localeText
        }
        rows={files}
        getRowId={(row) => row.fileId}
        loading={files.length === 0}
        columns={columns}
        editMode="row"
        slots={{ toolbar: GridToolbar }}
        slotProps={{
            toolbar: {
                showQuickFilter: true,
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
</Box>
        </>
    );
};

export default HomeWork;
