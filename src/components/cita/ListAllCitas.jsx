import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

function ListAllCitas() {
    const api = useAxiosPrivate();
    const { auth } = useAuth();
    const rol = auth.roleArray[0];
    const [citas, setCitas] = useState([]);

    const handleSolicitarCita = async (citaId) => {
        try {
            const citaActual = citas.find(cita => cita.id === citaId);
    
  
            const citaActualizada = {
                ...citaActual,
                estudianteId: auth.personaId
            };
   
            await api.put(`/citas/${citaId}`, citaActualizada);
    
            const fetchCitas = async () => {
                let apiUrl = '';
    
                if (rol === 'Director') {
                    apiUrl = '/citas';
                } else if (rol === 'Estudiante') {
                    apiUrl = '/citasLibres';
                }
    
                const response = await api.get(apiUrl);
                setCitas(response.data);
            };
    
            fetchCitas();
        } catch (error) {
            console.error('Error al solicitar la cita:', error);
        }
    };

    useEffect(() => {
        try {
            const fetchCitas = async () => {
                let apiUrl = '';

                if (rol === 'Director') {
                    apiUrl = '/citas';
                } else if (rol === 'Estudiante') {
                    apiUrl = '/citasLibres';
                }

                const response = await api.get(apiUrl);
                setCitas(response.data);
            };

            fetchCitas();
        } catch (error) {
            console.log(error);
        }
    }, [rol, api]);

    return (
        <div>
            <h2>Listado de Citas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha y Hora</th>
                        <th>Asunto</th>
                        <th>Duración</th>
                        <th>Ubicación</th>
                        <th>Funcionario ID</th>
                        {rol === 'Estudiante' && <th>Solicitar Cita</th>}
                    </tr>
                </thead>
                <tbody>
                    {citas.map((cita) => (
                        <tr key={cita.id}>
                            <td>{cita.dia}</td>
                            <td>{cita.asunto}</td>
                            <td>{cita.duracion}</td>
                            <td>{cita.ubicacion}</td>
                            <td>{cita.funcionarioId}</td>
                            {rol === 'Estudiante' && (
                                <td>
                                    <button onClick={() => handleSolicitarCita(cita.id)}>
                                        Solicitar Cita
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListAllCitas;
