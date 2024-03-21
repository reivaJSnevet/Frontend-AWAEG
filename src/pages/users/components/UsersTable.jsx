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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useMediaQuery, useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

import AddUser from "./AddUser";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10];
    const [reset, setReset] = useState(false);
 
  const api = useAxiosPrivate();
  const [people, setPeople] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState({
    error: false,
    validations: [],
  });
  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, [api, reset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roles = await api.get("/roles");
        setRoles(roles.data);

        const people = await api.get("/students");
        const filteredPeople = people.data.filter((person) => !person.User);
        const peopleOptions = filteredPeople.map((person) => {
          return `${person.name} ${person.lastName} - ${person.id}`;
        });
        setPeople(peopleOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [api]);

  const columns = [
    {
      field: "userName",
      headerName: "Nombre de usuario",
      flex: 1,
      editable: false,
    },
    {
      field: "email",
      headerName: "Correo electrónico",
      flex: 1,
      editable: true,
    },
    {
      field: "personId",
      headerName: "Cedula",
      flex: 1,
      editable: false,
    },
    {
      field: "Role",
      headerName: "Rol",
      flex: 1,
      editable: false,
      renderCell: ({ value }) => value?.roleName,
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
                setEditUser(params.row);
                handleOpenModal(true);
                console.log(editUser);
              }}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar"
              onClick={() => {
                setUserName(params.row.userName);
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
    fileName: "Lista de Roles",
    includeHeaders: true,
    utf8WithBom: true,
  };

  const printOptions = {
    fileName: "Lista de Roles",
    hideFooter: true,
    hideToolbar: true,
    pageStyle:
      ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
  };

  //////Update
  const [openModal, setOpenModal] = React.useState(false);
  const [editUser, setEditUser] = React.useState({
    userName: "",
    email: "",
    roleId: 0,
    personId: "",
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
      const response = await api.put(
        `/users/${editUser.userName}`,
        editUser
        
      );
      console.log(response);
      setSnackbar({
        severity: "success",
        children: "Usuario actualizado correctamente",
      });
      setReset(!reset);
    } catch (error) {
      console.error("Error al actualizar Usuario:", error.message);
      setSnackbar({
        severity: "error",
        children: "Error al actualizar Usuario",
      });
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditUser({ ...editUser, [name]: value });
  };

  ///Eliminar

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (userName) => {
    try {
      await api.delete(`/users/${userName}`);
      setSnackbar({
        severity: "success",
        children: "Usuario eliminado correctamente",
      });
      handleClose();
      setReset(!reset);
    } catch (error) {
      console.error("Error al eliminar Usuario:", error.message);
      setSnackbar({
        severity: "error",
        children: "Error al eliminar Usuario",
      });
    }
  };




  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="pb-5">
          <AddUser reset={reset} setReset={setReset} />
        </div>
        <div>
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
            rows={users}
            getRowId={(row) => row.userName}
            loading={users.length === 0}
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
              ...users.initialState,
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
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style} component="form" onSubmit={handleEditSubmit}>
          <div id="ModalHead" className="flex flex-row justify-between">
            <Typography id="modal-modal-title" variant="h6">
              Actualizar Usuario
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
                name="userName"
                value={editUser.userName}
                label="Nombre de USuario"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                name="email"
                value={editUser.email}
                label="Correo Electronico"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <TextField
            fullWidth
                label="Selecciona un rol"
                select
                value={editUser.roleId}
                name="roleId"
                onChange={handleInputChange}
                helperText={
                  editUser.roleId === 0 ||
                  error.validations.some(
                    (validation) => validation.field === "roleId"
                  )
                    ? error.validations.find(
                        (validation) => validation.field === "roleId"
                      )?.message
                    : "Selecciona un rol"
                }
                error={
                  (editUser.roleId === 0 ||
                    error.validations.some(
                      (validation) => validation.field === "roleId"
                    )) &&
                  error.error
                }
              >
                <MenuItem value={0}>Selecciona un rol</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.roleId} value={role.roleId}>
                    {role.roleName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
          </Grid>
          <Button
          fullWidth
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Guardar
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
          {`Seguro que desea eliminar el Rol ${ userName }?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al elimanarlo no podra recuperar la informacion. ¿Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleDelete(userName); handleClose()}}>Eliminar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UsersTable;
