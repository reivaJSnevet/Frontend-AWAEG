import { useState } from "react"
import Role from "./components/ListarRoles"
import AddRole from "./components/AddRole"

function Roles() {
    const [reset, setReset] = useState(false)

  return (
  <>
  <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddRole reset={reset} setReset={setReset} />
        </div>
        <div className="">
            <Role reset={reset} setReset={setReset} />
        </div>
      </div>
  </>
  )
}

export default Roles