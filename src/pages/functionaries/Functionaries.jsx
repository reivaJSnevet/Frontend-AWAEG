import AddFunctonary from "./components/AddFunctonary";
import FunctionariesTable from "./components/FunctionariesTable";

function Functionaries() {
  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddFunctonary />
        </div>
        <div className="">
          <FunctionariesTable />
        </div>
      </div>
    </>
  );
}

export default Functionaries;
