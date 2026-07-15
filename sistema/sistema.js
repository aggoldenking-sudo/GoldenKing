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


        this.conectarTicket();


        this.mostrarTicket();


        this.reloj();



        setInterval(()=>{

            this.reloj();

        },1000);



    },






    cargarSorteos(){



        const contenedor =

        document.getElementById("listaSorteos");



        if(!contenedor || !window.SORTEOS)

        return;




        contenedor.innerHTML="";





        SORTEOS.forEach(sorteo=>{


            contenedor.innerHTML += `


            <button

            class="btn-sorteo"

            data-id="${sorteo.id}">


            ${sorteo.nombre}

            <br>

            <b>${sorteo.hora}</b>


            </button>


            `;


        });






        document

        .querySelectorAll(".btn-sorteo")

        .forEach(btn=>{


            btn.onclick=()=>{


                this.seleccionarSorteo(btn);


            };


        });



    },







    seleccionarSorteo(btn){



        const id =

        btn.dataset.id;





        const existe =

        this.sorteosSeleccionados

        .find(s=>s.id===id);






        if(existe){


            this.sorteosSeleccionados =

            this.sorteosSeleccionados

            .filter(s=>s.id!==id);



            btn.classList.remove("activo");



        }else{


            const sorteo =

            SORTEOS.find(

            s=>s.id===id

            );



            this.sorteosSeleccionados.push(sorteo);



            btn.classList.add("activo");


        }






        const contador =

        document.getElementById(
        "contadorSorteos"
        );



        if(contador){


            contador.innerHTML =

            this.sorteosSeleccionados.length

            +

            " sorteos seleccionados";


        }



    },







    cargarEventos(){



        const numero =

        document.getElementById("numero");



        const agregar =

        document.getElementById("agregar");





        if(numero){


            numero.addEventListener(

            "input",

            ()=>{


                this.buscarAnimal();


            });


        }







        if(agregar){


            agregar.onclick=()=>{


                this.agregarJugada();


            };


        }



    },







    buscarAnimal(){



        const numero =

        document

        .getElementById("numero")

        .value;





        const resultado =

        document.getElementById(
        "animalEncontrado"
        );





        if(!numero){


            resultado.innerHTML="";


            return;


        }





        let animal = "";





        Object.values(DATA_LOTERIAS)

        .forEach(lista=>{


            if(lista[numero]){


                animal = lista[numero];


            }


        });







        resultado.innerHTML =

        animal

        ?

        animal

        :

        "❌ Número no disponible";



    },







    agregarJugada(){



        const numero =

        document

        .getElementById("numero")

        .value;





        const monto =

        Number(

        document

        .getElementById("monto")

        .value

        );








        if(this.sorteosSeleccionados.length===0){


            alert(
            "Seleccione al menos un sorteo"
            );


            return;


        }







        if(!numero){


            alert(
            "Ingrese número"
            );


            return;


        }







        if(!monto || monto<=0){


            alert(
            "Ingrese monto"
            );


            return;


        }








        this.sorteosSeleccionados

        .forEach(sorteo=>{





            let animal =

            DATA_LOTERIAS

            [sorteo.loteria]

            [numero]

            ||

            "Sin animal";






            this.jugadas.push({



                loteria:
                sorteo.nombre,


                sorteo:
                sorteo.hora,


                numero,


                animal,


                monto



            });





        });






        this.mostrarTicket();


        this.limpiar();




    },









    mostrarTicket(){



        const contenedor =

        document.getElementById(
        "ticket"
        );



        const total =

        document.getElementById(
        "total"
        );





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



            suma += Number(j.monto);







            html += `



            <div class="fila-ticket">


            <div>


            <b>${j.loteria}</b>


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









    conectarTicket(){



        const imprimir =

        document.getElementById(
        "imprimir"
        );



        const whatsapp =

        document.getElementById(
        "whatsapp"
        );






        if(imprimir){



            imprimir.onclick=()=>{


                let ticket =

                this.generarTicket();



                TicketImprimir.imprimir(ticket);



            };


        }







        if(whatsapp){



            whatsapp.onclick=()=>{


                let ticket =

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



        document.getElementById(
        "numero"
        ).value="";



        document.getElementById(
        "monto"
        ).value="";



        document.getElementById(
        "animalEncontrado"
        ).innerHTML="";



    },








    reloj(){



        const hora =

        document.getElementById(
        "hora"
        );




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
