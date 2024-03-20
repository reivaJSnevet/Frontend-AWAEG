import SuppliesTable from "./components/SuppliesTable"
import AddSupplie from "./components/AddSupplie"

function Supplies() {
  return (
    <>
    <div className="m-10 shadow-lg">
      <div className="mb-2">
        <AddSupplie />
      </div>
      <div className="">
      <SuppliesTable />
      </div>
    </div>
  </>
  )
}

export default Supplies