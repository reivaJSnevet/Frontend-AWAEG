export function generarNombreUsuario(nombre, nombreBD) {
    let nombreUsuario = nombre.toLowerCase().replace(/\s/g, '');
  
    // Generar un número aleatorio para agregar al nombre de usuario
    const numeroAleatorio = Math.floor(Math.random() * 1000);
    nombreUsuario += numeroAleatorio;
  
    // Verificar si el nombre de usuario ya existe en la base de datos
    while (nombreBD.includes(nombreUsuario)) {
      nombreUsuario = nombre.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 1000);
    }
  
    return nombreUsuario;
  }