window.App = {
    ticket: [],
    
    init() { 
        this.renderMatriz(); 
        document.getElementById('inputRapido').focus();
    },
    
    renderMatriz() {
        const contenedor = document.getElementById('matrizAnimalitos');
        const items = window.DATA_LOTERIAS[document.getElementById('loteriaSelect').value];
        contenedor.innerHTML = "";
        Object.keys(items).sort((a, b) => parseInt(a) - parseInt(b)).forEach(id => {
            let btn = document.createElement('button');
            btn.className = 'btn-animal';
            btn.innerHTML = `<strong>${id}</strong><br>${items[id]}`;
            btn.onclick = () => this.agregarJugada(id);
            contenedor.appendChild(btn);
        });
    },

    agregarJugada(id) {
        const tipo = document.getElementById('loteriaSelect').value;
        const monto = parseInt(document.getElementById('montoInput').value) || 0;
        const hora = document.getElementById('horarioSelect').value;
        const items = window.DATA_LOTERIAS[tipo];
        
        this.ticket.push({id, nombre: items[id], monto, hora});
        this.renderTicket();
        document.getElementById('inputRapido').focus();
    },

    renderTicket() {
        const tbody = document.querySelector('#ticketTable tbody');
        tbody.innerHTML = this.ticket.map((t, i) => `<tr><td>${t.id} ${t.nombre}</td><td>${t.hora}</td><td>${t.monto}</td><td><button class="btn-anular" onclick="window.App.remover(${i})">X</button></td></tr>`).join('');
        this.actualizarTotal();
    },

    remover(i) { this.ticket.splice(i, 1); this.renderTicket(); },
    
    actualizarTotal() { 
        document.getElementById('totalDisplay').innerText = "Total: " + this.ticket.reduce((a, b) => a + b.monto, 0); 
    }
};

// Listener para el Enter
document.getElementById('inputRapido').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        const cod = this.value;
        const items = window.DATA_LOTERIAS[document.getElementById('loteriaSelect').value];
        if(items[cod]) {
            window.App.agregarJugada(cod);
            this.value = "";
        }
    }
});

window.App.init();
