import StudentsTable from "./components/StudentsTable";
import AddStudents from "./components/AddStudents";


function Students() {
  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddStudents />
        </div>
        <div className="">
            <StudentsTable />
        </div>
      </div>
    </>
  );
}

export default Students;
