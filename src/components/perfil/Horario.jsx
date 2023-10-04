import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Matematicas',
    start: new Date('2023-10-02T09:00:00'),
    end: new Date('2023-10-02T09:40:00'),
    id: 1,
  },
  {
    title: 'Fisica',
    start: new Date('2023-10-03T10:00:00'),
    end: new Date('2023-10-03T10:40:00'),
    id: 2,
  },
  {
    title: 'Quimica',
    start: new Date('2023-10-04T11:30:00'),
    end: new Date('2023-10-04T12:10:00'),
    id: 3,
  },
];

const MyCalendar = () => (
  <div style={{ height: '500px' }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ marginBottom: '20px' }}
    />
  </div>
);

function Horario() {
  return (
    <div>
      <h2>Horario de Clases</h2>
      <MyCalendar />
    </div>
  );
}

export default Horario;
