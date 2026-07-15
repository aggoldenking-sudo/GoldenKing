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


        this.cargarLoterias();


        this.cargarEventos();


        this.mostrarTicket();


        this.reloj();



        setInterval(()=>{

            this.reloj();

        },1000);



    },



    cargarLoterias(){


        const select =
        document.getElementById("loteria");



        if(!select || !window.DATA_LOTERIAS)
        return;



        select.innerHTML = `

        <option value="">
        Seleccione lotería
        </option>

        `;



        Object.keys(DATA_LOTERIAS).forEach(nombre=>{


            select.innerHTML += `

            <option value="${nombre}">
            ${nombre}
            </option>

            `;


        });


    },



    cargarEventos(){



        const numero =
        document.getElementById("numero");



        const agregar =
        document.getElementById("agregar");



        const loteria =
        document.getElementById("loteria");




        numero.addEventListener("input",()=>{


            this.buscarAnimal();


        });




        loteria.addEventListener("change",()=>{


            document.getElementById("numero").value="";


            document.getElementById("animalEncontrado").innerHTML="";


        });




        agregar.addEventListener("click",()=>{


            this.agregarJugada();


        });



    },



    buscarAnimal(){



        const numero =
        document.getElementById("numero").value;



        const loteria =
        document.getElementById("loteria").value;



        const resultado =
        document.getElementById("animalEncontrado");



        if(numero.length !== 2){


            resultado.innerHTML="";


            return;


        }



        if(!loteria){


            resultado.innerHTML =
            "Seleccione una lotería";


            return;


        }




        const animal =

        DATA_LOTERIAS[loteria][numero];




        if(animal){


            resultado.innerHTML =

            animal;



        }else{


            resultado.innerHTML =

            "❌ Número no disponible";


        }



    },



    agregarJugada(){



        const numero =
        document.getElementById("numero").value;



        const monto =
        Number(
        document.getElementById("monto").value
        );



        const loteria =
        document.getElementById("loteria").value;



        const sorteo =
        document.getElementById("sorteo").value;



        if(!loteria){


            alert("Seleccione una lotería");


            return;


        }




        if(numero.length !== 2){


            alert("Ingrese un número válido");


            return;


        }




        if(!monto || monto<=0){


            alert("Ingrese un monto");


            return;


        }



        const animal =

        DATA_LOTERIAS[loteria][numero]
        ||
        "Sin animal";




        const jugada = {


            loteria,

            sorteo,

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


                <span>

                ${j.loteria}
                <br>

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



        total.textContent =
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
