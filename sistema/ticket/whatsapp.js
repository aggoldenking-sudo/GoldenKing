window.TicketWhatsApp = {
    enviar(ticketData, telefono) {
        // Formateamos el número (quitar espacios o guiones si es necesario)
        const numero = telefono.replace(/\D/g, '');
        // Usamos el texto plano generado por el modelo
        const mensaje = encodeURIComponent(ticketData.texto);
        const url = `https://wa.me/${numero}?text=${mensaje}`;
        
        window.open(url, '_blank');
    }
};
