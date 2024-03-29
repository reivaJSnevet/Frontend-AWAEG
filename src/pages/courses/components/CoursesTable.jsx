import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import { create } from "zustand";

import { Card, CardContent, FormControl, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

const useFormStore = create((set) => ({
  formData: {
    section: "",
    subjectId: "",
    subjectName: "",
    functionaryId: "",
    functionaryName: "",
    shift: "",
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: () =>
    set(() => ({
      formData: {
        section: "",
        subjectId: "",
        subjectName: "",
        functionaryId: "",
        functionaryName: "",
        shift: "",
      },
    })),
}));

function CoursesTable() {
  const [events, setEvents] = useState([]);
  const { formData, setFormData, resetFormData } = useFormStore();
  const [reset, setReset] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const daysOfWeek = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miércoles: 3,
    jueves: 4,
    viernes: 5,
    sábado: 6,
  };

  const daysOfWeekTran = {
    Sun: "domingo",
    Mon: "lunes",
    Tue: "martes",
    Wed: "miércoles",
    Thu: "jueves",
    Fri: "viernes",
    Sat: "sábado",
  };

  const subjectColor = {
    Matematicas: "#E61900",
    Español: "#EBE500",
    Ciencias: "#00BF35",
    EstSociales: "#0B4DCC",
    Inglés: "#5BB9DB",
    EducaciónFísica: "#C754E8",
    Artes: "#8C7AFF",
    Música: "#E16A2E",
    Computo: "#E71F89",
    Recreo: "#E69D25",
  };
  
  

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGoup] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const responseGroup = await axiosPrivate.get("/groups");
        setGroups(responseGroup.data);
      } catch (error) {
        console.error("Error fetching grupos:", error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await axiosPrivate.get("/subjects");
        const subjectOptions = response.data.map((subject) => {
          return {
            label: subject.subjectName,
            id: subject.subjectId,
          };
        });
        setSubjects(["", ...subjectOptions]);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axiosPrivate.get("/functionaries");
        const teacherOptions = response.data.map((person) => {
          return {
            label: `${person.name} ${person.lastName}`,
            id: person.Functionary.functionaryId,
          };
        });
        setTeachers(["", ...teacherOptions]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeachers();
    fetchSubjects();
    fetchClases();
  }, [axiosPrivate, reset]);

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        if (!selectedGroup) {
          setEvents([]);
          return;
        }
        const response = await axiosPrivate.get(`/classes/${selectedGroup}`);
        const classesData = response.data;

        if (Array.isArray(classesData) && classesData.length > 0) {
          const formattedEvents = classesData.flatMap((classData) =>
            classData.Timetables.map((timetable) => ({
              id: timetable.timetableId,
              daysOfWeek: [daysOfWeek[timetable.day]],
              title: classData.Subject
                ? classData.Subject.subjectName
                : "Sin asignar",
              startTime: timetable.startTime,
              endTime: timetable.endTime,
              color:
                subjectColor[
                  classData.Subject
                    ? classData.Subject.subjectName
                    : "Sin asignar"
                ],
            }))
          );
          setEvents(formattedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchTimeTable();
  }, [axiosPrivate, selectedGroup, reset]);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [selectedEvent, setSelectedEvent] = useState({});

  const handleEventClick = () => {
    handleOpenModal();
  };

  const handleSectionChange = (event) => {
    setSelectedGoup(event.target.value);
  };

  //Add course

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [event, setEvent] = useState({});

  const addClass = () => {
    console.log("Agregar Clase");
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState({
    error: false,
    validations: [],
  });

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await axiosPrivate.post("/classes", {
        section: selectedGroup,
        subjectId: selectedSubject.subjectId,
        functionaryId: selectedTeacher.functionaryId,
        shift: formData.shift,
        Timetables: [
          {
            day: daysOfWeekTran[event.weekDay],
            startTime: event.startTime.split("T")[1].slice(0, 5),
            endTime: event.endTime.split("T")[1].slice(0, 5),
            lesson: "I",
          },
        ],
      });
      resetFormData();
      setError({
        error: false,
        validations: [],
      });
      setSnackbar({
        severity: "success",
        children: "Clase agregada correctamente",
      });
        setReset(!reset);
    } catch (error) {
      console.error("Error al agregar clase:", error);
      setError({
        error: true,
        validations: error.response.data.errors,
      });
      setSnackbar({
        severity: "error",
        children: "Error al agregar clase",
      });
    }
    setOpenModalAdd(false);
  };

  const handleDeleteClass = async () => {
    try {
      await axiosPrivate.delete(`/timetables/${selectedEvent.id}`);
      setSnackbar({
        severity: "success",
        children: "Clase eliminada correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar clase:", error);
      setSnackbar({
        severity: "error",
        children: "Error al eliminar clase",
      });
    }
    setOpenModal(false);
    setReset(!reset);
  };

  return (
    <>
      <div>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          marginBottom: 2,
          width: 120,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="selecd-grupo">Sección</InputLabel>
          <Select
            labelId="selecd-grupo"
            value={selectedGroup}
            onChange={handleSectionChange}
          >
            <MenuItem value="">
              <em>Ninguno</em>
            </MenuItem>
            {groups.map((grupo) => (
              <MenuItem key={grupo.section} value={grupo.section}>
                {grupo.section}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "",
          center: "",
          right: "",
        }}
        events={events}
        slotMinTime="07:00:00"
        slotMaxTime="18:00:00"
        locale={esLocale}
        slotDuration={"00:10:00"}
        eventClick={(info) => {
          console.log("info", info);
          setSelectedEvent(info.event);
          handleEventClick(info);
        }}
        expandRows={true}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          hourCycle: "h12",
        }}
        selectOverlap={false}
        selectable={true}
        unselectAuto={true}
        allDaySlot={false}
        weekends={false}
        selectMirror={true}
        select={(info) => {

          setEvent({
            title: "",
            startTime: info.startStr,
            endTime: info.endStr,
            weekDay: info.start.toString().split(" ")[0],
          });

          setOpenModalAdd(true);
        }}
        eventContent={(eventInfo) => {
          return (
            <>
            <div style={{ color: 'black' }}>{eventInfo.timeText}</div>
            <div style={{ color: 'black' }}>{eventInfo.event.title}</div>
            </>
          );
        }}
      />

      {selectedGroup && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
        >
          <StyledCard>
            <StyledCardContent>
              <Title>Detalles de la materia</Title>
              <Detail>
                Materia: {JSON.stringify(selectedEvent.title || " ")}
              </Detail>
              <Detail>
                Hora de inicio:{" "}
                {JSON.stringify(
                  (event.startTime || "2024-02-27T07:00:00-06:00")
                    .split("T")[1]
                    .slice(0, 5)
                )}
              </Detail>
              <Detail>
                Hora de salida:{" "}
                {JSON.stringify(
                  (event.startTime || "2024-02-27T07:00:00-06:00")
                    .split("T")[1]
                    .slice(0, 5)
                )}
              </Detail>

              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteClass}
                fullWidth
              >
                Eliminar Clase
              </Button>
            </StyledCardContent>
          </StyledCard>
        </Modal>
      )}

      {/* modalAdd */}
      <Modal
        open={openModalAdd}
        onClose={() => setOpenModalAdd(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <div id="ModalHead" className="flex flex-row justify-between">
            <Typography id="modal-modal-title" variant="h6">
              Agregar Clase
            </Typography>
            <Button onClick={() => setOpenModalAdd(false)}>
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
            <Grid item={true} xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                type="text"
                name="startTime"
                value={(event.startTime || "2024-02-27T07:00:00-06:00")
                  .split("T")[1]
                  .slice(0, 5)}
                label="Hora de inicio"
                variant="outlined"
              />
            </Grid>

            <Grid item={true} xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                type="text"
                name="endTime"
                value={(event.endTime || "2024-02-27T07:00:00-06:00")
                  .split("T")[1]
                  .slice(0, 5)}
                label="Hora de salida"
                variant="outlined"
              />
            </Grid>

            <Grid item={true} xs={12}>
              <Autocomplete
                disablePortal
                options={teachers}
                name="functionaryId"
                value={selectedTeacher.functionaryName}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  if (newValue === null) {
                    setSelectedTeacher({
                      functionaryId: "",
                      functionaryName: "",
                    });
                    return;
                  }
                  setSelectedTeacher({
                    functionaryId: newValue.id,
                    functionaryName: newValue.label,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona un Profesor"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item={true} xs={12}>
              <Autocomplete
                disablePortal
                options={subjects}
                name="subjectId"
                value={selectedSubject.subjectName}
                onChange={(event, newValue) => {
                  console.log("que diablos hay:", newValue);
                  if (newValue === null) {
                    console.log("entro al if");
                    setSelectedSubject({
                      subjectId: "",
                      subjectName: "",
                    });
                    return;
                  }
                  setSelectedSubject({
                    subjectId: newValue.id,
                    subjectName: newValue.label,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona una Materia"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item={true} xs={12}>
              <TextField
                required
                select
                fullWidth
                type="text"
                name="shift"
                value={formData.shift}
                variant="outlined"
                onChange={handleInputChange}
                SelectProps={{ native: true }}
              >
                <option value="">Seleccione un turno</option>
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
              </TextField>
            </Grid>

            <Grid item={true} xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Agregar Clase
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default CoursesTable;
