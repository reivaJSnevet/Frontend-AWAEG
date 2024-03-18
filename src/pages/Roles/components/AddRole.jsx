
import {useState}  from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '@mui/material/Button';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';


function AddRole() {

    const api = useAxiosPrivate();
    const [nombre, setNombre] = useState("");
    const [nivelPrivilegio, setNivelPrivilegio] = useState(0);
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState(null);
    const [snackbar, setSnackbar] = React.useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === "roleName") {
        setNombre(value);
      } else if (name === "privilegeLevel") {
        setNivelPrivilegio(value);
      } else if (name === "description") {
        setDescripcion(value);
      }
    };
  
    // const handleValidation = () => {
    //     if (!nombre.trim() || !descripcion.trim()) {
    //       setMensaje("Por favor, complete todos los campos y recuerde no ingresar caracteres especiales.");
    //       return false;
    //     } else if (nivelPrivilegio < 1 || nivelPrivilegio > 5) {
    //       setMensaje("El nivel de privilegio debe estar entre 1 y 5");
    //       return false;
    //     }
    //     return true;
    //   };
      
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // if (!handleValidation()) {
      //   return;
      // }
  
      try {
        await api.post("/roles", {
            roleName: nombre,
            privilegeLevel: nivelPrivilegio,
            description: descripcion,
        });
  
        setNombre("");
        setNivelPrivilegio(0);
        setDescripcion("");
   
       
        setSnackbar({ children: 'Rol Agregado con exito!', severity: 'success' });
        window.location.reload();
      } catch (error) {
       
        setSnackbar({ children: 'Error al agregar el rol', severity: 'error' });
        
       
      }
    };


  return (
    <div>
       <Accordion>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        >
            <Typography>Crear Rol</Typography>
            {mensaje && <div className="mb-4 text-red-600" >{mensaje}</div>}
        </AccordionSummary>

        <AccordionDetails>
            <Box
           component="form"
           onSubmit={handleSubmit}
           sx={{
             '& .MuiTextField-root': { m: 1, width: '25ch' },
           }}
           noValidate
           autoComplete="off"
            >
            <div>
                <TextField
                required
               
                name='roleName'
                label='Nombre del Rol'
                type='text'
                value={nombre}
                onChange={handleInputChange}
                helperText="Por favor, ingrese el nombre del rol."
                />
            </div>
            <div>
                <TextField
               
                helperText="El nivel de privilegio debe estar entre 1 y 5"
                required
                name='privilegeLevel'
                label='Nivel de privilegio'
                type='number'
                
                value={nivelPrivilegio}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
              
                required
                helperText="Por favor, ingrese la descripción del rol."
                name='description'
                label='Descripción'
                type='text'
                value={descripcion}
                onChange={handleInputChange}
                />
            </div>
            <div>
            <Button
             variant="contained" 
             type='submit'

            >
            Agregar Role
            </Button>
            </div>
                
            </Box>
        </AccordionDetails>

       </Accordion>

       {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  )
}


export default AddRole