window.TicketImprimir = {
    imprimir(ticketData) {
        const ventana = window.open("", "_blank", "width=400,height=600");
        
        ventana.document.write(`
            <html>
                <head>
                    <title>Imprimir Ticket ${ticketData.ticket}</title>
                    <style>
                        body { font-family: monospace; padding: 20px; }
                    </style>
                </head>
                <body>
                    ${ticketData.html}
                    <script>
                        window.onload = () => {
                            window.print();
                            window.close();
                        };
                    </script>
                </body>
            </html>
        `);
        ventana.document.close();
    }
};
