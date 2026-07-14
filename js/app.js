window.App = {

    sorteosSeleccionados: [],

    jugadas: [],

    numeroTicket: 1,


    init(){


        this.cargarSorteos();



        document
        .getElementById("agregar")
        .addEventListener("click",()=>{

            this.agregarJugada();

        });



        document
        .getElementById("numero")
        .addEventListener("keydown",(e)=>{


            if(e.key==="Enter"){

                document
                .getElementById("monto")
                .focus();

            }


        });





        document
        .getElementById("monto")
        .addEventListener("keydown",(e)=>{


            if(e.key==="Enter"){

                this.agregarJugada();

            }


        });






        document
        .getElementById("imprimir")
        .addEventListener("click",()=>{

            this.imprimirTicket();

        });







        document
        .getElementById("seleccionarTodos")
        .addEventListener("click",()=>{


            document
            .querySelectorAll(".btn-sorteo")
            .forEach(btn=>{


                btn.classList.add("active");


                let existe =
                this.sorteosSeleccionados.some(s=>

                    s.loteria===btn.dataset.loteria &&
                    s.hora===btn.dataset.hora

                );



                if(!existe){


                    this.sorteosSeleccionados.push({

                        loteria:btn.dataset.loteria,

                        hora:btn.dataset.hora

                    });


                }


            });


        });








        document
        .getElementById("limpiarSeleccion")
        .addEventListener("click",()=>{


            this.sorteosSeleccionados=[];



            document
            .querySelectorAll(".btn-sorteo")
            .forEach(btn=>{

                btn.classList.remove("active");

            });



        });



    },










    cargarSorteos(){


        let contenedor =
        document.getElementById("listaSorteos");



        let loterias=[

            "LOTTO ACTIVO",
            "LA GRANJITA",
            "SELVA PLUS",
            "GUACHARO ACTIVO"

        ];



        let horarios=[


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





        contenedor.innerHTML="";





        loterias.forEach(loteria=>{


            let titulo =
            document.createElement("h4");


            titulo.textContent=loteria;



            contenedor.appendChild(titulo);





            horarios.forEach(hora=>{


                let boton =
                document.createElement("button");



                boton.className="btn-sorteo";


                boton.textContent=hora;



                boton.dataset.loteria=loteria;

                boton.dataset.hora=hora;





                boton.onclick=()=>{



                    boton.classList.toggle("active");



                    let existe =
                    this.sorteosSeleccionados.some(s=>

                        s.loteria===loteria &&
                        s.hora===hora

                    );





                    if(existe){


                        this.sorteosSeleccionados =
                        this.sorteosSeleccionados.filter(s=>

                            !(s.loteria===loteria &&
                            s.hora===hora)

                        );



                    }else{


                        this.sorteosSeleccionados.push({

                            loteria:loteria,

                            hora:hora

                        });


                    }



                };





                contenedor.appendChild(boton);



            });



        });



    },









    agregarJugada(){


        let numero =
        document
        .getElementById("numero")
        .value.trim();




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




        if(numero==="" || monto<=0){

            alert("Ingrese número y monto");

            return;

        }





        this.sorteosSeleccionados.forEach(sorteo=>{


            let animal =
            this.buscarAnimal(
                sorteo.loteria,
                numero
            );



            if(animal){


                this.jugadas.push({

                    loteria:sorteo.loteria,

                    hora:sorteo.hora,

                    numero:numero,

                    animal:animal,

                    monto:monto


                });


            }



        });





        this.mostrarTicket();





        document.getElementById("numero").value="";

        document.getElementById("monto").value="";

        document.getElementById("numero").focus();



    },











    buscarAnimal(loteria,numero){


        let tabla;



        switch(loteria){


            case "LOTTO ACTIVO":

            tabla=DATA_LOTERIAS.LottoActivo;

            break;



            case "LA GRANJITA":

            tabla=DATA_LOTERIAS.Granjita;

            break;



            case "SELVA PLUS":

            tabla=DATA_LOTERIAS.SelvaPlus;

            break;



            case "GUACHARO ACTIVO":

            tabla=DATA_LOTERIAS.Guacharo;

            break;


        }





        if(tabla && tabla[numero]){


            return tabla[numero]
            .replace(/^.*?\s/,"");


        }





        alert("Número no existe en "+loteria);


        return null;



    },









    mostrarTicket(){



        let ticket =
        document.getElementById("ticket");



        ticket.innerHTML="";



        let total=0;





        this.jugadas.forEach(j=>{


            total+=j.monto;



            ticket.innerHTML += `


            <div class="ticket-item">


            <b>${j.loteria}</b><br>


            ${j.hora}<br>


            ${j.numero} ${j.animal}


            <strong>

            ${j.monto.toFixed(2)} Bs

            </strong>


            </div>


            `;



        });




        document
        .getElementById("total")
        .textContent =
        total.toFixed(2);



    },









    imprimirTicket(){



        if(this.jugadas.length===0){

            alert("No hay jugadas");

            return;

        }




        let fecha =
        new Date()
        .toLocaleString();





        let total =
        document
        .getElementById("total")
        .textContent;





        let ticket =
        String(this.numeroTicket)
        .padStart(6,"0");







        let contenido="";





        this.jugadas.forEach(j=>{


            contenido += `

${j.loteria} ${j.hora}

${j.numero} ${j.animal}

${j.monto.toFixed(2)} Bs

--------------------

`;



        });







        let ventana =
        window.open(
        "",
        "",
        "width=350,height=600"
        );





        ventana.document.write(`


        <html>

        <body style="font-family:Arial">


        <center>

        <b>AGENCIA GOLDEN KING</b>

        </center>


        <br>


        TICKET: ${ticket}

        <br>

        SERIAL: GK${ticket}

        <br>

        ${fecha}


        <hr>


        ${contenido}


        TOTAL TICKET VES:

        ${total} Bs


        <hr>


        El Ticket caduca a los 3 días.


        </body>

        </html>



        `);





        ventana.document.close();


        ventana.print();




        this.numeroTicket++;



    }



};




App.init();
