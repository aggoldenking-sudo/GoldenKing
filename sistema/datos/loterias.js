/*
=====================================================
 GOLDEN KING
 SISTEMA DE TAQUILLA
 sistema.js
=====================================================
*/


window.Taquilla = {


    jugadas: [],

    sorteosSeleccionados: [],



    init(){


        this.cargarSorteos();


        this.cargarEventos();


        this.actualizarTicket();


        this.reloj();



        setInterval(()=>{

            this.reloj();

        },1000);



    },





    /* ==========================
       CARGAR SORTEOS
    ========================== */


    cargarSorteos(){


        const contenedor =
        document.getElementById("sorteos");



        if(!contenedor || !window.LOTERIAS)

        return;



        let html="";




        LOTERIAS.forEach(loteria=>{


            if(!loteria.activa)

            return;



            html += `


            <div class="grupo-loteria">


                <h4>

                ${loteria.nombre}

                </h4>


            `;




            loteria.sorteos.forEach(sorteo=>{


                if(!sorteo.activo)

                return;



                html += `


                <label class="sorteo">


                    <input

                    type="checkbox"

                    class="check-sorteo"

                    data-id="${sorteo.id}"

                    data-nombre="${sorteo.nombre}"

                    data-hora="${sorteo.hora}">


                    ${sorteo.hora}


                </label>


                `;


            });



            html += `</div>`;



        });





        contenedor.innerHTML = html;




        document

        .querySelectorAll(".check-sorteo")

        .forEach(check=>{


            check.onchange=()=>{


                this.seleccionarSorteo(check);


            };


        });



    },






    seleccionarSorteo(check){



        let existe =

        this.sorteosSeleccionados

        .find(

        s=>s.id===check.dataset.id

        );





        if(check.checked){



            if(!existe){


                this.sorteosSeleccionados.push({


                    id:check.dataset.id,

                    nombre:check.dataset.nombre,

                    hora:check.dataset.hora


                });


            }



        }else{


            this.sorteosSeleccionados =

            this.sorteosSeleccionados

            .filter(

            s=>s.id!==check.dataset.id

            );

        }





    },








    /* ==========================
       EVENTOS
    ========================== */


    cargarEventos(){



        const agregar =

        document.getElementById("agregar");



        if(agregar){


            agregar.onclick=()=>{


                this.agregarJugada();


            };


        }






        const numeros =

        document.getElementById("numeros");




        if(numeros){



            numeros.addEventListener(

            "keydown",

            e=>{


                if(e.key==="Enter"){


                    e.preventDefault();


                    this.agregarJugada();


                }


            });



        }





    },









    /* ==========================
       AGREGAR JUGADA
    ========================== */


    agregarJugada(){



        let numeros =

        document

        .getElementById("numeros")

        .value;



        let monto =

        Number(

        document

        .getElementById("monto")

        .value

        );





        if(this.sorteosSeleccionados.length===0){


            alert("Seleccione un sorteo");


            return;


        }





        if(!numeros){


            alert("Ingrese números");


            return;


        }





        if(!monto || monto<=0){


            alert("Ingrese monto");


            return;


        }






        let lista =

        numeros

        .split(/[\s,]+/)

        .filter(n=>n);







        this.sorteosSeleccionados.forEach(sorteo=>{


            lista.forEach(numero=>{


                this.jugadas.push({


                    sorteo:sorteo.nombre,

                    hora:sorteo.hora,

                    numero,

                    monto


                });



            });



        });






        this.actualizarTicket();



        document.getElementById("numeros").value="";



    },









    /* ==========================
       TICKET
    ========================== */


    actualizarTicket(){



        const ticket =

        document.getElementById("ticket");



        const total =

        document.getElementById("total");





        if(!ticket)

        return;





        if(this.jugadas.length===0){



            ticket.innerHTML=

            `

            <p class="vacio">

            No hay jugadas

            </p>

            `;



            total.textContent="0.00";


            return;


        }





        let html="";

        let suma=0;






        this.jugadas.forEach((j,index)=>{



            suma += j.monto;



            html += `


            <div class="fila-ticket">


            <b>${j.sorteo}</b>


            <br>


            🕒 ${j.hora}


            <br>


            🎯 ${j.numero}


            <br>


            💰 ${j.monto} Bs



            <button onclick="Taquilla.eliminar(${index})">

            ❌

            </button>


            </div>


            `;



        });





        ticket.innerHTML=html;


        total.textContent=

        suma.toFixed(2);



    },









    eliminar(index){


        this.jugadas.splice(index,1);


        this.actualizarTicket();


    },









    reloj(){



        const hora=

        document.getElementById("hora");



        if(hora){


            hora.textContent=

            new Date()

            .toLocaleTimeString();


        }


    }




};






document.addEventListener(

"DOMContentLoaded",

()=>{


    Taquilla.init();


});
