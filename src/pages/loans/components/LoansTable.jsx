import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbar,
  esES,
  GridActionsCellItem,
} from "@mui/x-data-grid";

const LoansTable = ({reset, setReset}) => {
    const api = useAxiosPrivate();
    const [loans, setLoans] = useState([]);

    const pageSize = 5;
    const sizeOptions = [5, 10];

    const [snackbar, setSnackbar] = useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await api.get("/loans");
                setLoans(response.data);
            } catch (error) {
                setSnackbar({
                    message: "Error fetching loans",
                    severity: "error",
                });
            }
        };
        fetchLoans();
    }, [api, reset]);


    const columns = [
        {
          field: "loanDate",
          headerName: "Fecha de préstamo",                                                                                      
          flex: 1,
        },
        {
          field: "deadLine",
          headerName: "Fecha de devolución",
          flex: 1,
        },
        {
          field: "state",
          headerName: "Estado",
          flex: 1,
          valueGetter: (params) => {
            if (params.row.state === "PENDING") {
              return "en espera";
            }else if(params.row.state === "APPROVED"){
              return "aprobado";
            } else if (params.row.state === "REJECTED") {
              return "rechazado";
            } else {
                return "devuelto";
            }
          },
        },
        /* {
          field: "flaw",
          headerName: "Fallo",
          flex: 1,
        }, */
        {
          field: "userName",
          headerName: "Usuario",
          flex: 1,
        },
        // {
        //   field: "actions",
        //   type: "actions",
        //   headerName: "Acciones",
        //   flex: 1,
        //   cellClassName: "actions",
        //   renderCell: (params) => {
        //     return (
        //       <div>
        //         <GridActionsCellItem
        //           icon={<EditIcon />}
        //           label="Editar"
        //           onClick={() => {
        //             console.log("editar");
        //           }}
        //         />
        //         <GridActionsCellItem
        //           icon={<DeleteIcon />}
        //           label="Eliminar"
        //           onClick={() => {
        //             console.log("delete");
        //           }}
        //         />
        //       </div>
        //     );
        //   },
        // },
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
        rows={loans}
        getRowId={(row) => row.loanId}
        loading={loans.length === 0}
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
          ...loans.initialState,
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
  )
}

export default LoansTable