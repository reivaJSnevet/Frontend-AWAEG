import React, { useState, useEffect } from "react";
import "./modal.css";
import api from "../../services/api.config";

const Prematricula = () => {
  const EstId = localStorage.getItem("EstId"); // Obtén la ID del estudiante del localStorage

  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState("");

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`estudiantes/${EstId}`);
        const { nombre, seccion } = response.data;
        setNombre(nombre);
        // Obtén solo el primer número de la sección y suma 1
        const primerNumero = parseInt(seccion.split("-")[0], 10);
        setGrado(primerNumero + 1);
      } catch (error) {
        console.error("Error al obtener datos del estudiante:", error);
      }
    };

    if (EstId) {
      fetchData();
    }
  }, [EstId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Realiza el POST a la ruta "prematricula" enviando la ID del estudiante y el primer número de la sección más 1
      await api.post("prematriculas", { grado, estudianteId: EstId });
      console.log("Prematrícula exitosa para el estudiante", EstId);
      // Realiza acciones adicionales después de la prematrícula
      closeModal();
    } catch (error) {
      console.error("Error al prematricular al estudiante:", error);
    }
  };

  return (
    <>
      <button onClick={openModal}>Prematricular</button>

      {showModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Prematrícula</h2>
            <form onSubmit={handleSubmit}>
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <label>Grado:</label>
              <div>{grado}</div> {/* Usar div o span para mostrar el valor, no se puede editar */}
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Prematricula;
