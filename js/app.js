window.App = {

    sorteoSeleccionado: null,

    jugadas: [],


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

            if(e.key === "Enter"){

                document
                .getElementById("monto")
                .focus();

            }

        });



        document
        .getElementById("monto")
        .addEventListener("keydown",(e)=>{

            if(e.key === "Enter"){

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



                    this.sorteoSeleccionado =
                    loteria+" - "+hora;



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

            alert("Seleccione una lotería y horario");

            return;

        }



        if(numero==="" || monto<=0){

            alert("Ingrese número y monto");

            return;

        }



        this.jugadas.push({

            sorteo:this.sorteoSeleccionado,

            numero:numero,

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



        this.jugadas.forEach(jugada=>{


            total += jugada.monto;



            ticket.innerHTML += `


            <div class="ticket-item">


            <span>

            ${jugada.sorteo}<br>

            Número: ${jugada.numero}

            </span>


            <b>

            ${jugada.monto} Bs

            </b>


            </div>


            `;


        });



        document
        .getElementById("total")
        .textContent=total;


    },







    imprimirTicket(){


        let contenido =

        document.getElementById("ticket").innerHTML;



        let total =

        document.getElementById("total").textContent;



        let ventana =

        window.open(
        "",
        "",
        "width=350,height=600"
        );



        ventana.document.write(`


        <html>

        <head>

        <title>Golden King</title>


        <style>

        body{

            font-family:Arial;
            padding:20px;

        }


        h2{

            text-align:center;

        }


        .ticket-item{

            border-bottom:1px solid #000;

            padding:10px 0;

        }


        .total{

            font-size:20px;

            font-weight:bold;

            margin-top:20px;

        }


        </style>


        </head>


        <body>


        <h2>👑 GOLDEN KING</h2>


        ${contenido}


        <div class="total">

        TOTAL: ${total} Bs

        </div>


        <br>

        Gracias por su jugada


        </body>


        </html>


        `);



        ventana.document.close();


        ventana.print();



    }


};



App.init();
