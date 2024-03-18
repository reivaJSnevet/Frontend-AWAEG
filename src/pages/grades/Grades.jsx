import GradesTable from './components/GradesTable'
import AddGrades from './components/AddGrades'


function Grades() {
  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddGrades />
        </div>
        <div className="">
            <GradesTable />
        </div>
      </div>
    </>
  )
}

export default Grades