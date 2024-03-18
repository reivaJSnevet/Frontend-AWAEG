import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUserStore } from "../../../../stores";

const StudentInfo = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Student Information
        </Typography>
        <Typography variant="body2">
          Usuario: {user.user.userName || "hubo un error"}
        </Typography>
        <Typography variant="body2">
          Email: {user.user.email || "hubo un error"}
        </Typography>
        <Typography variant="body2">
          Nombre: {user.user.Person.name || "hubo un error"}
        </Typography>
        <Typography variant="body2">
          Apellido: {user.user.Person.lastName || "hubo un error"}
        </Typography>
        <Typography variant="body2">
          Cedula: {user.user.Person.id || "hubo un error"}
        </Typography>
        <Typography variant="body2">
          Telefono de emergencia:{" "}
          {user.user.Person.Student.Caregiver.phoneNumber || "hubo un error"}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Edit</Button> */}
      </CardActions>
    </Card>
  );
};

export default StudentInfo;
