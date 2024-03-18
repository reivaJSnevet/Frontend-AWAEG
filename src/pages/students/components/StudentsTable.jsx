
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  DataGrid,
  esES,
  GridToolbar,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import Autocomplete from "@mui/material/Autocomplete";



function StudentsTable() {

  const [reset, setReset] = useState(false);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10];
  const axiosPrivate = useAxiosPrivate();

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosPrivate.get("/students");
        setStudents(response.data);
      } catch (error) {
        setSnackbar({ message: "Error fetching students", severity: "error" });
      }
    };
  const fetchGroups = async () => {
    try {
      const response = await axiosPrivate.get("/groups");
      const groupsOptions = response.data.map((group) => ({
        label: group.section,
        id: group.section,
      }));
        setGroups(["", ...groupsOptions]);
    } catch (error) {
      setSnackbar({ message: "Error fetching groups", severity: "error" });
    }
  };
    fetchGroups();
    fetchStudents();
  }, [axiosPrivate, reset]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
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
      field: "gender",
      headerName: "Género",
      flex: 1,
      valueGetter: (value) => {
        return value === "M" ? "Femenino" : "Masculino";
      },
    },
    {
      field: "Student",
      headerName: "Sección",
      flex: 1,
      renderCell: ({ value }) => value?.section,
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
                setEditStudent(params.row);
                handleOpenModal(true);
                console.log(editStudent);
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
    fileName: "Lista de Estudiantes",
    includeHeaders: true,
    utf8WithBom: true,
  };

  const printOptions = {
    fileName: "Lista de Estudiantes",
    hideFooter: true,
    hideToolbar: true,
    pageStyle:
      ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
  };

  //////Update
  const [openModal, setOpenModal] = useState(false);
  const [editStudent, setEditStudent] = useState({
    id: "",
    name: "",
    middleName: "",
    lastName: "",
    lastName2: "",
    birthDate: "2000-01-01",
    gender: "",
    address: "",
    Student: {
      Caregiver: {
        Person: {
          id: "",
        },
      },
      allergies: "",
      healthObservations: "",
      accommodation: "",
      section: "",
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
      const response = await axiosPrivate.put(`/students/${editStudent.id}`, {
        ...editStudent,
        allergies: editStudent.Student.allergies,
        healthObservations: editStudent.Student.healthObservations,
        accommodation: editStudent.Student.accommodation,
      });
      console.log(response);
     
      setSnackbar({ children: "Estudiante actualizado", severity: "success" });
      setReset(!reset);
    } catch (error) {
      setSnackbar({
        children: "Error al actualizar el estudiante",
        severity: "error",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name in editStudent) {
      setEditStudent({ ...editStudent, [name]: value });
    } else {
      const updatedStudent = {
        ...editStudent,
        Student: {
          ...editStudent.Student,
          [name]: value,
        },
      };
      setEditStudent(updatedStudent);
    }
  };

  //////Delete
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
      await axiosPrivate.delete(`/students/${id}`);
      
      setSnackbar({
        severity: "success",
        children: "Estudiante eliminado correctamente",
      });
      setReset(!reset);
      handleClose();
    } catch (error) {
      console.error("Error al eliminar Estudiante:", error.message);
      setSnackbar({
        severity: "error",
        children: "Error al eliminar Estudiante",
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
  const [detailsStudent, setDetailsStudent] = useState({});

  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

  const handleDetails = (student) => {
    setDetailsStudent(student);
    handleOpenDetails();
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
        rows={students}
        getRowId={(row) => row.id}
        loading={students.length === 0}
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
          ...students.initialState,
          pagination: { paginationModel: { pageSize } },
        }}
        pageSizeOptions={sizeOptions}
      />

      {/* Update */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style} component="form" onSubmit={handleEditSubmit}>
          <div id="ModalHead" className="flex flex-row justify-between">
            {/* <h2 id="modal-modal-title">Editar Estudiante</h2>  */}
            <Typography id="modal-modal-title" variant="h6">
              Actualizar Estudiante
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
                disabled
                fullWidth
                type="text"
                name="id"
                value={editStudent.id}
                label="Cedula"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="name"
                value={editStudent.name}
                label="Nombre"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="middleName"
                value={editStudent.middleName}
                label="Segundo Nombre"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="lastName"
                value={editStudent.lastName}
                label="Primer Apellido"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="lastName2"
                value={editStudent.lastName2}
                label="Segundo Apellido"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                name="birthDate"
                value={editStudent.birthDate}
                label="Fecha Nacimiento"
                variant="outlined"
                onCanPlay={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel id="gender">Genero</FormLabel>
              <RadioGroup
                aria-labelledby="gender"
                name="gender"
                value={editStudent.gender}
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="address"
                value={editStudent.address}
                label="Direccion"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Divider variant="fullWidth" orientation="horizontal" />
          <Typography variant="h6" gutterBottom margin={1}>
            Información del Estudiante
          </Typography>
          <Grid
            container
            sx={{
              width: "auto",
            }}
            spacing={1}
            margin={1}
          >
            <Grid item xs={12} sm={6}>
              <TextField
              disabled
                fullWidth
                type="text"
                name="caregiverId"
                value={editStudent?.Student?.Caregiver?.Person?.id}
                label="Cedula del Encargado"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="allergies"
                value={editStudent.Student.allergies}
                label="Alergias o padecimientos del estudiante"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="healthObservations"
                value={editStudent.Student.healthObservations}
                label="Observaciones de Salud"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                type="text"
                label="Tipo de educación"
                name="accommodation"
                value={editStudent.Student.accommodation}
                variant="outlined"
                onChange={handleInputChange}
                SelectProps={{ native: true }}
              >
                <option value="regular">Regular</option>
                <option value="especial">Especial</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                    disablePortal
                    options={groups}
                    name="section"
                    value={editStudent.Student.section}
                    onChange={(event, newValue) => {
                        setEditStudent({ ...editStudent, section: newValue.id });
                    }}
                    renderInput={(params) => <TextField {...params} label="Sección" variant="outlined" />}

                />
            </Grid>
          </Grid>
          <Button
            startIcon={<SaveIcon />}
            type="submit"
            variant="contained"
            fullWidth
          >
            Actualizar Estudiante
          </Button>
        </Box>
      </Modal>

      {/* Delete */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Seguro que desea eliminar el Estudiante con la cédula ${ id }?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al elimanarlo no podra recuperar la informacion. ¿Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleDelete(id); handleClose()}}>Eliminar</Button>
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
                <b>Id:</b> {detailsStudent.id}
              </Detail>

              <Detail>
                <b>Nombre completo:</b> {detailsStudent.name}{" "}
                {detailsStudent.middleName ?? " "}{" "}
                {detailsStudent.lastName} {detailsStudent.lastName2}{" "}
              </Detail>
              <Detail>
                <b>Fecha de nacimiento: </b>
                {detailsStudent.birthDate} ({detailsStudent.age} años)
              </Detail>
              <Detail>
                <b>Dirección:</b> {detailsStudent.address}
              </Detail>
              <Detail>
                <b>Genero:</b>{" "}
                {detailsStudent.gender === "M" ? "Masculino" : "Femenino"}
              </Detail>

              <Divider
                variant="fullWidth"
                orientation="horizontal"
                color="black"
              />
              <Title>Informacion del Estudiante</Title>
              <Detail>
                <b>Allergias:</b> {detailsStudent.Student?.allergies ?? "No tiene"}
              </Detail>
              <Detail>
                <b>Observaciones de salud:</b> {detailsStudent.Student?.healthObservations ?? "No tiene"}
              </Detail>
              <Detail>
                <b>Adecuación Significativa:</b> {detailsStudent.Student?.accommodation ?? "No asignado"}
              </Detail>
              <Detail> 
                <b>Sección:</b> {detailsStudent.Student?.section ?? "No asignada"}
              </Detail>
              
              <Divider
                variant="fullWidth"
                orientation="horizontal"
                color="black"
              />
              <Title>Informacion del Encargado</Title>
                <Detail>
                    <b>Id:</b> {detailsStudent?.Student?.Caregiver?.Person?.id ?? "No asignado"}
                </Detail>
              <Detail>
                <b>Nombre Completo:</b> {detailsStudent?.Student?.Caregiver?.Person?.name }{" "}
                {detailsStudent?.Student?.Caregiver?.Person?.middleName }{" "}
                {detailsStudent?.Student?.Caregiver?.Person?.lastName }{" "}
                {detailsStudent?.Student?.Caregiver?.Person?.lastName2 }
              </Detail>
              <Detail>
                <b>Telefono:</b> {detailsStudent?.Student?.Caregiver?.phoneNumber ?? "No asignado"}
              </Detail>
              <Detail>
                <b>Relacion con el estudiante:</b> {detailsStudent?.Student?.Caregiver?.relationTo ?? "No asignado"}
              </Detail>
              <Detail>
                <b>Fecha de nacimiento: </b> {detailsStudent?.Student?.Caregiver?.Person?.birthDate ?? "No asignado"} ( {detailsStudent?.Student?.Caregiver?.Person?.age ?? "No asignado"} años)
              </Detail>


              
            </StyledCardContent>
          </StyledCard>
        </Box>
      </Modal>
    </>
  );
}

export default StudentsTable;
