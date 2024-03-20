import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  DataGrid,
  esES,
  GridToolbar,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useMediaQuery, useTheme } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

function SuppliesTable() {
  const [supplies, setSupplies] = useState([]);
  const api = useAxiosPrivate();
  const pageSize = 5;
  const sizeOptions = [5, 10, 15];
  const [reset, setReset] = useState(false);

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await api.get("/supplies");
        setSupplies(response.data);
      } catch (error) {
        setSnackbar({
          children: "Error al cargar los insumos",
          severity: "error",
        });
      }
    };
    fetchSupplies();
  }, [api, reset]);

  const columns = [
    {
      field: "name",
      headerName: "Nombre del insumo",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 1,
    },
    {
      field: "state",
      headerName: "Estado",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descripcion",
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
              icon={<EditIcon />}
              label="Editar"
              onClick={() => {
                setEditSupplie(params.row);
                handleOpenModal(true);
              }}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar"
              onClick={() => {
                setSupplieId(params.row.supplieId);
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
    fileName: "Lista de Insumos",
    includeHeaders: true,
    utf8WithBom: true,
  };

  const printOptions = {
    fileName: "Lista de Insumos",
    hideFooter: true,
    hideToolbar: true,
    pageStyle:
      ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
  };

  //Update
  const [openModal, setOpenModal] = useState(false);
  const [editSupplie, setEditSupplie] = useState({
    supplieId: "",
    name: "",
    price: "",
    state: "",
    description: "",
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
      await api.put(`/supplies/${editSupplie.supplieId}`, editSupplie);
      setSnackbar({
        children: "Insumo actualizado con exito",
        severity: "success",
      });
      setReset(!reset);
      handleCloseModal();
    } catch (err) {
      setSnackbar({
        children: "Error al actualizar el insumo",
        severity: "error",
      });
    }
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditSupplie({ ...editSupplie, [name]: value });
  };

  //Delete

  const [open, setOpen] = useState(false);
  const [supplieId, setSupplieId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/supplies/${supplieId}`);
      setSnackbar({
        children: "Insumo eliminado con exito",
        severity: "success",
      });
      setReset(!reset);
      handleClose();
    } catch (err) {
      setSnackbar({
        children: "Error al eliminar el insumo",
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
        rows={supplies}
        getRowId={(row) => row.supplieId}
        loading={supplies.length === 0}
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
          ...supplies.initialState,
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
          <div id="ModalHead" className="flex flex-row justify-between">
            <Typography id="modal-modal-title" variant="h6">
              Actualizar Insumos
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
            <Grid  item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="name"
                value={editSupplie.name}
                variant="outlined"
                onChange={handleEditInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="price"
                value={editSupplie.price}
                variant="outlined"
                onChange={handleEditInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                type="text"
                name="state"
                value={editSupplie.state}
                variant="outlined"
                onChange={handleEditInputChange}
                SelectProps={{ native: true }}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="description"
                value={editSupplie.description}
                variant="outlined"
                onChange={handleEditInputChange}
              />
            </Grid>
          </Grid>

          <Button
            startIcon={<SaveIcon />}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Actualizar Insumo
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar Insumo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estas seguro que deseas eliminar el insumo?
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

export default SuppliesTable;
