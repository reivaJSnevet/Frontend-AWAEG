import { useEffect, useState } from "react";
import { useUserStore } from "../../../../stores";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const divider = (grades) => {
    const dividedGrades = {};

    grades.forEach((grade) => {
        const {
            Subject: { subjectName },
        } = grade;

        if (!dividedGrades[subjectName]) {
            dividedGrades[subjectName] = [];
        }

        dividedGrades[subjectName].push(grade);
    });

    return dividedGrades;
};

const GradesCard = ({ subject, grades }) => {
    return (
        <Card sx={{ 
            width: '100%',
            marginRight: '1rem',
            padding: '1rem',
            '@media (min-width: 768px)': { // Aplicar estilos específicos para escritorio
                width: 375, 
                marginBottom: '9.1rem',
            }
        }}>
            <CardContent>
                <Typography variant="h5" component="h2" sx={{ fontSize: "1.1rem","@media (min-width: 768px)": { fontSize: "2.5rem" } }}>
                    {subject}
                </Typography>
                {grades.map((grade, index) => (
                    <div key={index}>
                        <Typography color="textSecondary">
                            Periodo: {grade.period}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Nota: {grade.score}
                        </Typography>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const MyGrades = () => {
    const api = useAxiosPrivate();
    const user = useUserStore((state) => state.user);

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const getGrades = async () => {
            try {
                const response = await api.get(
                    `/grades/${user?.user?.Person?.Student?.studentId}`
                );
                const dividedGrades = divider(response.data);

                setGrades(dividedGrades);
            } catch (err) {
                console.error(err);
            }
        };
        getGrades();
    }, [user, api]);


    return (
<Box
    sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        marginTop: "3rem",
        "@media (min-width: 768px)": {
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "2rem",
            margin: "2rem",
        },
    }}
>
    {Object.entries(grades).map(([subject, grades]) => (
        <GradesCard key={subject} subject={subject} grades={grades}/>
    ))}
</Box>
    );
};

export default MyGrades;
