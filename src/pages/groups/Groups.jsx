import ClasesTable from './components/ClasesTable'
import AddClases from './components/AddClases'

function Groups() {
  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddClases />
        </div>
        <div className="">
            <ClasesTable />
        </div>
      </div>
    </>
  )
}

export default Groups