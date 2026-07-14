/**
 * Proyecto Golden King
 * Módulo: js/ticket/modelo.js
 * Descripción: Modelo generador de tickets.
 */

window.TicketModelo = (function () {

    'use strict';


    function limpiarAnimal(nombre) {

        if (!nombre) return "";

        return nombre
        .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
        .trim();

    }



    function agruparJugadas(jugadas) {

        return jugadas.reduce((grupos, jugada)=>{


            const clave =
            `${jugada.loteria || "SIN LOTERIA"} - ${jugada.hora || ""}`;


            if(!grupos[clave]){
                grupos[clave] = [];
            }


            grupos[clave].push({

                tipo:
                jugada.tipo || "Animalitos",

                numero:
                String(jugada.numero).padStart(2,"0"),

                animal:
                limpiarAnimal(jugada.animal),

                monto:
                Number(jugada.monto) || 0

            });


            return grupos;


        },{});

    }




    function ordenar(grupos){


        Object.keys(grupos).forEach(key=>{


            grupos[key].sort((a,b)=>{

                return Number(a.numero)-Number(b.numero);

            });


        });


        return grupos;

    }




    function crearFilas(lista){


        let filas=[];


        for(let i=0;i<lista.length;i+=3){

            filas.push(lista.slice(i,i+3));

        }


        return filas;

    }





    function generarTexto(datos){


        let texto="";


        texto += "==============================\n";
        texto += "        GOLDEN KING\n";
        texto += "      AGENCIA DE APUESTAS\n";
        texto += "==============================\n";


        texto += `Ticket: ${datos.numeroTicket}\n`;
        texto += `Fecha: ${datos.fecha}\n`;


        texto += "------------------------------\n";



        Object.entries(datos.grupos).forEach(([grupo,jugadas])=>{


            texto += grupo+"\n";
            texto += "------------------------------\n";


            crearFilas(jugadas).forEach(fila=>{


                fila.forEach(j=>{


                    texto +=
                    `${j.numero} ${j.animal}\n`;

                    texto +=
                    `   Bs ${j.monto.toFixed(2)}\n`;


                });


            });



        });



        texto += "==============================\n";
        texto +=
        `TOTAL Bs ${datos.total.toFixed(2)}\n`;

        texto += "==============================\n";

        texto +=
        "Gracias por jugar en Golden King\n";

        texto +=
        "Conserve su ticket\n";


        return texto;

    }





    function generarHTML(texto){


        return `

        <pre style="
        font-family:monospace;
        font-size:14px;
        white-space:pre-wrap;
        ">
        ${texto}
        </pre>

        `;


    }







    return {


        generar(jugadas,numeroTicket){


            const fecha =
            new Date()
            .toLocaleDateString("es-VE");



            const total = jugadas.reduce(
                (suma,jugada)=>
                suma + (Number(jugada.monto)||0),
                0
            );



            const grupos =
            ordenar(
                agruparJugadas(jugadas)
            );



            const texto =
            generarTexto({

                numeroTicket,
                fecha,
                grupos,
                total

            });



            return {


                ticket:
                numeroTicket,


                fecha,


                total,


                texto,


                html:
                generarHTML(texto),


                grupos


            };


        }



    };



})();
