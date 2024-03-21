import { useState } from "react"
import SuppliesTable from "./components/SuppliesTable"
import AddSupplie from "./components/AddSupplie"

function Supplies() {
    const [reset, setReset] = useState(false)
  return (
    <>
    <div className="m-10 shadow-lg">
      <div className="mb-2">
        <AddSupplie reset={reset} setReset={setReset}/>
      </div>
      <div className="">
      <SuppliesTable reset={reset} setReset={setReset}/>
      </div>
    </div>
  </>
  )
}

export default Supplies