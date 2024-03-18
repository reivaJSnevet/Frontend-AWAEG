// import { Card, CardContent, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const StyledCard = styled(Card)({
//   maxWidth: 400,
//   margin: "auto",
//   marginBottom: 16,
//   backgroundColor: "#f5f5f5", 
//   borderRadius: 8,
//   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
// });
// const StyledCardContent = styled(CardContent)({
//   padding: "16px", // Espaciado interno
// });

// const Title = styled(Typography)({
//   fontSize: "1.2rem",
//   fontWeight: "bold",
//   marginBottom: "8px",
// });

// const Detail = styled(Typography)({
//   fontSize: "1rem",
//   marginBottom: "4px",
// });

// function GroupDetails({ group }) {
//   return (
//     <div className="flex flex-row p-5 justify-evenly">
//       <StyledCard>
//         <StyledCardContent>
//           <Title>Detalles del grupo</Title>
//           <Detail>Seccion: {group.section}</Detail>
//           <Detail>
//             Profesor guía:{" "}
//             {group.Functionary
//               ? `${group.Functionary.Person.name} ${group.Functionary.Person.lastName}`
//               : "No asignado"}
//           </Detail>
//           <Detail>Grado: {group.grade}</Detail>
//           <Detail>Ciclo: {group.cycle}</Detail>
//           <Detail>Aula: {group.classRoom}</Detail>
//           <Detail>Turno: {group.shift}</Detail>
//           <Detail>Cantidad de estudiantes: {group.studentCount}</Detail>
//         </StyledCardContent>
//       </StyledCard>
//       <StyledCard>
//         <StyledCardContent>
//           <Title>Lista de estudiantes</Title>
//           {group.Students.map((student, index) => (
//             <Detail
//               key={index + 1}
//             >{`${index}: ${student.Person.lastName} ${student.Person.lastName2} ${student.Person.name} ${student.Person.middleName}`}</Detail>
//           ))}
//         </StyledCardContent>
//       </StyledCard>
//     </div>
//   );
// }

// export default GroupDetails;
