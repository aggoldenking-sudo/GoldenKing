/**
 * Proyecto Golden King
 * Archivo: sistema/ticket/whatsapp.js
 * Descripción: Envío de tickets por WhatsApp
 */


window.TicketWhatsApp = (function(){

    'use strict';



    function limpiarTexto(texto){

        return texto
        .replace(/[^\w\s\-.:Bs]/gi,"")
        .trim();

    }




    function crearMensaje(ticket){


        let mensaje = "";



        mensaje += "🎰 *GOLDEN KING* 🎰\n";
        mensaje += "Agencia de Apuestas\n";
        mensaje += "--------------------------\n";


        mensaje +=
        "🎫 Ticket: "
        + ticket.ticket
        + "\n";


        mensaje +=
        "📅 Fecha: "
        + ticket.fecha
        + "\n";


        mensaje += "--------------------------\n";



        if(ticket.grupos){


            Object.entries(ticket.grupos)
            .forEach(([grupo,jugadas])=>{


                mensaje += "\n";
                mensaje += "🎲 "
                + grupo
                + "\n";


                jugadas.forEach(j=>{


                    mensaje +=
                    `${j.numero} - ${j.animal} `;


                    mensaje +=
                    `Bs ${j.monto}\n`;


                });


            });


        }



        mensaje += "\n--------------------------\n";


        mensaje +=
        "💰 Total: Bs "
        + ticket.total.toFixed(2)
        + "\n";


        mensaje += "--------------------------\n";


        mensaje +=
        "🍀 Gracias por jugar con Golden King";



        return limpiarTexto(mensaje);


    }







    return {


        enviar(ticket, telefono){


            if(!ticket){

                console.error(
                "No existe ticket"
                );

                return;

            }



            const texto =
            crearMensaje(ticket);



            const numero =
            telefono ?
            telefono.replace(/\D/g,"")
            :
            "";



            const url =

            "https://wa.me/"
            +
            numero
            +
            "?text="
            +
            encodeURIComponent(texto);



            window.open(
                url,
                "_blank"
            );


        },



        generarMensaje(ticket){


            return crearMensaje(ticket);


        }



    };



})();
