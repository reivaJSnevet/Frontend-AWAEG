import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="datosPersonales">Datos Personales</Link>
        </li>
        <li>
          <Link to="notas">Notas</Link>
        </li>
        <li>
            <Link to="horario">Horario</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar