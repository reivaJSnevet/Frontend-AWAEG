import { useState } from "react";
import StudentsTable from "./components/StudentsTable";
import AddStudents from "./components/AddStudents";


function Students() {
    const [reset, setReset] = useState(false);
  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddStudents reset={reset} setReset={setReset}/>
        </div>
        <div className="">
            <StudentsTable reset={reset} setReset={setReset}/>
        </div>
      </div>
    </>
  );
}

export default Students;
