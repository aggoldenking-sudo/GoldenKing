import { DATA_LOTERIAS } from './loterias.js';
import { generarTicketHTML } from './impresion.js';

window.App = {
    monto: 50,
    ticket: [],
    
    init() {
        this.renderMatriz();
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
                this.ticket.push({id, nombre: items[id], monto: this.monto});
                this.actualizarUI();
            };
            contenedor.appendChild(btn);
        }
    },

    actualizarUI() {
        document.getElementById('ticketTable').innerHTML = this.ticket.map((t, i) => 
            `<tr><td>${t.id} ${t.nombre}</td><td>${t.monto}</td><td><button onclick="App.remover(${i})">X</button></td></tr>`).join('');
    },
    
    remover(i) { this.ticket.splice(i, 1); this.actualizarUI(); }
};

window.App.init();
