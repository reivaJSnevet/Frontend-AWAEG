export const generarContraseña = () => {
    const longitud = 8;
    const caracteresPermitidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    let contraseña = "";
    
    // Agregar al menos una mayúscula
    contraseña += caracteresPermitidos[Math.floor(Math.random() * 26)];
  
    // Agregar al menos un número
    contraseña += caracteresPermitidos[Math.floor(Math.random() * 10) + 52];
  
    // Completar el resto de la contraseña con caracteres aleatorios
    for (let i = 2; i < longitud; i++) {
      contraseña += caracteresPermitidos[Math.floor(Math.random() * caracteresPermitidos.length)];
    }
  
    // Mezclar los caracteres para mayor aleatoriedad
    contraseña = contraseña.split('').sort(function(){return 0.5-Math.random()}).join('');
  
    return contraseña;
  }