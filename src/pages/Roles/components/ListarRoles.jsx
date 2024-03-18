import {
  DataGrid,
  GridToolbar,
  esES,
  GridRowEditStopReasons,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import AddRole from "./AddRole";
import * as React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function Role() {
  const [roles, setRoles] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10];
  const axiosPrivate = useAxiosPrivate();
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosPrivate.get("/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error al obtener roles:", error.message);
      }
    };

    fetchRoles();
  }, [axiosPrivate, reset]);

  const columns = [
    {
      field: "roleId",
      headerName: "ID",
      flex: 1,
      editable: false,
    },
    {
      field: "roleName",
      headerName: "Nombre",
      flex: 1,
      editable: true,
    },
    {
      field: "privilegeLevel",
      headerName: "Nivel de privilegio",
      flex: 1,
      editable: true,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
            return [
                <GridActionsCellItem
                    key={`save-${id}`}
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                        color: "primary.main",
                    }}
                    onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                    key={`cancel-${id}`}
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                />,
            ];
        }

        return [
            <GridActionsCellItem
                key={`edit-${id}`}
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
            />,
            <GridActionsCellItem
                key={`delete-${id}`}
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => { 
                  setId(id);
                  handleClickOpen(id), 
                  console.log(id)}
                }
                color="inherit"
            />,
        ];
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


  const [rows, setRows] = React.useState(roles);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };




  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDeleteClick = (id) => async () => {
    console.log("handleDeleteClick", id);
    try {
      await axiosPrivate.delete(`/roles/${id}`);
      setRoles(roles.filter((role) => role.roleId !== id));
  
      setSnackbar({
        children: "Rol eliminado con éxito!",
        severity: "success",
      });
      
      handleClose();
      setReset(!reset);
    } catch (error) {
      console.error("Error al eliminar el rol:", error.message);
      setSnackbar({ children: "Error al eliminar el rol", severity: "error" });
      handleClose();
    }
  };





  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow) => {
    try {
      const updatedRow = { ...newRow };

      const searchId = roles.find((row) => row.roleId === updatedRow.roleId);
      if (!searchId) {
        throw new Error("Row not found");
      }

      const { roleId, ...newDatos } = updatedRow;

      axiosPrivate
        .put(`/roles/${roleId}`, newDatos)
        .then((response) => {
          console.log("Role actualizado:", response.data);

          setSnackbar({
            children: "Rol actualizado con exito!",
            severity: "success",
          });
        })
        .catch((error) => {
          console.error("Error al actualizar el role:", error.message);
        });

        setReset(!reset);
    } catch (error) {
      console.error("Error al actualizar el role:", error.message);
    }

    return newRow;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  return (
    <>
      <AddRole />
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        style={{ height: 500, width: "100%" }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={roles}
        getRowId={(row) => row.roleId}
        loading={roles.length === 0}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            csvOptions,
            printOptions,
          },
        }}
        disableSelectionOnClick
        getRowHeight={() => "auto"}
        pageSize={pageSize}
        rowsPerPageOptions={pageSize}
        initialState={{
          ...roles.initialState,
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

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Seguro que desea eliminar el Rol ${ id }?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al elimanarlo no podra recuperar la informacion. ¿Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClick(id)}>Eliminar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Role;
