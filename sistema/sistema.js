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
       SORTEOS
    ========================== */


    cargarSorteos(){


        const contenedor =
        document.getElementById("sorteos");



        if(!contenedor)

        return;



        if(!window.LOTERIAS){


            contenedor.innerHTML =
            "No hay loterías configuradas";


            return;


        }



        let html="";




        LOTERIAS.forEach(loteria=>{


            if(!loteria.activa)

            return;



            html += `

            <div class="grupo-sorteo">


            <b>${loteria.nombre}</b>

            <br>

            `;




            if(loteria.sorteos){


                loteria.sorteos.forEach(sorteo=>{


                    if(!sorteo.activo)

                    return;



                    html += `


                    <label>


                    <input

                    type="checkbox"

                    class="check-sorteo"

                    data-id="${sorteo.id}"

                    data-nombre="${sorteo.nombre}"

                    data-hora="${sorteo.hora}">


                    ${sorteo.hora}


                    </label>


                    <br>


                    `;



                });


            }



            html += `</div>`;



        });




        contenedor.innerHTML=html;






        document

        .querySelectorAll(".check-sorteo")

        .forEach(check=>{


            check.addEventListener(

            "change",

            ()=>{


                this.seleccionarSorteo(check);


            });



        });



    },








    seleccionarSorteo(check){



        let id =
        check.dataset.id;



        if(check.checked){


            this.sorteosSeleccionados.push({


                id:id,

                nombre:
                check.dataset.nombre,

                hora:
                check.dataset.hora


            });



        }else{


            this.sorteosSeleccionados =

            this.sorteosSeleccionados.filter(

            s=>s.id!==id

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

            (e)=>{


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

        document.getElementById("numeros")
        .value.trim();




        let monto =

        Number(

        document.getElementById("monto")
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





        if(monto<=0){


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


                    sorteo:
                    sorteo.nombre,


                    hora:
                    sorteo.hora,


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

            `<p class="vacio">
            No hay jugadas
            </p>`;



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



            <button

            onclick="Taquilla.eliminar(${index})">

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



        const hora =

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
