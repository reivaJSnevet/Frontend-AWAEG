import { useState } from 'react'
import GradesTable from './components/GradesTable'
import AddGrades from './components/AddGrades'


function Grades() {
    const [reset, setReset] = useState(false)
  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddGrades reset={reset} setReset={setReset}/>
        </div>
        <div className="">
            <GradesTable reset={reset} setReset={setReset}/>
        </div>
      </div>
    </>
  )
}

export default Grades