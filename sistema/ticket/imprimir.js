/**
 * Proyecto Golden King
 * Archivo: sistema/ticket/imprimir.js
 * Impresión de ticket térmico
 */


window.TicketImprimir = {


    imprimir(ticketData){


        const ventana =
        window.open(
            "",
            "_blank",
            "width=350,height=600"
        );



        ventana.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

        <title>Golden King Ticket</title>


        <style>

        @page{

            size:80mm auto;
            margin:0;

        }


        body{

            margin:0;
            padding:0;

            font-family:
            "Courier New",
            monospace;

            background:white;

            color:black;

        }



        .ticket-container{

            width:80mm;

            padding:5mm;

        }



        pre{

            font-family:
            "Courier New",
            monospace;

            font-size:13px;

            white-space:pre-wrap;

            margin:0;

        }


        </style>


        </head>


        <body>


        <div class="ticket-container">


        ${ticketData.html}


        </div>



        <script>


        window.onload=function(){

            window.print();

            window.close();

        }


        </script>


        </body>


        </html>


        `);



        ventana.document.close();



    }



};
