window.App = {
    ticket: [],
    
    init() { 
        this.renderMatriz(); 
    },
    
    renderMatriz() {
        const contenedor = document.getElementById('matrizAnimalitos');
        const items = window.DATA_LOTERIAS[document.getElementById('loteriaSelect').value];
        contenedor.innerHTML = "";
        
        // Ordenamos los números numéricamente (00, 0, 01, 02... 75)
        Object.keys(items).sort((a, b) => parseInt(a) - parseInt(b)).forEach(id => {
            let btn = document.createElement('button');
            btn.className = 'btn-animal';
            btn.innerHTML = `<strong>${id}</strong><br>${items[id]}`;
            btn.onclick = () => {
                // Toma el monto directamente del input manual
                const montoManual = parseInt(document.getElementById('montoInput').value) || 0;
                const hora = document.getElementById('horarioSelect').value;
                let premio = window.calcularPremio(document.getElementById('loteriaSelect').value, id, montoManual);
                
                this.ticket.push({id, nombre: items[id], monto: montoManual, premio, hora});
                this.renderTicket();
            };
            contenedor.appendChild(btn);
        });
    },

    renderTicket() {
        const tbody = document.querySelector('#ticketTable tbody');
        tbody.innerHTML = this.ticket.map((t, i) => 
            `<tr>
                <td>${t.id} ${t.nombre}</td>
                <td>${t.hora}</td>
                <td>${t.monto}</td>
                <td><button class="btn-anular" onclick="window.App.remover(${i})">Anular</button></td>
            </tr>`).join('');
        this.actualizarTotal();
    },

    remover(i) { this.ticket.splice(i, 1); this.renderTicket(); },
    
    actualizarTotal() { 
        const total = this.ticket.reduce((a, b) => a + b.monto, 0);
        document.getElementById('totalDisplay').innerText = "Total: " + total; 
    }
};

window.App.init();
