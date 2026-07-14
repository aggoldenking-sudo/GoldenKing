window.App = {
    ticket: [],

    init() {
        this.cargarTicket();
        this.renderMatriz();
        this.renderTicket();
        document.getElementById('inputRapido').focus();
        this.eventos();
    },

    eventos() {
        // Enter para código rápido
        document.getElementById('inputRapido')
        .addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                let cod = e.target.value.trim();
                // Normaliza códigos de 1 dígito (ej: "5" -> "05"), excepto si es "0"
                if (cod.length === 1 && cod !== "0") {
                    cod = "0" + cod;
                }
                this.buscarCodigo(cod);
                e.target.value = "";
            }
        });

        // Botón agregar
        const agregar = document.getElementById("agregarBtn");
        if (agregar) {
            agregar.onclick = () => {
                let cod = document.getElementById("inputRapido").value.trim();
                if (cod.length === 1 && cod !== "0") {
                    cod = "0" + cod;
                }
                this.buscarCodigo(cod);
                document.getElementById("inputRapido").value = "";
            };
        }

        // Botón limpiar
        const limpiar = document.getElementById("limpiarBtn");
        if (limpiar) {
            limpiar.onclick = () => {
                if (confirm("¿Limpiar ticket completo?")) {
                    this.ticket = [];
                    this.guardarTicket();
                    this.renderTicket();
                }
            };
        }
    },

    buscarCodigo(cod) {
        const tipo = document.getElementById('loteriaSelect').value;
        const items = window.DATA_LOTERIAS[tipo];

        if (items && items[cod]) {
            this.agregarJugada(cod);
        } else {
            alert("Código de animal no válido en esta lotería");
        }
    },

    renderMatriz() {
        const contenedor = document.getElementById('matrizAnimalitos');
        const tipo = document.getElementById('loteriaSelect').value;
        const items = window.DATA_LOTERIAS[tipo];

        if (!contenedor || !items) return;
        contenedor.innerHTML = "";

        Object.keys(items)
        .sort((a, b) => {
            if (a === "00") return -1;
            if (b === "00") return 1;
            return parseInt(a) - parseInt(b);
        })
        .forEach(id => {
            let btn = document.createElement('button');
            btn.className = "btn-animal";
            btn.innerHTML = `<strong>${id}</strong><br>${items[id]}`;

            // NUEVO COMPORTAMIENTO: Carga el código en el input en vez de meterlo al ticket de golpe
            btn.onclick = () => {
                const input = document.getElementById('inputRapido');
                input.value = id;
                input.focus();
            };

            contenedor.appendChild(btn);
        });
    },

    agregarJugada(id) {
        const tipo = document.getElementById('loteriaSelect').value;
        const monto = Number(document.getElementById('montoInput').value);
        const hora = document.getElementById('horarioSelect').value;
        const items = window.DATA_LOTERIAS[tipo];

        if (!monto || monto <= 0) {
            alert("Ingrese un monto válido");
            return;
        }

        // NUEVO COMPORTAMIENTO: Buscar si ya existe la misma jugada (Mismo animal, hora y lotería)
        const jugadaExistente = this.ticket.find(t => t.id === id && t.hora === hora && t.loteria === tipo);

        if (jugadaExistente) {
            // Si ya existe, se le suma el nuevo monto
            jugadaExistente.monto += monto;
        } else {
            // Si es nueva, se agrega al arreglo normalmente
            this.ticket.push({
                id: id,
                nombre: items[id],
                monto: monto,
                hora: hora,
                loteria: tipo
            });
        }

        this.guardarTicket();
        this.renderTicket();
        document.getElementById('inputRapido').focus();
    },

    renderTicket() {
        const tbody = document.querySelector('#ticketTable tbody');
        if (!tbody) return;

        tbody.innerHTML = this.ticket.map((t, i) => {
            return `
            <tr>
                <td><strong>${t.id}</strong> ${t.nombre}</td>
                <td>${t.hora}</td>
                <td>Bs. ${t.monto.toLocaleString("es-VE")}</td>
                <td>
                    <button class="btn-anular" onclick="window.App.remover(${i})">❌</button>
                </td>
            </tr>
            `;
        }).join("");

        this.actualizarTotal();
    },

    remover(i) {
        this.ticket.splice(i, 1);
        this.guardarTicket();
        this.renderTicket();
    },

    actualizarTotal() {
        const total = this.ticket.reduce(
            (suma, jugada) => suma + Number(jugada.monto),
            0
        );

        document.getElementById('totalDisplay').innerText =
            "Total: Bs. " + total.toLocaleString("es-VE");
    },

    guardarTicket() {
        localStorage.setItem("goldenking_ticket", JSON.stringify(this.ticket));
    },

    cargarTicket() {
        const datos = localStorage.getItem("goldenking_ticket");
        if (datos) {
            this.ticket = JSON.parse(datos);
        }
    }
};

window.addEventListener("DOMContentLoaded", () => {
    window.App.init();
});
