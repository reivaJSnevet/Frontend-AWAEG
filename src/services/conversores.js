
// Función para convertir horas de formato 12 horas a 24 horas
export   const convertirAFormato24Horas = (hora12h) => {
    const [hora, minutos, periodo] = hora12h.split(/:| /);
    let hora24h = parseInt(hora);
    if (periodo === "PM" && hora !== "12") {
      hora24h += 12;
    } else if (periodo === "AM" && hora === "12") {
      hora24h = 0;
    }
    return `${hora24h.toString().padStart(2, '0')}:${minutos}`;
  };
  
  // Función para convertir horas de formato 24 horas a 12 horas
  export const convertirAFormato12Horas = (hora24) => {
    if (hora24) {
      const [hora, minutos] = hora24.split(":");
      const hora12 = ((hora % 12) || 12).toString();
      return `${hora12}:${minutos} ${hora >= 12 ? 'PM' : 'AM'}`;
    }
    return "";
  };
  
  // Función para convertir números arábigos a números romanos
  export const convertirANumeroRomano = (numero) => {
    const romanos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    return romanos[numero - 1];
};
  