window.App = {
    sorteoSeleccionado: null,

    init() {
        const contenedor = document.getElementById("loteriaLista");
        Object.entries(window.CONFIG_LOTERIAS).forEach(([loteria, horarios]) => {
            let divLote = document.createElement("div");
            divLote.className = "loteria-container";
            divLote.innerHTML = `<strong>${loteria}</strong>`;
            
            horarios.forEach(hora => {
                let btn = document.createElement("button");
                btn.className = "btn-hora";
                btn.innerText = hora;
                btn.onclick = () => {
                    this.sorteoSeleccionado = { loteria, hora };
                    // Quitar clase active a otros
                    document.querySelectorAll('.btn-hora').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                };
                divLote.appendChild(btn);
            });
            contenedor.appendChild(divLote);
        });
    },

    agregarDirecto() {
        if (!this.sorteoSeleccionado) return alert("Selecciona un sorteo primero");
        // ... (el resto de tu lógica para agregar al ticket)
    }
};
