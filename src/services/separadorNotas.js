

export const separador = (notas) => {

    const notasSeparadas = {};

    notas.forEach(nota => {
        const { periodo } = nota;
        const {nombre} = nota.materia;
        
        // Verificar si ya existe la clave para esa materia y periodo, si no existe, crearla
        if (!notasSeparadas[nombre]) {
            notasSeparadas[nombre] = {};
        }
        
        if (!notasSeparadas[nombre][periodo]) {
            notasSeparadas[nombre][periodo] = [];
        }
    
        // Agregar la nota a la lista correspondiente
        notasSeparadas[nombre][periodo].push(nota);
    });

    return notasSeparadas;
};
