import Role from "./components/ListarRoles"
import AddRole from "./components/AddRole"

function Roles() {
  return (
  <>
  <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddRole />
        </div>
        <div className="">
            <Role />
        </div>
      </div>
  </>
  )
}

export default Roles