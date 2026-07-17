// main.js - El corazón de Golden King

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema Golden King iniciado correctamente.");
    
    // Aquí inicializaremos funciones como:
    // 1. Verificar si hay un usuario logueado
    // 2. Cargar el menú de juegos
    // 3. Preparar la pantalla de ventas
    
    iniciarSistema();
});

function iniciarSistema() {
    // Por ahora, solo mostraremos un mensaje en consola
    // para confirmar que el JS está conectado.
    console.log("Cargando módulos de gestión...");
}

// Función para cambiar de vistas sin recargar la página
function cambiarVista(vistaId) {
    const vistas = document.querySelectorAll('.view');
    vistas.forEach(v => v.style.display = 'none');
    
    const vistaActiva = document.getElementById(vistaId);
    if (vistaActiva) {
        vistaActiva.style.display = 'block';
    }
}
