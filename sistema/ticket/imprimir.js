/**
 * Proyecto Golden King
 * Módulo: js/ticket/imprimir.js
 * Descripción: Control de impresión de tickets.
 */


window.TicketImprimir = (function(){

    'use strict';



    function ventanaImpresion(contenido){


        const ventana =
        window.open(
            "",
            "ticket",
            "width=400,height=600"
        );


        ventana.document.write(`

        <html>

        <head>

        <title>Golden King Ticket</title>

        <style>

        body{

            font-family:monospace;
            font-size:14px;
            padding:10px;

        }


        pre{

            white-space:pre-wrap;

        }


        </style>


        </head>


        <body>

        ${contenido}


        <script>

        window.onload=function(){

            window.print();

        }


        <\/script>


        </body>


        </html>

        `);


        ventana.document.close();


    }





    function descargarTXT(texto,nombre){


        const archivo =
        new Blob(
            [texto],
            {
                type:"text/plain"
            }
        );



        const url =
        URL.createObjectURL(archivo);



        const enlace =
        document.createElement("a");



        enlace.href=url;


        enlace.download=
        nombre+".txt";



        enlace.click();



        URL.revokeObjectURL(url);


    }







    return {


        imprimir(ticket){


            if(!ticket){

                console.error(
                "No existe ticket para imprimir"
                );

                return;

            }


            ventanaImpresion(
                ticket.html
            );


        },



        guardar(ticket){


            if(!ticket) return;



            descargarTXT(

                ticket.texto,

                "GoldenKing-"+ticket.ticket

            );


        }




    };



})();
