// Lógica principal de tu sistema POS
console.log("Sistema Golden King inicializado");

export function registrarJugada(animal, monto) {
    const hora = new Date().getHours();
    // Validación de cierre a las 7pm (19:00)
    if (hora >= 19) {
        alert("El sistema ha cerrado. Son más de las 7:00 PM.");
        return;
    }
    // Lógica de guardado...
}
