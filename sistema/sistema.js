/**
 * Proyecto Golden King
 * Archivo: sistema/sistema.js
 * Control principal de taquilla
 */


window.Taquilla = {

    sorteos: [],

    jugadas: [],


    init(){


        this.cargarSorteos();



        document
        .getElementById("numero")
        .addEventListener("input",()=>{

            this.mostrarAnimal();

        });



        document
        .getElementById("agregar")
        .onclick = ()=>{

            this.agregarJugada();

        };



        document
        .getElementById("imprimir")
        .onclick = ()=>{

            this.imprimir();

        };


    },





    cargarSorteos(){


        const lista =
        document.getElementById("listaSorteos");


        const loterias = [

            "LOTTO ACTIVO",
            "LA GRANJITA",
            "SELVA PLUS",
            "GUACHARO ACTIVO"

        ];



        const horarios = [

            "8:00 AM",
            "9:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "1:00 PM",
            "2:00 PM",
            "3:00 PM",
            "4:00 PM",
            "5:00 PM",
            "6:00 PM",
            "7:00 PM"

        ];



        loterias.forEach(loteria=>{


            const titulo =
            document.createElement("h3");


            titulo.textContent =
            loteria;


            lista.appendChild(titulo);




            horarios.forEach(hora=>{


                const boton =
                document.createElement("button");


                boton.className =
                "btn-sorteo";


                boton.textContent =
                hora;



                boton.onclick = ()=>{


                    boton.classList.toggle("active");



                    const existe =
                    this.sorteos.find(s=>

                        s.loteria === loteria &&
                        s.hora === hora

                    );



                    if(existe){


                        this.sorteos =
                        this.sorteos.filter(s=>

                            !(
                            s.loteria===loteria &&
                            s.hora===hora
                            )

                        );


                    }else{


                        this.sorteos.push({

                            loteria,
                            hora

                        });


                    }



                    this.mostrarAnimal();


                };



                lista.appendChild(boton);



            });


        });


    },





    buscarAnimal(loteria,numero){


        let tabla;



        switch(loteria){


            case "LOTTO ACTIVO":

                tabla =
                DATA_LOTERIAS.LottoActivo;

            break;



            case "LA GRANJITA":

                tabla =
                DATA_LOTERIAS.Granjita;

            break;



            case "SELVA PLUS":

                tabla =
                DATA_LOTERIAS.SelvaPlus;

            break;



            case "GUACHARO ACTIVO":

                tabla =
                DATA_LOTERIAS.Guacharo;

            break;


        }



        if(tabla && tabla[numero]){

            return tabla[numero];

        }



        return null;


    },
      mostrarAnimal(){


        const numero =
        document
        .getElementById("numero")
        .value
        .trim();



        const caja =
        document
        .getElementById("animalEncontrado");



        caja.innerHTML = "";



        if(numero===""){

            return;

        }



        if(this.sorteos.length===0){


            caja.innerHTML =
            "⚠️ Seleccione sorteo";


            return;

        }




        let encontrado = false;



        this.sorteos.forEach(s=>{


            const animal =
            this.buscarAnimal(
                s.loteria,
                numero
            );



            if(animal){


                caja.innerHTML +=

                `
                🐾 ${animal}<br>
                🎰 ${s.loteria}<br>
                ⏰ ${s.hora}<br><br>
                `;


                encontrado = true;


            }



        });




        if(!encontrado){


            caja.innerHTML =
            "❌ Número no existe";


        }


    },







    agregarJugada(){



        const numero =
        document
        .getElementById("numero")
        .value
        .trim();




        const monto =
        Number(
        document
        .getElementById("monto")
        .value
        );




        if(this.sorteos.length===0){

            alert("Seleccione sorteo");

            return;

        }




        if(numero===""){


            alert("Ingrese número");

            return;

        }




        if(!monto || monto<=0){


            alert("Ingrese monto válido");

            return;

        }





        this.sorteos.forEach(s=>{


            const animal =
            this.buscarAnimal(
                s.loteria,
                numero
            );



            if(animal){


                this.jugadas.push({


                    tipo:
                    "Animalitos",


                    loteria:
                    s.loteria,


                    hora:
                    s.hora,


                    numero:
                    numero,


                    animal:
                    animal,


                    monto:
                    monto


                });


            }


        });



        this.mostrarTicket();



    },









    mostrarTicket(){


        const caja =
        document
        .getElementById("ticket");



        caja.innerHTML = "";



        let total = 0;




        this.jugadas.forEach(j=>{


            total += Number(j.monto);



            caja.innerHTML +=


            `

            <div class="ticket-item">


            <b>${j.loteria}</b><br>

            ${j.hora}<br>

            ${j.numero} ${j.animal}<br>

            Bs ${j.monto}


            </div>

            <hr>


            `;



        });




        document
        .getElementById("total")
        .textContent =
        total.toFixed(2);



    },








    imprimir(){



        if(this.jugadas.length===0){


            alert(
            "No hay jugadas"
            );


            return;


        }




        const numeroTicket =

        "GK-" +
        Date.now();





        const ticket =

        TicketModelo.generar(

            this.jugadas,

            numeroTicket

        );





        TicketImprimir.imprimir(ticket);



    },








    enviarWhatsApp(telefono){



        if(this.jugadas.length===0){


            alert(
            "No hay jugadas"
            );


            return;


        }




        const ticket =


        TicketModelo.generar(

            this.jugadas,

            "GK-"+Date.now()

        );




        TicketWhatsApp.enviar(

            ticket,

            telefono

        );



    }



};





Taquilla.init();
