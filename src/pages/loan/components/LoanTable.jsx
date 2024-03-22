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
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useMediaQuery, useTheme } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useUserStore } from "../../../stores/users/userStore";



function LoanTable({ reset, setReset }) {

    const [supplies, setSupplies] = useState([]);
  const api = useAxiosPrivate();
  const pageSize = 5;
  const sizeOptions = [5, 10, 15];
  const userStore = useUserStore((state) => state.user);
  
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    const fetchActiveSupplies = async () => {
      try {
        const response = await api.get("/supplies", {
          params: {
            state: "activo"
          }
        });
        const activeSupplies = response.data.filter(supply => supply.state === "activo");
        setSupplies(activeSupplies);
      } catch (error) {
        setSnackbar({
          children: "Error al cargar los insumos",
          severity: "error",
        });
      }
    };
    fetchActiveSupplies();
  }, [api, reset ]);
  
  

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
              icon={<PlaylistAddIcon />}
              label="Solicitar"
              onClick={() => {
                setLoan({ ...loan, supplieId: params.row.supplieId });
                handleOpenModal();
               console.log(loan)
              }}
            />

          </div>
        );
      },
    },
  ];



    const date = new Date().toLocaleString("en-US", {
        timeZone: "America/Costa_Rica",
      });



    const [openModal, setOpenModal] = useState(false);

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
  

  const [loan, setLoan] = useState({
    loanDate: date,
    deadLine: "",
    state: "PENDING",
    flaw:0,
    userName: userStore.user.personId,
  });

  const handlePostSubmit = async () => {
    try {
     await api.post("/loans", loan);
        setSnackbar({
          children: "Prestamo creado",
          severity: "success",
        });
        setReset(!reset);
    } catch (error) {
      setSnackbar({
        children: "Error al realizar el prestamo",
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
         <Box sx={style} component="form" onSubmit={handlePostSubmit}>
          <div id="ModalHead" className="flex flex-row justify-between">
            <Typography id="modal-modal-title" variant="h6">
              Solicitar Insumo
            </Typography>
            <Button onClick={handleCloseModal}>
              <CancelIcon />
            </Button>
          </div>

          <Grid container spacing={2}>

            <Grid item xs={12}>
                <TextField
                fullWidth
                label="Nombre del usuario"
                value={loan.userName}
                disabled
                />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled
                label="Fecha de prestamo"
                type="datetime-local"
                value={loan.loanDate}
                onChange={(e) => setLoan({ ...loan, loanDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Fecha de entrega:</Typography>
              <TextField
                fullWidth
                type="datetime-local"
                value={loan.deadLine}
                onChange={(e) => setLoan({ ...loan, deadLine: e.target.value })}
              />
            </Grid>

         
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Solicitar
              </Button>
            </Grid>
          </Grid>


        </Box>
      </Modal>

    </>
  )
}

export default LoanTable