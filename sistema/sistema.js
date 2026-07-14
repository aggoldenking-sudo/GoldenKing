window.Taquilla = {
    sorteos: [], jugadas: [],
    init() {
        this.cargarSorteos();
        document.getElementById("numero").addEventListener("input", () => this.mostrarAnimal());
        document.getElementById("agregar").onclick = () => this.agregarJugada();
        document.getElementById("imprimir").onclick = () => this.imprimir();
    },
    cargarSorteos() { /* ... tu código original ... */ },
    buscarAnimal(l, n) { return DATA_LOTERIAS?.[l === "LOTTO ACTIVO" ? "LottoActivo" : l === "LA GRANJITA" ? "Granjita" : l === "SELVA PLUS" ? "SelvaPlus" : "Guacharo"]?.[n] || null; },
    mostrarAnimal() { /* ... tu lógica ... */ },
    agregarJugada() { 
        const numero = document.getElementById("numero").value.trim();
        const monto = Number(document.getElementById("monto").value);
        if(this.sorteos.length === 0) return alert("Seleccione sorteo");
        this.sorteos.forEach(s => {
            const animal = this.buscarAnimal(s.loteria, numero);
            if(animal) this.jugadas.push({ loteria: s.loteria, hora: s.hora, numero, animal, monto });
        });
        this.mostrarTicket();
    },
    mostrarTicket() { /* ... tu lógica ... */ },
    imprimir() {
        if(this.jugadas.length === 0) return alert("No hay jugadas");
        const ticketData = window.TicketModelo.generar(this.jugadas, "GK-" + Date.now());
        window.TicketImprimir.imprimir(ticketData);
        this.jugadas = [];
        this.mostrarTicket();
    }
};
document.addEventListener("DOMContentLoaded", () => Taquilla.init());
