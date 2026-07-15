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


        this.cargarEventos();


        this.mostrarTicket();


        this.reloj();



        setInterval(()=>{

            this.reloj();

        },1000);



    },



    cargarEventos(){



        const numero =
        document.getElementById("numero");



        const agregar =
        document.getElementById("agregar");



        numero.addEventListener("input",()=>{


            this.buscarAnimal();


        });



        agregar.addEventListener("click",()=>{


            this.agregarJugada();


        });



    },



    buscarAnimal(){



        const numero =
        document.getElementById("numero").value;



        const resultado =
        document.getElementById("animalEncontrado");



        if(numero.length !== 2){


            resultado.innerHTML="";


            return;


        }



        if(window.ANIMALES && ANIMALES[numero]){


            resultado.innerHTML =

            "🐾 " + ANIMALES[numero];



        }else{


            resultado.innerHTML =

            "Número no encontrado";


        }



    },



    agregarJugada(){



        const numero =
        document.getElementById("numero").value;



        const monto =
        Number(
        document.getElementById("monto").value
        );



        if(numero.length !== 2){


            alert("Ingrese un número válido");


            return;


        }



        if(!monto || monto<=0){


            alert("Ingrese un monto");


            return;


        }



        const animal =
        ANIMALES[numero] || "Sin animal";



        const jugada={


            numero,

            animal,

            monto


        };



        this.jugadas.push(jugada);



        this.mostrarTicket();



        this.limpiar();



    },




    mostrarTicket(){



        const contenedor =
        document.getElementById("ticket");



        const total =
        document.getElementById("total");



        if(!contenedor)
        return;



        if(this.jugadas.length===0){


            contenedor.innerHTML=

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


                <span>
                ${j.numero}
                ${j.animal}
                </span>


                <strong>
                ${j.monto.toFixed(2)} Bs
                </strong>


                <button
                onclick="Taquilla.eliminar(${index})">

                ❌

                </button>


            </div>

            `;



        });



        contenedor.innerHTML=html;



        total.textContent=
        suma.toFixed(2);



    },



    eliminar(index){



        this.jugadas.splice(index,1);



        this.mostrarTicket();



    },



    limpiar(){



        document.getElementById("numero").value="";

        document.getElementById("monto").value="";

        document.getElementById("animalEncontrado").innerHTML="";



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


});
