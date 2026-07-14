window.Impresion = {

    generarTicket(ticket, total) {


        const ventana = window.open(
            '',
            '_blank',
            'width=320,height=700'
        );



        const serial =

        Math.floor(
            Math.random() * 900000000000
        ) + 100000000000;



        const ticketNo =

        Math.floor(
            Math.random() * 900000000000
        ) + 100000000000;



        const fecha =

        new Date().toLocaleDateString();



        const hora =

        new Date().toLocaleTimeString();



        let detalle = "";



        ticket.forEach(t => {


            detalle +=

`${t.id} ${t.nombre}
Sorteo: ${t.hora}
Monto: Bs. ${t.monto}
-----------------------------
`;


        });




        ventana.document.write(`

<!DOCTYPE html>

<html>

<head>

<title>Ticket Golden King</title>


<style>


body {

    font-family:'Courier New', monospace;

    width:280px;

    margin:auto;

    font-size:13px;

}



.center {

    text-align:center;

}



.linea {

    border-top:1px dashed black;

    margin:8px 0;

}



h2 {

    margin:0;

}



</style>


</head>


<body>


<div class="center">


<h2>👑 GOLDEN KING</h2>

CENTRO DE APUESTAS


<div class="linea"></div>



FECHA: ${fecha}

<br>

HORA: ${hora}



<div class="linea"></div>


SERIAL:

${serial}


<br>


TICKET:

${ticketNo}



<div class="linea"></div>



${detalle}



<div class="linea"></div>


TOTAL VENTA

Bs. ${total.toFixed(2)}



<div class="linea"></div>


VERIFIQUE SU TICKET

CADUCA EN 3 DIAS



<br><br>


¡SUERTE!


</div>



</body>


</html>


        `);



        ventana.document.close();


        ventana.focus();


        ventana.print();


        ventana.close();


    }

};
