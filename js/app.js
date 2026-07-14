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


    },





    cargarSorteos(){


        const contenedor =
        document.getElementById("listaSorteos");



        const loterias = [

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


            let bloque =
            document.createElement("div");



            let titulo =
            document.createElement("button");



            titulo.className="titulo-loteria";

            titulo.textContent="▼ "+loteria;



            let horariosDiv =
            document.createElement("div");

            horariosDiv.style.display="none";



            titulo.onclick=()=>{


                if(horariosDiv.style.display==="none"){

                    horariosDiv.style.display="block";

                    titulo.textContent="▲ "+loteria;

                }else{

                    horariosDiv.style.display="none";

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



                horariosDiv.appendChild(boton);



            });



            bloque.appendChild(titulo);

            bloque.appendChild(horariosDiv);


            contenedor.appendChild(bloque);



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




        this.jugadas.push({

            sorteo:this.sorteoSeleccionado,

            numero,

            monto

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



        this.jugadas.forEach((j,index)=>{


            total += j.monto;



            ticket.innerHTML += `

            <div class="ticket-item">

                <span>

                ${j.sorteo}<br>

                Número: ${j.numero}

                </span>


                <b>

                ${j.monto} Bs

                </b>


            </div>

            `;


        });



        document
        .getElementById("total")
        .textContent=total;


    }


};



App.init();
