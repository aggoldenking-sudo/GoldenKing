window.App = {

    sorteoSeleccionado: null,

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


    },





    cargarSorteos(){


        const contenedor =
        document.getElementById("listaSorteos");


        const loterias=[

            "LOTTO ACTIVO",
            "LA GRANJITA",
            "SELVA PLUS",
            "GUACHARO ACTIVO"

        ];



        const horarios=[

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
            document.createElement("button");


            titulo.className="titulo-loteria";

            titulo.textContent="▼ "+loteria;



            let grupo =
            document.createElement("div");


            grupo.style.display="none";



            titulo.onclick=()=>{


                if(grupo.style.display==="none"){

                    grupo.style.display="block";

                    titulo.textContent="▲ "+loteria;


                }else{

                    grupo.style.display="none";

                    titulo.textContent="▼ "+loteria;

                }

            };



            horarios.forEach(hora=>{


                let boton =
                document.createElement("button");


                boton.className="btn-sorteo";


                boton.textContent=hora;



                boton.onclick=()=>{


                    document
                    .querySelectorAll(".btn-sorteo")
                    .forEach(b=>{

                        b.classList.remove("active");

                    });



                    boton.classList.add("active");



                    this.sorteoSeleccionado = {

                        loteria:loteria,

                        hora:hora

                    };


                };



                grupo.appendChild(boton);


            });



            contenedor.appendChild(titulo);

            contenedor.appendChild(grupo);



        });


    },






    agregarJugada(){


        let numero =
        document
        .getElementById("numero")
        .value
        .trim();



        let monto =
        Number(
        document
        .getElementById("monto")
        .value
        );



        if(!this.sorteoSeleccionado){

            alert("Seleccione lotería y horario");

            return;

        }



        if(numero==="" || monto<=0){

            alert("Ingrese número y monto");

            return;

        }



        let animal="";



        // BUSCAR ANIMAL

        if(DATA_LOTERIAS){


            let tabla;



            if(this.sorteoSeleccionado.loteria==="LOTTO ACTIVO"){

                tabla=DATA_LOTERIAS.LottoActivo;

            }


            if(this.sorteoSeleccionado.loteria==="LA GRANJITA"){

                tabla=DATA_LOTERIAS.Granjita;

            }


            if(this.sorteoSeleccionado.loteria==="SELVA PLUS"){

                tabla=DATA_LOTERIAS.SelvaPlus;

            }


            if(this.sorteoSeleccionado.loteria==="GUACHARO ACTIVO"){

                tabla=DATA_LOTERIAS.Guacharo;

            }



            if(tabla && tabla[numero]){

                animal=tabla[numero];

            }else{

                animal="Animal no encontrado";

            }

        }



        this.jugadas.push({


            loteria:this.sorteoSeleccionado.loteria,

            hora:this.sorteoSeleccionado.hora,

            numero:numero,

            animal:animal,

            monto:monto


        });



        this.mostrarTicket();



        document.getElementById("numero").value="";

        document.getElementById("monto").value="";

        document.getElementById("numero").focus();



    },






    mostrarTicket(){


        const ticket =
        document.getElementById("ticket");


        ticket.innerHTML="";


        let total=0;



        this.jugadas.forEach(j=>{


            total+=j.monto;



            ticket.innerHTML += `

            <div class="ticket-item">

            <b>${j.loteria}</b><br>

            ${j.hora}<br>

            ${j.numero} - ${j.animal}

            <strong>${j.monto} Bs</strong>

            </div>

            `;


        });



        document
        .getElementById("total")
        .textContent=total;



    },







    imprimirTicket(){


        let fecha =
        new Date()
        .toLocaleString();



        let total =
        document
        .getElementById("total")
        .textContent;



        let numeroTicket =
        String(this.numeroTicket)
        .padStart(6,"0");



        let serial =
        "GK"+numeroTicket;



        let contenido="";



        this.jugadas.forEach(j=>{


            contenido += `

            ${j.loteria}

            ${j.hora}

            ${j.numero} - ${j.animal}

            ${j.monto.toFixed(2)} Bs

            ----------------------

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

        <body style="font-family:Arial;padding:20px">


        <center>

        AGENCIA: GOLDEN KING

        </center>


        <br>


        TICKET Nº: ${numeroTicket}

        <br>

        SERIAL: ${serial}

        <br>

        ${fecha}


        <hr>


        ${contenido}


        <hr>


        TOTAL TICKET VES:

        ${total},00 Bs


        <br><br>


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
