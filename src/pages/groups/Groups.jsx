import { useState } from 'react'
import ClasesTable from './components/ClasesTable'
import AddClases from './components/AddClases'

function Groups() {
    const [reset, setReset] = useState(false)

  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddClases reset={reset} setReset={setReset}/>
        </div>
        <div className="">
            <ClasesTable reset={reset} setReset={setReset}/>
        </div>
      </div>
    </>
  )
}

export default Groups