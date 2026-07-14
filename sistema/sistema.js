/**
 * Proyecto Golden King
 * Archivo: sistema/sistema.js
 * Control principal de taquilla
 */

window.Taquilla = {
    sorteos: [],
    jugadas: [],

    init() {
        // Verificación de seguridad: esperar a que el DOM esté cargado
        if (!document.getElementById("listaSorteos")) {
            console.error("Error: Elemento 'listaSorteos' no encontrado en el DOM.");
            return;
        }

        this.cargarSorteos();

        document.getElementById("numero").addEventListener("input", () => this.mostrarAnimal());
        document.getElementById("agregar").onclick = () => this.agregarJugada();
        document.getElementById("imprimir").onclick = () => this.imprimir();
    },

    cargarSorteos() {
        const lista = document.getElementById("listaSorteos");
        const loterias = ["LOTTO ACTIVO", "LA GRANJITA", "SELVA PLUS", "GUACHARO ACTIVO"];
        const horarios = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

        loterias.forEach(loteria => {
            const titulo = document.createElement("h3");
            titulo.textContent = loteria;
            lista.appendChild(titulo);

            horarios.forEach(hora => {
                const boton = document.createElement("button");
                boton.className = "btn-sorteo";
                boton.textContent = hora;
                boton.onclick = () => {
                    boton.classList.toggle("active");
                    const existe = this.sorteos.find(s => s.loteria === loteria && s.hora === hora);

                    if (existe) {
                        this.sorteos = this.sorteos.filter(s => !(s.loteria === loteria && s.hora === hora));
                    } else {
                        this.sorteos.push({ loteria, hora });
                    }
                    this.mostrarAnimal();
                };
                lista.appendChild(boton);
            });
        });
    },

    buscarAnimal(loteria, numero) {
        // Asegúrate de que DATA_LOTERIAS esté cargado globalmente antes que este script
        if (typeof DATA_LOTERIAS === 'undefined') return null;

        const tablas = {
            "LOTTO ACTIVO": DATA_LOTERIAS.LottoActivo,
            "LA GRANJITA": DATA_LOTERIAS.Granjita,
            "SELVA PLUS": DATA_LOTERIAS.SelvaPlus,
            "GUACHARO ACTIVO": DATA_LOTERIAS.Guacharo
        };

        const tabla = tablas[loteria];
        return (tabla && tabla[numero]) ? tabla[numero] : null;
    },

    mostrarAnimal() {
        const numero = document.getElementById("numero").value.trim();
        const caja = document.getElementById("animalEncontrado");
        caja.innerHTML = "";

        if (numero === "") return;
        if (this.sorteos.length === 0) {
            caja.innerHTML = "⚠️ Seleccione sorteo";
            return;
        }

        let encontrado = false;
        this.sorteos.forEach(s => {
            const animal = this.buscarAnimal(s.loteria, numero);
            if (animal) {
                caja.innerHTML += `🐾 ${animal}<br>🎰 ${s.loteria}<br>⏰ ${s.hora}<br><br>`;
                encontrado = true;
            }
        });

        if (!encontrado) caja.innerHTML = "❌ Número no existe";
    },

    agregarJugada() {
        const numero = document.getElementById("numero").value.trim();
        const monto = Number(document.getElementById("monto").value);

        if (this.sorteos.length === 0) return alert("Seleccione sorteo");
        if (numero === "") return alert("Ingrese número");
        if (!monto || monto <= 0) return alert("Ingrese monto válido");

        this.sorteos.forEach(s => {
            const animal = this.buscarAnimal(s.loteria, numero);
            if (animal) {
                this.jugadas.push({ tipo: "Animalitos", loteria: s.loteria, hora: s.hora, numero, animal, monto });
            }
        });

        this.mostrarTicket();
    },

    mostrarTicket() {
        const caja = document.getElementById("ticket");
        caja.innerHTML = "";
        let total = 0;

        this.jugadas.forEach(j => {
            total += Number(j.monto);
            caja.innerHTML += `<div class="ticket-item"><b>${j.loteria}</b><br>${j.hora}<br>${j.numero} ${j.animal}<br>Bs ${j.monto}</div><hr>`;
        });

        document.getElementById("total").textContent = total.toFixed(2);
    },

    imprimir() {
        if (this.jugadas.length === 0) return alert("No hay jugadas");

        // Uso de TicketModelo y TicketImprimir (deben estar cargados)
        const ticketData = window.TicketModelo.generar(this.jugadas, "GK-" + Date.now());
        window.TicketImprimir.imprimir(ticketData);

        // Limpiar para siguiente venta
        this.jugadas = [];
        this.mostrarTicket();
    }
};

// Ejecución al cargar
document.addEventListener("DOMContentLoaded", () => {
    Taquilla.init();
});
            
