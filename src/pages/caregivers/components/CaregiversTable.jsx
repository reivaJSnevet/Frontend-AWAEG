import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  DataGrid,
  GridToolbar,
  esES,
  GridActionsCellItem,
} from "@mui/x-data-grid";

function CaregiversTable() {
  const [caregivers, setCaregivers] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10];

  const api = useAxiosPrivate();

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await api.get("/caregivers");
        setCaregivers(response.data);
      } catch (error) {
        setSnackbar({
          message: "Error fetching caregivers",
          severity: "error",
        });
      }
    };
    fetchCaregivers();
  }, [api]);

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
      field: "Caregiver",
      headerName: "Parentesco",
      flex: 1,
      valueGetter: (params) => {
        return params.row.Caregiver.relationTo;
      },
    },
    {
      field: "phoneNumber",
      headerName: "Teléfono",
      flex: 1,
      valueGetter: (params) => {
        return params.row.Caregiver.phoneNumber;
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
                console.log("editar");
              }}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar"
              onClick={() => {
                console.log("delete");
              }}
            />
          </div>
        );
      },
    },
  ];

  const csvOptions = {
    delimiter: ";",
    fileName: "Lista de Encargados",
    includeHeaders: true,
    utf8WithBom: true,
  };

  const printOptions = {
    fileName: "Lista de Encargados",
    hideFooter: true,
    hideToolbar: true,
    pageStyle:
      ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
  };

  return (
    <>
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
          rows={caregivers}
          getRowId={(row) => row.id}
          loading={caregivers.length === 0}
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
            ...caregivers.initialState,
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
    </>
  );
}

export default CaregiversTable;
