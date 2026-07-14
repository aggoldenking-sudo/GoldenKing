window.TicketModelo = (function() {
    'use strict';
    function quitarEmoji(n) { return n.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim(); }
    function agruparJugadas(jugadas) {
        return jugadas.reduce((acc, j) => {
            const key = `${j.loteria} - ${j.hora}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push({ ...j, animal: quitarEmoji(j.animal) });
            return acc;
        }, {});
    }
    function ordenarJugadas(grupos) {
        for (const k in grupos) grupos[k].sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
        return grupos;
    }
    function crearColumnas(jugadas) {
        const filas = [];
        for (let i = 0; i < jugadas.length; i += 3) filas.push(jugadas.slice(i, i + 3));
        return filas;
    }
    function generarTexto(data) {
        let out = "================================\nGOLDEN KING\n================================\n";
        out += `Ticket: ${data.numeroTicket}\nFecha: ${data.fecha}\n`;
        for (const [key, jugadas] of Object.entries(data.grupos)) {
            out += `${key}\n`;
            crearColumnas(jugadas).forEach(f => {
                out += f.map(j => `${j.numero} ${j.animal.padEnd(10)}`.substring(0, 10)).join(" ") + "\n";
            });
        }
        out += `================================\nTOTAL Bs. ${data.total.toFixed(2)}\n================================\nGracias por su preferencia.`;
        return out;
    }
    return {
        generar: function(jugadas, numeroTicket) {
            const fecha = new Date().toLocaleDateString('es-VE');
            const total = jugadas.reduce((sum, j) => sum + Number(j.monto), 0);
            const grupos = ordenarJugadas(agruparJugadas(jugadas));
            const texto = generarTexto({ numeroTicket, fecha, grupos, total });
            return { html: `<pre style="font-family: monospace;">${texto}</pre>`, texto, total, ticket: numeroTicket, fecha };
        }
    };
})();
