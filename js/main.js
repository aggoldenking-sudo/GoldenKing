// main.js - Lógica centralizada para Golden King

let ticketActual = []; // Aquí guardaremos las jugadas antes de imprimir

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema Golden King iniciado.");
});

// Navegación entre vistas
function cambiarVista(vistaId) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(vistaId).style.display = 'block';
}

// Login simple
function intentarLogin() {
    // Aquí puedes añadir validación real de usuario
    cambiarVista('dashboard');
}

// Cargar juego y opciones
function cargarJuego(tipoJuego) {
    const juego = CONFIGURACION_JUEGOS[tipoJuego];
    const area = document.getElementById('area-juego');
    
    let html = `<h2>${juego.titulo}</h2>`;
    html += `<div id="grid-juego" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">`;
    
    juego.opciones.forEach(op => {
        html += `<button onclick="agregarAlTicket('${op.nombre}', 100)">${op.nombre}</button>`;
    });
    
    html += `</div>`;
    html += `<div id="resumen-ticket" style="margin-top: 20px; border-top: 2px solid #d4af37; padding-top: 10px;">
                <h3>Ticket Actual</h3>
                <ul id="lista-jugadas"></ul>
                <p><strong>Total: $<span id="total-ticket">0</span></strong></p>
                <button onclick="procesarVenta()" style="background:green;">Procesar Venta</button>
             </div>`;
             
    area.innerHTML = html;
}

// Lógica de Ticket
function agregarAlTicket(nombre, monto) {
    ticketActual.push({ nombre, monto });
    actualizarVistaTicket();
}

function actualizarVistaTicket() {
    const lista = document.getElementById('lista-jugadas');
    const totalSpan = document.getElementById('total-ticket');
    
    lista.innerHTML = ticketActual.map(item => `<li>${item.nombre} - $${item.monto}</li>`).join('');
    const total = ticketActual.reduce((acc, curr) => acc + curr.monto, 0);
    totalSpan.innerText = total;
}

function procesarVenta() {
    if (ticketActual.length === 0) return alert("El ticket está vacío");
    
    console.log("Guardando venta:", ticketActual);
    alert("¡Venta procesada con éxito!");
    
    // Limpiar ticket
    ticketActual = [];
    actualizarVistaTicket();
}
