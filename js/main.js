// Función simple de login
function intentarLogin() {
    // Aquí luego integraremos una validación real
    alert("Bienvenido al sistema");
    cambiarVista('dashboard');
}

// Función para cambiar de vistas
function cambiarVista(vistaId) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(vistaId).style.display = 'block';
}

// Lógica de carga de juegos (dinámica)
function cargarJuego(nombreJuego) {
    const area = document.getElementById('area-juego');
    area.innerHTML = `<h2>Estás en: ${nombreJuego.toUpperCase()}</h2>
                      <p>Aquí se cargarán los animales o números para apostar.</p>`;
}
