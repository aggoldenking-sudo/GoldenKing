import { DATA_LOTERIAS } from './loterias.js';
import { calcularPremio } from './impresion.js';

window.App = {
    monto: 50,
    ticket: [],
    
    init() { this.renderMatriz(); },
    
    setMonto(m) { 
        this.monto = m; 
        document.getElementById('displayMonto').innerText = m; 
    },
    
    renderMatriz() {
        const tipo = document.getElementById('loteriaSelect').value;
        const contenedor = document.getElementById('matrizAnimalitos');
        contenedor.innerHTML = "";
        const items = DATA_LOTERIAS[tipo] || {};
        
        for (let id in items) {
            let btn = document.createElement('button');
            btn.className = 'btn-animal';
            btn.innerHTML = `<strong>${id}</strong><br>${items[id]}`;
            btn.onclick = () => {
                const hora = document.getElementById('horarioSelect').value;
                let premio = calcularPremio(tipo, id, this.monto);
                this.ticket.push({id, nombre: items[id], monto: this.monto, premio, hora});
                this.renderTicket();
            };
            contenedor.appendChild(btn);
        }
    },

    renderTicket() {
        const tabla = document.getElementById('ticketTable');
        tabla.innerHTML = this.ticket.map((t, i) => 
            `<tr><td>${t.hora} | ${t.id} ${t.nombre}</td><td>${t.monto}</td>
            <td><button onclick="window.App.remover(${i})">X</button></td></tr>`).join('');
        this.actualizarTotal();
    },

    remover(i) { this.ticket.splice(i, 1); this.renderTicket(); },
    
    actualizarTotal() { 
        const total = this.ticket.reduce((a, b) => a + b.monto, 0);
        document.getElementById('totalDisplay').innerText = "Total: " + total; 
    }
};

window.App.init();
