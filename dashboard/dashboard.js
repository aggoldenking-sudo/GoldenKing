window.Dashboard = {

    init() {
        this.actualizarHora();
        this.actualizarFecha();

        setInterval(() => {
            this.actualizarHora();
        }, 1000);
    },

    actualizarHora() {
        const hora = document.getElementById("hora");
        if (!hora) return;

        hora.textContent = new Date().toLocaleTimeString();
    },

    actualizarFecha() {
        const fecha = document.getElementById("fecha");
        if (!fecha) return;

        fecha.textContent = new Date().toLocaleDateString();
    },

    actualizarTotal(total) {
        const t = document.getElementById("total");
        if (!t) return;

        t.textContent = total.toFixed(2);
    },

    actualizarCantidad(cantidad) {
        const c = document.getElementById("cantidadJugadas");
        if (!c) return;

        c.textContent = cantidad;
    },

    notificar(mensaje, tipo = "ok") {
        console.log(`[${tipo}] ${mensaje}`);
        // Más adelante aquí podemos mostrar un toast visual.
    }

};
