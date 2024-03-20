import AppointmentTable from "./components/AppointmentTable"
import AddAppointment from "./components/AddAppointment"

function Appointment() {
  return (
    <>
    <div className="m-10 shadow-lg">
      <div className="mb-2">
        <AddAppointment />
      </div>
      <div className="">
        <AppointmentTable />
      </div>
    </div>
  </>
  )
}

export default Appointment