import { useState } from "react";
import AddFunctonary from "./components/AddFunctonary";
import FunctionariesTable from "./components/FunctionariesTable";

function Functionaries() {
    const [reset, setReset] = useState(false);

  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddFunctonary reset={reset} setReset={setReset} />
        </div>
        <div className="">
          <FunctionariesTable reset={reset} setReset={setReset}/>
        </div>
      </div>
    </>
  );
}

export default Functionaries;
