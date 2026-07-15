/**
 * Proyecto Golden King
 * Archivo: sistema/ticket/modelo.js
 * Formato ticket térmico
 * 3 jugadas por fila
 */


window.TicketModelo = (function(){

"use strict";



function quitarEmoji(texto){

    if(!texto) return "";

    return texto
    .replace(/[\u{1F300}-\u{1FAFF}]/gu,"")
    .trim();

}




function abreviarAnimal(animal){


    animal = quitarEmoji(animal)
    .toUpperCase();



    const palabras = {

        "BALLENA":"BAL",
        "DELFIN":"DEL",
        "CARNERO":"CAR",
        "TORO":"TOR",
        "CIEMPIES":"CIE",
        "ALACRAN":"ALC",
        "LEON":"LEO",
        "RANA":"RAN",
        "PERICO":"PER",
        "RATON":"RAT",
        "AGUILA":"AGU",
        "TIGRE":"TIG",
        "GATO":"GAT",
        "CABALLO":"CAB",
        "MONO":"MON",
        "PALOMA":"PAL",
        "ZORRO":"ZOR",
        "OSO":"OSO",
        "PAVO":"PAV",
        "BURRO":"BUR",
        "CHIVO":"CHI",
        "COCHINO":"COC",
        "GALLO":"GAL",
        "CAMELLO":"CAM",
        "CEBRA":"CEB",
        "IGUANA":"IGU",
        "GALLINA":"GALL",
        "VACA":"VAC",
        "PERRO":"PER",
        "ZAMURO":"ZAM",
        "ELEFANTE":"ELE",
        "CAIMAN":"CAI",
        "LAPA":"LAP",
        "ARDILLA":"ARD",
        "PESCADO":"PES",
        "VENADO":"VEN",
        "JIRAFA":"JIR",
        "CULEBRA":"CUL"

    };



    return palabras[animal] || animal.substring(0,3);



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

        j.loteria + " " + j.sorteo;



        if(!grupos[clave]){

            grupos[clave]=[];

        }



        grupos[clave].push({

            numero:j.numero,

            animal:
            abreviarAnimal(j.animal),

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



texto += "========================\n";

texto += "      GOLDEN KING\n";

texto += "========================\n\n";



texto +=

"Ticket: "+datos.ticket+"\n";

texto +=

"Fecha: "+datos.fecha+"\n";

texto +=

"Hora: "+datos.hora+"\n\n";



Object.entries(datos.grupos)

.forEach(([grupo,jugadas])=>{



    texto += "\n";

    texto += grupo.toUpperCase()+"\n";

    texto += "------------------------\n\n";





    crearFilas(jugadas)

    .forEach(fila=>{



        let linea="";



        fila.forEach(j=>{


            let item =

            `${j.numero}-${j.animal} x${j.monto}`;



            linea +=

            item.padEnd(12);



        });



        texto += linea+"\n";



    });



});





texto += "\n------------------------\n";



texto +=

"TOTAL Bs. "+datos.total.toFixed(2)+"\n";



texto +=

"------------------------\n\n";



texto +=

"Gracias por su preferencia";





return texto;



}








return {


generar(jugadas,numeroTicket){



let total =

jugadas.reduce(

(t,j)=>t + Number(j.monto),

0

);




let datos={


ticket:numeroTicket,


fecha:fechaActual(),


hora:horaActual(),


grupos:

agruparJugadas(jugadas),


total:total


};




let texto =

generarTexto(datos);





return {


ticket:numeroTicket,

fecha:datos.fecha,

hora:datos.hora,

total:total,

texto:texto,


html:

`
<pre style="font-family:monospace;font-size:13px">
${texto}
</pre>
`


};



}



};


})();
