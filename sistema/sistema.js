imprimir() {
    if (this.jugadas.length === 0) {
        alert("No hay jugadas");
        return;
    }

    const numeroTicket = "GK-" + Date.now();
    
    // 1. Generar usando el modelo
    const ticket = window.TicketModelo.generar(this.jugadas, numeroTicket);

    // 2. Imprimir usando el módulo de impresión
    window.TicketImprimir.imprimir(ticket);

    // 3. Opcional: Limpiar jugadas tras imprimir
    this.jugadas = [];
    this.mostrarTicket();
    document.getElementById("numero").value = "";
    document.getElementById("animalEncontrado").innerHTML = "";
}
