/*
=====================================================
 GOLDEN KING
 SISTEMA DE TAQUILLA
 sistema.js
=====================================================
*/


window.Taquilla = {


    jugadas: [],


    init(){


        this.reloj();


        setInterval(()=>{

            this.reloj();

        },1000);


        this.eventos();


        this.actualizarTicket();


    },



    eventos(){


        const agregar =
        document.getElementById("agregar");



        if(agregar){

            agregar.onclick = ()=>{

                this.agregarJugada();

            };

        }



        const numeros =
        document.getElementById("numeros");



        if(numeros){

            numeros.addEventListener("keydown",(e)=>{

                if(e.key==="Enter"){

                    e.preventDefault();

                    this.agregarJugada();

                }

            });

        }


    },



    agregarJugada(){


        let numeros =
        document.getElementById("numeros").value;



        let monto =
        Number(
        document.getElementById("monto").value
        );



        if(!numeros){

            alert("Ingrese números");

            return;

        }



        if(!monto){

            alert("Ingrese monto");

            return;

        }



        let lista =
        numeros
        .split(/[\s,]+/)
        .filter(n=>n);



        lista.forEach(numero=>{


            this.jugadas.push({

                numero,

                monto

            });


        });



        this.actualizarTicket();


        document.getElementById("numeros").value="";



    },



    actualizarTicket(){


        const ticket =
        document.getElementById("ticket");



        const total =
        document.getElementById("total");



        if(!ticket) return;



        if(this.jugadas.length===0){


            ticket.innerHTML=

            "<p class='vacio'>No hay jugadas</p>";


            total.textContent="0.00";


            return;


        }



        let html="";

        let suma=0;



        this.jugadas.forEach((j,index)=>{


            suma += j.monto;



            html += `

            <div class="fila-ticket">

            <b>Número:</b>
            ${j.numero}

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


        const hora =
        document.getElementById("hora");


        if(hora){


            hora.textContent =
            new Date()
            .toLocaleTimeString();


        }


    }



};



document.addEventListener(

"DOMContentLoaded",

()=>{

    Taquilla.init();

}

);
