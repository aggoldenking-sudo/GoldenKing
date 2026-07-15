/**
 * Proyecto Golden King
 * Archivo: sistema/ticket/modelo.js
 * Generador de tickets
 */


window.TicketModelo = (function(){

"use strict";



function quitarEmoji(texto){

    if(!texto) return "";

    return texto
    .replace(/[\u{1F300}-\u{1FAFF}]/gu,"")
    .trim();

}




function formatoFecha(){

    return new Date()
    .toLocaleDateString("es-VE");

}




function formatoHora(){

    return new Date()
    .toLocaleTimeString("es-VE",{

        hour:"2-digit",
        minute:"2-digit"

    });

}




function agrupar(jugadas){


    let grupos={};



    jugadas.forEach(j=>{


        let clave =
        j.loteria;



        if(!grupos[clave]){

            grupos[clave]=[];

        }



        grupos[clave].push({

            hora:j.hora,

            numero:j.numero,

            animal:
            quitarEmoji(j.animal),

            monto:
            Number(j.monto)


        });



    });



    return grupos;


}







function generarTexto(datos){



let texto = "";



texto += "================================\n";

texto += "        GOLDEN KING\n";

texto += "   AGENCIA DE APUESTAS\n";

texto += "================================\n";


texto +=

`Ticket: ${datos.ticket}\n`;

texto +=

`Fecha: ${datos.fecha}\n`;

texto +=

`Hora: ${datos.hora}\n`;



texto += "--------------------------------\n";





Object.entries(datos.grupos)

.forEach(([loteria,jugadas])=>{


    texto += "\n";

    texto += loteria+"\n";

    texto += "--------------------------------\n";



    jugadas.forEach(j=>{


        texto +=

        `${j.hora}\n`;


        texto +=

        `${j.numero} ${j.animal}`;

        texto +=

        `   Bs ${j.monto.toFixed(2)}\n\n`;



    });



});




texto += "================================\n";


texto +=

`TOTAL Bs. ${datos.total.toFixed(2)}\n`;


texto += "================================\n";


texto +=

"Gracias por su preferencia.\n";


texto +=

"Conserve su ticket.";



return texto;



}








return {


generar(jugadas,numeroTicket){



let total =

jugadas.reduce(

(s,j)=>

s + Number(j.monto),

0

);



let datos={


ticket:
numeroTicket,


fecha:
formatoFecha(),


hora:
formatoHora(),


grupos:
agrupar(jugadas),


total:
total



};



let texto =
generarTexto(datos);



return {


ticket:
numeroTicket,


fecha:
datos.fecha,


hora:
datos.hora,


total:
total,


texto:
texto,


html:

`<pre>${texto}</pre>`


};



}



};



})();
