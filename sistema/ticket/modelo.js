/**
 * Proyecto Golden King
 * Archivo: sistema/ticket/modelo.js
 * Generador de tickets con 3 columnas
 */


window.TicketModelo = (function(){

"use strict";



function quitarEmoji(texto){

    if(!texto) return "";

    return texto
    .replace(/[\u{1F300}-\u{1FAFF}]/gu,"")
    .trim();

}





function fechaActual(){

    return new Date()
    .toLocaleDateString("es-VE");

}




function horaActual(){

    return new Date()
    .toLocaleTimeString("es-VE",{

        hour:"2-digit",
        minute:"2-digit"

    });

}





function agruparJugadas(jugadas){


    let grupos={};



    jugadas.forEach(j=>{


        let clave =

        j.loteria + " - " + j.hora;



        if(!grupos[clave]){

            grupos[clave]=[];

        }



        grupos[clave].push({

            numero:
            j.numero,


            animal:
            quitarEmoji(j.animal),


            monto:
            Number(j.monto)


        });



    });



    return grupos;


}







function crearFilas(lista){


    let filas=[];



    for(let i=0;i<lista.length;i+=3){


        filas.push(
            lista.slice(i,i+3)
        );


    }



    return filas;


}







function generarTexto(datos){



let texto="";



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

.forEach(([grupo,jugadas])=>{



    let partes =
    grupo.split(" - ");



    let loteria =
    partes[0];


    let hora =
    partes[1];



    texto += "\n";

    texto += loteria+"\n";

    texto += hora+"\n";

    texto += "--------------------------------\n";





    crearFilas(jugadas)

    .forEach(fila=>{



        let linea="";



        fila.forEach(j=>{


            let animal =

            `${j.numero} ${j.animal}`;



            linea +=

            animal.padEnd(16);



        });



        texto += linea+"\n";



    });



    if(jugadas.length>0){


        texto +=

        `Bs ${jugadas[0].monto.toFixed(2)} c/u\n`;

    }



});





texto += "\n================================\n";

texto +=

`TOTAL Bs. ${datos.total.toFixed(2)}\n`;

texto +=

"================================\n";

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

(total,j)=>

total + Number(j.monto),

0

);




let datos={


ticket:
numeroTicket,


fecha:
fechaActual(),


hora:
horaActual(),


grupos:
agruparJugadas(jugadas),


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

`<pre style="font-family:monospace;font-size:14px">${texto}</pre>`


};



}



};



})();
