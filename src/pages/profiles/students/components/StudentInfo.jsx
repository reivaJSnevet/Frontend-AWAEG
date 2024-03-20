import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useUserStore } from "../../../../stores";

const StudentInfo = () => {
    const user = useUserStore((state) => state.user);
    console.log(user);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "3rem",
                "@media (min-width: 768px)": {
                    padding: "2rem",
                    margin: "2rem",
                },
            }}
        >
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    margin: "1rem",
                }}
            >
                <CardContent>
                    <Typography variant="h4" sx={{ fontSize: "1.1rem","@media (min-width: 768px)": { fontSize: "2.5rem" } }}>
                        Información del estudiante
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b>Usuario</b>: {user.user.userName || "hubo un error"}
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b>Nombre</b>: {user.user.Person.name || "hubo un error"}
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b>Apellidos</b>: {user.user.Person.lastName+" "+user.user.Person.lastName2  || "hubo un error"}
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b>Sección</b>: {user?.user?.Person?.Student?.section  || "No tiene sección asignada"}
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b>Edad</b>: {user.user.Person.age  || "hubo un error"}
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b>Fecha de Nacimiento</b>: {user.user.Person.birthDate  || "hubo un error"}
                    </Typography>
                    {/* <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                    <b>Cedula</b>: {user.user.Person.id || "hubo un error"}
                    </Typography> */}
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b className="text-red-800">Telefono de emergencia</b>:{" "}
                        <u>{user.user.Person.Student.Caregiver.phoneNumber ||
                            "hubo un error"}</u>
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b className="text-red-800">Indicaciones Medicas</b>: <u>{user.user.Person.Student.healthObservations || "Sin indicaciones medicas"}</u>
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b className="text-red-800" >Alergias</b>: <u>{user.user.Person.Student.allergies  || "Sin alergias"}</u>
                    </Typography>


                    <Divider sx={{ margin: "1rem" }} />


                    <Typography variant="h5" sx={{ fontSize: "1.1rem","@media (min-width: 768px)": { fontSize: "2.5rem" }
                    }}>
                        Información del encargado
                    </Typography>

                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b>Nombre</b>: {user?.user?.Person?.Student?.Caregiver?.Person?.name || "hubo un error"}
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b>Apellidos</b>: {user?.user?.Person?.Student?.Caregiver?.Person?.lastName + " " + user?.user?.Person?.Student?.Caregiver?.Person?.lastName2 || "hubo un error"}
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b>Parentesco</b>: {user?.user?.Person?.Student?.Caregiver?.relationTo || "hubo un error"}
                    </Typography>
                    {/* <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                    <b>Cedula</b>: {user?.user?.Person?.Student?.Caregiver?.Person?.id || "hubo un error"}
                    </Typography> */}
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b className="text-blue-900">Correo del encargado</b>: {user.user.email || "hubo un error"}
                    </Typography>
                    <Typography variant="body2" sx={{ "@media (min-width: 768px)": { fontSize: "1.5rem" } }}>
                        <b className="text-blue-900">Direccion</b>: {user?.user?.Person?.Student?.Caregiver?.Person?.address || "hubo un error"}
                    </Typography>


                </CardContent>
            </Card>
        </Box>
    );
};

export default StudentInfo;
