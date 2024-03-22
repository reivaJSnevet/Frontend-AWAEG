import { useState } from "react"
import AppointmentTable from "./components/AppointmentTable"
import AddAppointment from "./components/AddAppointment"

function Appointment() {
    const [reset, setReset] = useState(false)
  return (
    <>
    <div className="m-10 shadow-lg">
      <div className="mb-2">
        <AddAppointment reset={reset} setReset={setReset}/>
      </div>
      <div className="">
        <AppointmentTable reset={reset} setReset={setReset}/>
      </div>
    </div>
  </>
  )
}

export default Appointment