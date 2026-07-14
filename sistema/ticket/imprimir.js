window.TicketImprimir = {
    imprimir: function(ticketData) {
        const ventana = window.open("", "_blank", "width=400,height=600");
        ventana.document.write(`<html><body>${ticketData.html}<script>window.print();</script></body></html>`);
        ventana.document.close();
    }
};
