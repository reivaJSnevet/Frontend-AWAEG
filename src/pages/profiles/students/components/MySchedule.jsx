import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useUserStore } from "../../../../stores";
import { Box } from "@mui/material";

const MySchedule = () => {
    const api = useAxiosPrivate();
    const user = useUserStore((state) => state.user);
    const [events, setEvents] = useState([]);

    const daysOfWeek = {
        domingo: 0,
        lunes: 1,
        martes: 2,
        miércoles: 3,
        jueves: 4,
        viernes: 5,
        sábado: 6,
    };

    const subjectColor = {
        Matematicas: "#FF1E01",
        Español: "#FEF800",
        Ciencias: "#00E043",
        EstSociales: "#0F60FF",
        Inglés: "#70EDFF",
        EducaciónFísica: "#ED7BFE",
        Artes: "#B2A4FF",
        Música: "#FE9642",
        Computo: "#FF43BA",
        Recreo: "#FFC946",
    };

    useEffect(() => {
        const fetchTimeTable = async () => {
            try {
                if (!user?.user?.Person?.Student?.section) {
                    console.error("No se encontró la sección del estudiante.");
                    return;
                }

                const response = await api.get(
                    `/classes/${user?.user?.Person?.Student?.section}`
                );
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
                            color: subjectColor[
                                classData.Subject
                                    ? classData.Subject.subjectName
                                    : "Sin asignar"
                            ],
                        }))
                    );
                    setEvents(formattedEvents);
                } else {
                    console.log("No se encontraron datos de horarios.");
                    setEvents([]);
                }
            } catch (error) {
                console.error("Error fetching timetable:", error);
            }
        };

        fetchTimeTable();
    }, [api, user?.user?.Person?.Student?.section]);

    return (
        <div className="flex justify-center h-96 md:h-2/3 lg:h-1/2 xl:h-2/3">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/3">
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
                        /*  setSelectedEvent(info.event);
                        handleEventClick(info); */
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
                    eventContent={(eventInfo) => {
                        return (
                            <>
                                <div style={{ color: "black" }}>
                                    {eventInfo.timeText}
                                </div>
                                <div style={{ color: "black" }}>
                                    {eventInfo.event.title}
                                </div>
                            </>
                        );
                    }}
                />
            </div>
        </div>
    );
}

export default MySchedule;
