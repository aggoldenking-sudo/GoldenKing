window.App = {

    sorteoSeleccionado: null,
    loteriaSeleccionada: null,

    jugadas: [],


    init(){

        this.cargarSorteos();

        document
        .getElementById("agregar")
        .addEventListener("click",()=>{

            this.agregarJugada();

        });

    },


    cargarSorteos(){


        const contenedor = document.getElementById("listaSorteos");


        const loterias = {

            "Lotto Activo":"LottoActivo",

            "La Granjita":"Granjita",

            "Selva Plus":"SelvaPlus",

            "Guacharo Activo":"Guacharo"

        };


        const horas = [

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



        Object.keys(loterias).forEach(nombre=>{


            let titulo=document.createElement("h3");

            titulo.textContent=nombre;


            contenedor.appendChild(titulo);



            horas.forEach(hora=>{


                let boton=document.createElement("button");


                boton.className="btn-sorteo";


                boton.textContent=
                nombre+" - "+hora;



                boton.onclick=()=>{


                    document
                    .querySelectorAll(".btn-sorteo")
                    .forEach(b=>b.classList.remove("active"));



                    boton.classList.add("active");



                    this.sorteoSeleccionado =
                    nombre+" - "+hora;



                    this.loteriaSeleccionada =
                    loterias[nombre];


                };



                contenedor.appendChild(boton);


            });


        });


    },



    agregarJugada(){


        const numero =
        document.getElementById("numero")
        .value
        .trim();



        const monto =
        Number(
        document.getElementById("monto").value
        );



        if(!this.sorteoSeleccionado){

            alert("Seleccione lotería y horario");

            return;

        }



        if(!numero || !monto){

            alert("Ingrese número y monto");

            return;

        }



        // VALIDAR NUMERO

        const tabla =
        DATA_LOTERIAS[this.loteriaSeleccionada];



        if(!tabla[numero]){


            alert(
            "Número no válido para esta lotería"
            );


            return;

        }



        this.jugadas.push({


            sorteo:this.sorteoSeleccionado,

            numero,

            animal:tabla[numero],

            monto


        });



        this.renderTicket();



        document.getElementById("numero").value="";

        document.getElementById("monto").value="";


    },



    renderTicket(){


        const ticket =
        document.getElementById("ticket");



        ticket.innerHTML="";


        let total=0;



        this.jugadas.forEach(j=>{


            total += j.monto;



            let div=document.createElement("div");


            div.className="ticket-item";



            div.innerHTML=`

            <span>

            ${j.sorteo}<br>

            Número: ${j.numero}

            </span>


            <b>

            ${j.monto} Bs

            </b>

            `;



            ticket.appendChild(div);



        });



        document
        .getElementById("total")
        .textContent=total;



    }


};



App.init();
