import {
  DataGrid,
  GridToolbar,
  esES,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


function FilesTable({ reset, setReset }) {
  const [sections, setSections] = useState([]);
  const [files, setFiles] = useState([]);
  const pageSize = 10;
  const sizeOptions = [5, 10];
  const axiosPrivate = useAxiosPrivate();

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const [selectedSection, setSelectedSection] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axiosPrivate.get("/groups");
        setSections(response.data);
      } catch (error) {
        setSnackbar({
          children: "Error al obtener las secciones",
          severity: "error",
        });
      }
    };
    fetchSections();
  }, [axiosPrivate]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axiosPrivate.get(`/files/${selectedSection}`);
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files", error.message);
      }
    };
    fetchFiles();
  }, [axiosPrivate, selectedSection, reset]);

  const handleDownload = async (fileId, originalName) => {
    try {
      const response = await axiosPrivate.get(`/files/${fileId}/download`, {
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



  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClickOpen = (fileId) => {
    setSelectedFile(fileId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = async (selectedFile) => {
    try {
      await axiosPrivate.delete(`/files/${selectedFile}`);
      setFiles(files.filter((file) => file.id !== selectedFile));
      setSnackbar({
        children: "Archivo eliminado correctamente",
        severity: "success",
      });
      setReset(!reset);
    } catch (error) {
      setSnackbar({
        children: "Error al eliminar el archivo",
        severity: "error",
      });
    }
    
  };

  const columns = [
    {
      field: "originalName",
      headerName: "Nombre del archivo",
      flex: 1,
    },
    {
      field: "size",
      headerName: "Tamaño",
      flex: 1,
      valueGetter: (params) => {
        return `${(params.row.size / 1024).toFixed()} KB`;
      },
    },
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
                handleDownload(params.row.fileId , params.row.originalName);
              }}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar"
              onClick={() => {
                handleClickOpen(params.row.fileId);
              }}
            />
          </div>
        );
      },
    },
  ];

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

      <TextField
        select
        fullWidth
        label="Selecciona una sección para ver los archivos"
        value={selectedSection}
        onChange={(e) => setSelectedSection(e.target.value)}
      >
        {sections.map((section) => (
          <MenuItem key={section.section} value={section.section}>
            {section.section}
          </MenuItem>
        ))}
      </TextField>

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

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Seguro que desea eliminar el archivo?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al elimanarlo no podra recuperar la informacion. ¿Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDelete(selectedFile);
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

export default FilesTable;
