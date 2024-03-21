import { useState } from "react";
import FilesTable from "./components/FilesTable";
import AddFile from "./components/AddFile";

function Files() {
    const [reset, setReset] = useState(false);
  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-5">
          <AddFile reset={reset} setReset={setReset} />
        </div>
        <div className="">
          <FilesTable reset={reset} setReset={setReset}/>
        </div>
      </div>
    </>
  );
}

export default Files;
