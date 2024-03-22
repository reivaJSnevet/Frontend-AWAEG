import { useState } from "react"
import LoanTable from "./components/LoanTable"

function Loan() {
    const [reset, setReset] = useState(false)
  return (
    <>
    <div className="m-10 shadow-lg">
      <div className="mb-2">
     
      </div>
      <div className="">
      <LoanTable reset={reset} setReset={setReset}/>
      </div>
    </div>
  </>
  )
}

export default Loan