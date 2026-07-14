export function generarTicketHTML(ticket) {
    const total = ticket.reduce((a, b) => a + b.monto, 0);
    return `
        <div style="font-family: monospace;">
            <h3>TICKET GOLDEN KING</h3>
            ${ticket.map(t => `<p>${t.id} - ${t.nombre}: ${t.monto}</p>`).join('')}
            <hr>
            <h4>TOTAL: ${total}</h4>
            <p>PREMIO POTENCIAL: ${total * 30}</p>
        </div>
    `;
}
