import {
  DataGrid,
  GridToolbar,
  esES,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import * as React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function FunctionariesTable({ reset, setReset}) {
  const [functionaries, setFunctionaries] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10];
  const axiosPrivate = useAxiosPrivate();


  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    const fetchFunctionaries = async () => {
      try {
        const response = await axiosPrivate.get("/functionaries");
        setFunctionaries(response.data);
      } catch (error) {
        console.error("Error al obtener funcionarios:", error.message);
      }
    };
    fetchFunctionaries();
  }, [axiosPrivate, reset]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      editable: false,
    },
    {
      field: "FullName",
      headerName: "Nombre completo",
      valueGetter: (params) => {
        return `${params.row.name || ""} ${params.row.middleName || ""}`;
      },
      flex: 1,
    },
    {
      field: "LastName",
      headerName: "Apellidos",
      flex: 1,
      valueGetter: (params) => {
        return `${params.row.lastName || ""} ${params.row.lastName2 || ""}`;
      },
    },
    {
      field: "age",
      headerName: "Edad",
      flex: 1,
      editable: false,
    },
    {
      field: "gender",
      headerName: "Género",
      flex: 1,
      valueGetter: (value) => {
        return value === "M" ? "Femenino" : "Masculino";
      },
    },
    {
      field: "Functionary",
      headerName: "Puesto de trabajo",
      flex: 1,
      renderCell: ({ value }) => value?.position,
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
                setEditFunctionary(params.row);
                handleOpenModal(true);
              
              }}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar"
              onClick={() => {
                setId(params.row.id);
                handleClickOpen();
              }}
            />
            <GridActionsCellItem
              icon={<InfoIcon />}
              label="Detalles"
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
    fileName: "Lista de Funcionarios",
    includeHeaders: true,
    utf8WithBom: true,
  };

  const printOptions = {
    fileName: "Lista de Funcionarios",
    hideFooter: true,
    hideToolbar: true,
    pageStyle:
      ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
  };

  ////Update
  const [openModal, setOpenModal] = React.useState(false);
  const [editFunctionary, setEditFunctionary] = React.useState({
    id: "",
    name: "",
    middleName: "",
    lastName: "",
    lastName2: "",
    birthDate: "",
    Functionary: {
      degree: "",
      position: "",
      specialty: "",
      professionalGroup: "",
      phoneNumber: "",
      yearsService: "",
    },
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
        `/functionaries/${editFunctionary.id}`,
        editFunctionary
      );
      console.log(response);
      setSnackbar({
        severity: "success",
        children: "Funcionario actualizado correctamente",
      });
      setReset(!reset);
    } catch (error) {
      console.error("Error al actualizar funcionario:", error.message);
      setSnackbar({
        severity: "error",
        children: "Error al actualizar funcionario",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name in editFunctionary) {
      setEditFunctionary({ ...editFunctionary, [name]: value });
    } else {
      const updatedFunctionary = {
        ...editFunctionary,
        Functionary: {
          ...editFunctionary.Functionary,
          [name]: value,
        },
      };
      setEditFunctionary(updatedFunctionary);
    }
  };

  ///ELiminar

  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/functionaries/${id}`);
      setSnackbar({
        severity: "success",
        children: "Funcionario eliminado correctamente",
      });
      handleClose();
      setReset(!reset);
    } catch (error) {
      console.error("Error al eliminar funcionario:", error.message);
      setSnackbar({
        severity: "error",
        children: "Error al eliminar funcionario",
      });
    }
  };

  //Detalles

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

  const [openDetails, setOpenDetails] = useState(false);
  const [detailsFunctionary, setDetailsFunctionary] = useState({});

  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

  const handleDetails = (functionary) => {
    setDetailsFunctionary(functionary);
    handleOpenDetails();
  };

  return (
    <>
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
        rows={functionaries}
        getRowId={(row) => row.id}
        loading={functionaries.length === 0}
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
          ...functionaries.initialState,
          pagination: { paginationModel: { pageSize } },
        }}
        pageSizeOptions={sizeOptions}
      />

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

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style} component="form" onSubmit={handleEditSubmit}>
          <div id="ModalHead" className="flex flex-row justify-between">
            <Typography id="modal-modal-title" variant="h6">
              Actualizar Funcionario
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
            item={true}
          >
            <Grid  item={true} xs={12}>
              <TextField
                disabled
                fullWidth
                type="text"
                name="id"
                value={editFunctionary.id}
                label="Cedula"
                variant="outlined"
              />
            </Grid>
            <Grid   item={true}  xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="name"
                value={editFunctionary.name}
                label="Nombre"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid  item={true}  xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="middleName"
                value={editFunctionary.middleName}
                label="Segundo Nombre"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item={true}  xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="lastName"
                value={editFunctionary.lastName}
                label="Primer Apellido"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item={true}  xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="lastName2"
                value={editFunctionary.lastName2}
                label="Segundo Apellido"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid  item={true} xs={12}>
              <TextField
                type="date"
                name="birthDate"
                value={editFunctionary.birthDate}
                label="Fecha Nacimiento"
                variant="outlined"
                onCanPlay={handleInputChange}
              />
            </Grid>

            <Grid  item={true}  xs={12}>
              <FormLabel id="gender">Genero</FormLabel>
              <RadioGroup
                aria-labelledby="gender"
                name="gender"
                value={editFunctionary.gender}
                onCanPlay={handleInputChange}
                row
              >
                <FormControlLabel
                  value="M"
                  control={<Radio />}
                  label="Masculino"
                />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Femenino"
                />
              </RadioGroup>
            </Grid>

            <Grid  item={true} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="address"
                value={editFunctionary.address}
                label="Direccion"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Divider variant="fullWidth" orientation="horizontal" />
          <Typography variant="h6" gutterBottom margin={1}>
            Información Laboral
          </Typography>
          <Grid
            container
            sx={{
              width: "auto",
            }}
            spacing={1}
            margin={1}
          >
            <Grid  item={true} xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="degree"
                value={editFunctionary.Functionary.degree}
                label="Titulación"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item={true}  xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="position"
                value={editFunctionary.Functionary.position}
                label="Posición"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid  item={true} xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="specialty"
                value={editFunctionary.Functionary.specialty}
                label="Especialidad"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid  item={true} xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="professionalGroup"
                value={editFunctionary.Functionary.professionalGroup}
                label="Grupo Profesional"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid  item={true} xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="phoneNumber"
                value={editFunctionary.Functionary.phoneNumber}
                label="Numero de Telefono"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid  item={true} xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="yearsService"
                value={editFunctionary.Functionary.yearsService}
                label="Años de Servicio"
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
            Actualizar Funcionario
          </Button>
        </Box>
      </Modal>

      {/* //////////mensaje de confirmacion de eliminacion */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Seguro que desea eliminar el Funcionario ${id}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al elimanarlo no podra recuperar la informacion. ¿Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDelete(id);
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
        open={openDetails}
        onClose={handleCloseDetails}
        aria-labelledby="modal-modal-title"
      >
        <Box>
          <StyledCard>
            <StyledCardContent>
              <div id="ModalHead" className="flex flex-row justify-between">
                <Typography id="modal-modal-title" variant="h6">
                  Detalles del Funcionario
                </Typography>
                <Button onClick={handleCloseDetails}>
                  <CancelIcon />
                </Button>
              </div>
              <Divider
                variant="fullWidth"
                orientation="horizontal"
                color="black"
              />

              <Title>Informacion Personal</Title>

              <Detail>
                <b>Id:</b> {detailsFunctionary.id}
              </Detail>

              <Detail>
                <b>Nombre completo:</b> {detailsFunctionary.name}{" "}
                {detailsFunctionary.middleName ?? " "}{" "}
                {detailsFunctionary.lastName} {detailsFunctionary.lastName2}{" "}
              </Detail>
              <Detail>
                <b>Fecha de nacimiento: </b>
                {detailsFunctionary.birthDate} ({detailsFunctionary.age} años)
              </Detail>
              <Detail>
                <b>Dirección:</b> {detailsFunctionary.address}
              </Detail>
              <Detail>
                <b>Genero:</b>{" "}
                {detailsFunctionary.gender === "M" ? "Masculino" : "Femenino"}
              </Detail>

              <Divider
                variant="fullWidth"
                orientation="horizontal"
                color="black"
              />
              <Title>Informacion Laboral</Title>
              <Detail>
                <b>Titulación:</b> {detailsFunctionary.Functionary?.degree}
              </Detail>
              <Detail>
                <b>Posición:</b> {detailsFunctionary.Functionary?.position}
              </Detail>
              <Detail>
                <b>Especialidad:</b> {detailsFunctionary.Functionary?.specialty}
              </Detail>
              <Detail>
                <b>Grupo Profesional:</b>{" "}
                {detailsFunctionary.Functionary?.professionalGroup}
              </Detail>
              <Detail>
                <b>Numero de Telefono:</b>{" "}
                {detailsFunctionary.Functionary?.phoneNumber}
              </Detail>
              <Detail>
                <b>Años de Servicio:</b>{" "}
                {detailsFunctionary.Functionary?.yearsService}
              </Detail>
              <Detail>
                <b>Materias:</b>{" "}
                {detailsFunctionary.Functionary?.Subjects?.length > 0 ? (
                  detailsFunctionary.Functionary.Subjects.map((subject) => (
                    <span key={subject.subjectId}>{subject?.subjectName}</span>
                  ))
                ) : (
                  <span>Sin materias asignadas</span>
                )}
              </Detail>
              <Divider
                variant="fullWidth"
                orientation="horizontal"
                color="black"
              />
              <Title>Informacion de Usuario</Title>
              <Detail>
                <b>Usuario:</b> {detailsFunctionary.User?.userName ?? "Sin Datos"}
              </Detail>
              <Detail>
                <b>Correo:</b> {detailsFunctionary.User?.email ?? "Sin Datos"}
              </Detail>
              <Detail>
                <b>Rol:</b> {detailsFunctionary.User?.Role?.roleName ?? "Sin Datos"}
              </Detail>
            </StyledCardContent>
          </StyledCard>
        </Box>
      </Modal>
    </>
  );
}

export default FunctionariesTable;
