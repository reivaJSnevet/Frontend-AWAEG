import { useState, useEffect } from "react";
import { create } from "zustand";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Grid from "@mui/system/Unstable_Grid";

const useFormStore = create((set) => ({
  formData: {
    score: "",
    period: "",
    studentId: "",
    studentName: "",
    subjectId: "",
    subjectName: "",
    functionaryId: "",
    functionaryName: "",
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: () =>
    set(() => ({
      formData: {
        score: "",
        period: "",
        studentId: "",
        studentName: "",
        subjectId: "",
        subjectName: "",
        functionaryId: "",
        functionaryName: "",
      },
    })),
}));

function AddGrades() {
  const api = useAxiosPrivate();
  const { formData, setFormData, resetFormData } = useFormStore();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState({
    error: false,
    validations: [],
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        const studentOptions = response.data.map((person) => {
          return {
            label: `${person.name} ${person.lastName}`,
            id: person.Student.studentId,
          };
        });
        setStudents(["", ...studentOptions]);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await api.get("/functionaries");
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

    const fetchSubjects = async () => {
      try {
        const response = await api.get("/subjects");
        const subjectOptions = response.data.map((subject) => {
          return { label: subject.subjectName, id: subject.subjectId };
        });
        setSubjects(["", ...subjectOptions]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
    fetchTeachers();
    fetchSubjects();
  }, [api]);

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      await api.post("/grades", {
        score: formData.score,
        period: formData.period,
        studentId: formData.studentId,
        subjectId: formData.subjectId,
        functionaryId: formData.functionaryId,
      });
      /* resetFormData(); */
      setError({
        error: false,
        validations: [],
      });
      setSnackbar({
        children: "Nota Agregada con exito!",
        severity: "success",
      });
      window.location.reload();
    } catch (err) {
      console.log(formData);
      setSnackbar({
        children: "Error al agregar la nota!",
        severity: "error",
      });
      setError({
        error: true,
        validations: [...err.response.data.unmetValidations],
      });
      console.log(err.response.data.unmetValidations);
      console.log("Error al agregar la nota:", err);
    }
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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Agregar Nota</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            component="form"
            sx={{ mt: 2 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2} margin={1}>
              <Grid item="true" xs={12}>
                <Autocomplete
                  disablePortal
                  options={students}
                  name="studentId"
                  value={formData.studentName}
                  onChange={(event, newValue) => {
                    if (newValue === null) {
                        setFormData({ studentId: "", studentName: ""});
                      return;
                    }
                    setFormData({ studentId: newValue.id, studentName: newValue.label});
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona un estudiante"
                      error={
                        (formData.studentId === "" ||
                          error.validations.some(
                            (validation) => validation.field === "studentId"
                          )) &&
                        error.error
                      }
                      helperText={
                        formData.studentId === "" ||
                        error.validations.some(
                          (validation) => validation.field === "studentId"
                        )
                          ? error.validations.find(
                              (validation) => validation.field === "studentId"
                            )?.message
                          : "Agregar cedula del estudiante"
                      }
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item="true" xs={12}>
                <Autocomplete
                  disablePortal
                  options={teachers}
                  name="functionaryId"
                  value={formData.functionaryName}
                  onChange={(event, newValue) => {
                    if (newValue === null) {
                        setFormData({ functionaryId: "", functionaryName: ""});
                      return;
                    }
                    setFormData({ functionaryId: newValue.id, functionaryName: newValue.label});
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona un Profesor"
                      error={
                        (formData.functionaryId === "" ||
                          error.validations.some(
                            (validation) => validation.field === "functionaryId"
                          )) &&
                        error.error
                      }
                      helperText={
                        formData.functionaryId === "" ||
                        error.validations.some(
                          (validation) => validation.field === "functionaryId"
                        )
                          ? error.validations.find(
                              (validation) =>
                                validation.field === "functionaryId"
                            )?.message
                          : "Agregar cedula del Profesor"
                      }
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item="true" xs={12}>
                <Autocomplete
                  disablePortal
                  options={subjects}
                  name="subjectId"
                  value={formData.subjectName}
                  onChange={(event, newValue) => {
                    if (newValue === null) {
                        setFormData({ subjectId: "", subjectName: ""});
                      return;
                    }
                    setFormData({ subjectId: newValue.id, subjectName: newValue.label});
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

              <Grid item="true" xs={12}>
                <TextField
                  required
                  error={
                    (formData.score === "" ||
                      error.validations.some(
                        (validation) => validation.field === "score"
                      )) &&
                    error.error
                  }
                  type="number"
                  name="score"
                  value={formData.score}
                  label="Nota del estudiante"
                  variant="outlined"
                  helperText={
                    formData.score === "" ||
                    error.validations.some(
                      (validation) => validation.field === "score"
                    )
                      ? error.validations.find(
                          (validation) => validation.field === "score"
                        )?.message
                      : "Agregar la nota del estudiante"
                  }
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item="true" xs={12}>
                <TextField
                  required
                  select
                  fullWidth
                  error={
                    (formData.period === "" ||
                      error.validations.some(
                        (validation) => validation.field === "grade"
                      )) &&
                    error.error
                  }
                  type="text"
                  name="period"
                  value={formData.period}
                  variant="outlined"
                  onChange={handleInputChange}
                  SelectProps={{ native: true }}
                >
                  <option value="">Seleccione un periodo</option>
                  <option value="primero">Primero</option>
                  <option value="segundo">Segundo</option>
                  <option value="tercero">Tercero</option>
                </TextField>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth>
              Agregar Notas
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AddGrades;
