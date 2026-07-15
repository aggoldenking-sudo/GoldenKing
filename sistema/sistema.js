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


        this.cargarHorarios();


        this.cargarEventos();


        this.conectarTicket();


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



        Object.keys(DATA_LOTERIAS)
        .forEach(nombre=>{


            select.innerHTML += `

            <option value="${nombre}">
            ${nombre}
            </option>

            `;


        });



    },




    cargarHorarios(){


        const select =
        document.getElementById("sorteo");



        if(!select || !window.HORARIOS)
        return;



        select.innerHTML = `

        <option value="">
        Seleccione horario
        </option>

        `;



        HORARIOS.forEach(hora=>{


            select.innerHTML += `

            <option value="${hora}">
            ${hora}
            </option>

            `;


        });



    },




    cargarEventos(){


        const numero =
        document.getElementById("numero");



        const agregar =
        document.getElementById("agregar");




        if(numero){


            numero.addEventListener("input",()=>{


                this.buscarAnimal();


            });


        }





        if(agregar){


            agregar.addEventListener("click",()=>{


                this.agregarJugada();


            });


        }



    },





    buscarAnimal(){



        const numero =
        document.getElementById("numero").value;



        const loteria =
        document.getElementById("loteria").value;



        const resultado =
        document.getElementById("animalEncontrado");



        if(!numero){


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



        const loteria =
        document.getElementById("loteria").value;



        const sorteo =
        document.getElementById("sorteo").value;



        const numero =
        document.getElementById("numero").value;



        const monto =
        Number(
        document.getElementById("monto").value
        );





        if(!loteria){


            alert("Seleccione lotería");


            return;


        }





        if(!sorteo){


            alert("Seleccione horario");


            return;


        }





        if(!numero){


            alert("Ingrese número");


            return;


        }





        if(!monto || monto<=0){


            alert("Ingrese monto");


            return;


        }





        const animal =

        DATA_LOTERIAS[loteria][numero]

        ||

        "Sin animal";





        this.jugadas.push({


            loteria,

            sorteo,

            numero,

            animal,

            monto


        });





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


            contenedor.innerHTML =

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


            suma += Number(j.monto);





            html += `


            <div class="fila-ticket">


                <div>


                <b>
                ${j.loteria}
                </b>


                <br>


                🕒 ${j.sorteo}


                <br>


                ${j.numero}
                ${j.animal}



                </div>




                <strong>

                ${j.monto.toFixed(2)}
                Bs

                </strong>




                <button onclick="Taquilla.eliminar(${index})">

                ❌

                </button>


            </div>


            `;


        });




        contenedor.innerHTML=html;



        total.textContent =

        suma.toFixed(2);



    },








    conectarTicket(){



        const imprimir =
        document.getElementById("imprimir");



        const whatsapp =
        document.getElementById("whatsapp");





        if(imprimir){


            imprimir.onclick=()=>{


                const ticket =

                this.generarTicket();



                TicketImprimir.imprimir(ticket);


            };


        }





        if(whatsapp){


            whatsapp.onclick=()=>{


                const ticket =

                this.generarTicket();



                let telefono =

                prompt(
                "Número WhatsApp"
                );



                TicketWhatsApp.enviar(

                ticket,

                telefono

                );


            };


        }



    },







    generarTicket(){



        let numeroTicket =

        "#"+

        Date.now()
        .toString()
        .slice(-6);





        return TicketModelo.generar(

            this.jugadas,

            numeroTicket

        );



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
