window.App = {

    sorteoSeleccionado: null,

    jugadas: [],


    init(){

        this.cargarSorteos();

        document
        .getElementById("agregar")
        .onclick = () => this.agregarJugada();

    },


    cargarSorteos(){

        const lista = document.getElementById("listaSorteos");


        const sorteos = [
            "Lotto Activo - 8:00 AM",
            "Lotto Activo - 9:00 AM",
            "Lotto Activo - 10:00 AM",
            "Lotto Activo - 11:00 AM",
            "Lotto Activo - 12:00 PM",
            "Lotto Activo - 1:00 PM",
            "Lotto Activo - 2:00 PM",
            "Lotto Activo - 3:00 PM",
            "Lotto Activo - 4:00 PM",
            "Lotto Activo - 5:00 PM",
            "Lotto Activo - 6:00 PM",
            "Lotto Activo - 7:00 PM",

            "La Granjita - 8:00 AM",
            "La Granjita - 9:00 AM",
            "La Granjita - 10:00 AM",
            "La Granjita - 11:00 AM",
            "La Granjita - 12:00 PM",
            "La Granjita - 1:00 PM",
            "La Granjita - 2:00 PM",
            "La Granjita - 3:00 PM",
            "La Granjita - 4:00 PM",
            "La Granjita - 5:00 PM",
            "La Granjita - 6:00 PM",
            "La Granjita - 7:00 PM"
        ];


        lista.innerHTML="";


        sorteos.forEach(sorteo=>{


            let btn=document.createElement("button");

            btn.className="btn-sorteo";

            btn.textContent=sorteo;


            btn.onclick=()=>{

                document
                .querySelectorAll(".btn-sorteo")
                .forEach(b=>b.classList.remove("active"));


                btn.classList.add("active");


                this.sorteoSeleccionado=sorteo;

            };


            lista.appendChild(btn);

        });

    },


    agregarJugada(){


        let numero=document
        .getElementById("numero")
        .value.trim();


        let monto=Number(
        document.getElementById("monto").value
        );


        if(!this.sorteoSeleccionado){

            alert("Seleccione un sorteo");

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

    },


    mostrarTicket(){


        let ticket=document.getElementById("ticket");


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


        document.getElementById("total").textContent=total;

    }

};


App.init();
