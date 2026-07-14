window.App = {
    ticket: [],
    seleccionados: [],
    codigoPendiente: null,

    init() {
        const select = document.getElementById('loteriaSelect');
        Object.keys(window.DATA_LOTERIAS).forEach(l => {
            select.innerHTML += `<option value="${l}">${l}</option>`;
        });
        
        this.cargarTicket();
        this.renderMatriz();
        this.renderTicket();

        // Enfocar campo de código al iniciar
        document.getElementById("codigoAnimal").focus();
    },

    renderMatriz() {
        const contenedor = document.getElementById('matrizAnimalitos');
        const tipo = document.getElementById('loteriaSelect').value;
        const items = window.DATA_LOTERIAS[tipo];
        contenedor.innerHTML = "";

        Object.keys(items).sort((a,b) => (Number(a)||0) - (Number(b)||0)).forEach(id => {
            let btn = document.createElement("button");
            btn.className = "btn-animal";
            btn.innerHTML = `<strong>${id}</strong><br>${items[id]}`;
            btn.onclick = () => {
                if(this.seleccionados.includes(id)){
                    this.seleccionados = this.seleccionados.filter(x => x !== id);
                    btn.classList.remove("seleccionado");
                } else {
                    this.seleccionados.push(id);
                    btn.classList.add("seleccionado");
                }
            };
            contenedor.appendChild(btn);
        });
    },

    agregarSeleccion() {
        if(this.seleccionados.length === 0) return alert("Seleccione animales");
        const monto = Number(document.getElementById('montoInput').value);
        const hora = document.getElementById('horarioSelect').value;
        const tipo = document.getElementById('loteriaSelect').value;

        this.seleccionados.forEach(id => {
            let existe = this.ticket.find(t => t.id === id && t.hora === hora && t.loteria === tipo);
            if(existe) existe.monto += monto;
            else this.ticket.push({id, nombre: window.DATA_LOTERIAS[tipo][id], monto, hora, loteria: tipo});
        });

        this.seleccionados = [];
        this.guardarTicket();
        this.renderMatriz();
        this.renderTicket();
        document.getElementById("codigoAnimal").focus();
    },

    renderTicket() {
        const tbody = document.querySelector("#ticketTable tbody");
        tbody.innerHTML = this.ticket.map((t,i) => `
            <tr><td>${t.id} ${t.nombre}</td><td>${t.hora}</td><td>${t.monto}</td>
            <td><button onclick="window.App.remover(${i})">X</button></td></tr>
        `).join("");
        
        const total = this.ticket.reduce((suma,t) => suma + t.monto, 0);
        document.getElementById("totalDisplay").innerText = "Total: Bs. " + total;
    },

    remover(i){ this.ticket.splice(i,1); this.guardarTicket(); this.renderTicket(); },

    limpiarTodo(){
        if(confirm("¿Limpiar todo el ticket?")){
            this.ticket = []; this.guardarTicket(); this.renderTicket();
        }
    },

    guardarTicket(){ localStorage.setItem("goldenking_ticket", JSON.stringify(this.ticket)); },

    cargarTicket(){
        const datos = localStorage.getItem("goldenking_ticket");
        if(datos) this.ticket = JSON.parse(datos);
    },

    imprimirTicket(){
        if(this.ticket.length === 0) return alert("No hay jugadas");
        const total = this.ticket.reduce((suma,t) => suma + t.monto, 0);
        
        // Aquí podrías agregar la lógica para guardar en historial antes de limpiar
        window.Impresion.generarTicket(this.ticket, total);
        this.limpiarTodo();
    }
};

// Lógica de Teclado (Doble Enter)
document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const campo = document.activeElement;

    if (campo.id === "codigoAnimal") {
        e.preventDefault();
        const codigo = campo.value.trim();
        const tipo = document.getElementById("loteriaSelect").value;
        if(window.DATA_LOTERIAS[tipo][codigo]) {
            window.App.codigoPendiente = codigo;
            document.getElementById("montoInput").focus();
            document.getElementById("montoInput").select();
        }
        return;
    }

    if (campo.id === "montoInput") {
        e.preventDefault();
        if (window.App.codigoPendiente) {
            const codigo = window.App.codigoPendiente;
            const monto = Number(campo.value);
            const hora = document.getElementById("horarioSelect").value;
            const loteria = document.getElementById("loteriaSelect").value;
            
            let existe = window.App.ticket.find(t => t.id === codigo && t.hora === hora && t.loteria === loteria);
            if(existe) existe.monto += monto;
            else window.App.ticket.push({id: codigo, nombre: window.DATA_LOTERIAS[loteria][codigo], monto, hora, loteria});

            window.App.guardarTicket();
            window.App.renderTicket();
            document.getElementById("codigoAnimal").value = "";
            document.getElementById("codigoAnimal").focus();
            window.App.codigoPendiente = null;
        }
    }
});

window.onload = () => window.App.init();
