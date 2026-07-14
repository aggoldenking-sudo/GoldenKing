window.Impresion = {

    generarTicket(ticket, total) {


        const v = window.open(
            '',
            '_blank',
            'width=320,height=700'
        );


        const serial =
        Math.floor(Math.random() * 900000000000) + 100000000000;


        const ticketNo =
        Math.floor(Math.random() * 900000000000) + 100000000000;


        const fecha =
        new Date().toLocaleDateString();


        const horaVenta =
        new Date().toLocaleTimeString();



        // AGRUPAR POR LOTERIA Y HORA

        let grupos = {};



        ticket.forEach(t => {


            let clave = t.loteria + "|" + t.hora;



            if(!grupos[clave]){


                grupos[clave] = {

                    loteria:t.loteria,

                    hora:t.hora,

                    jugadas:[]

                };


            }



            grupos[clave].jugadas.push(t);



        });




        let detalle = "";



        Object.values(grupos).forEach(g=>{


            detalle += `


            <tr>

            <td colspan="2">

            <b>${g.loteria} - ${g.hora}</b>

            </td>


            </tr>



            `;



            g.jugadas.forEach(t=>{


                detalle += `


                <tr>


                <td>

                ${t.id} ${t.nombre}

                </td>


                <td align="right">

                Bs.${Number(t.monto).toFixed(2)}

                </td>


                </tr>



                `;



            });



            detalle += `


            <tr>

            <td colspan="2">

            ----------------------------

            </td>

            </tr>



            `;



        });





        v.document.write(`


<html>

<head>

<style>


body{

width:280px;

margin:auto;

font-family:'Courier New',monospace;

font-size:13px;

color:#000;

}



.center{

text-align:center;

}



.linea{

border-top:1px dashed #000;

margin:8px 0;

}



table{

width:100%;

border-collapse:collapse;

}



td{

padding:3px 0;

}



.total{

font-size:18px;

font-weight:bold;

text-align:right;

}



.titulo{

font-size:20px;

font-weight:bold;

}



</style>

</head>



<body>



<div class="center">


<div class="titulo">

👑 GOLDEN KING

</div>


CENTRO DE APUESTAS



<div class="linea"></div>



FECHA: ${fecha}

<br>

HORA: ${horaVenta}



<div class="linea"></div>



SERIAL:

<br>

${serial}



<br><br>



TICKET:

<br>

${ticketNo}



<div class="linea"></div>



</div>





<table>


${detalle}


</table>




<div class="linea"></div>




TOTAL JUGADAS:

${ticket.length}




<div class="total">


TOTAL:

<br>

Bs.${Number(total).toFixed(2)}


</div>




<div class="linea"></div>



<div class="center">


VERIFIQUE SU TICKET

<br>

CADUCA EN 3 DIAS


<br><br>


¡SUERTE!


</div>



</body>


</html>



        `);



        v.document.close();


        v.focus();



        setTimeout(()=>{


            v.print();


            v.close();


        },500);



    }


};
