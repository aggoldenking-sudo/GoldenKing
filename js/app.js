window.App = {

    ticket: [],

    init() {

        this.cargarTicket();

        this.renderMatriz();

        this.renderTicket();

        document.getElementById('inputRapido').focus();

        this.eventos();

    },


    eventos() {

        // Enter para código rápido
        document.getElementById('inputRapido')
        .addEventListener('keypress', (e)=>{

            if(e.key === "Enter"){

                let cod = e.target.value.trim();

                this.buscarCodigo(cod);

                e.target.value = "";

            }

        });


        // Botón agregar
        const agregar = document.getElementById("agregarBtn");

        if(agregar){

            agregar.onclick = ()=>{

                let cod = document
                .getElementById("inputRapido")
                .value.trim();

                this.buscarCodigo(cod);

                document.getElementById("inputRapido").value="";

            };

        }


        // Botón limpiar
        const limpiar = document.getElementById("limpiarBtn");

        if(limpiar){

            limpiar.onclick = ()=>{

                if(confirm("¿Limpiar ticket completo?")){

                    this.ticket=[];

                    this.guardarTicket();

                    this.renderTicket();

                }

            };

        }

    },


    buscarCodigo(cod){

        const tipo =
        document.getElementById('loteriaSelect').value;


        const items =
        window.DATA_LOTERIAS[tipo];


        if(items[cod]){

            this.agregarJugada(cod);

        }else{

            alert("Código de animal no válido");

        }

    },


    renderMatriz(){

        const contenedor =
        document.getElementById('matrizAnimalitos');


        const tipo =
        document.getElementById('loteriaSelect').value;


        const items =
        window.DATA_LOTERIAS[tipo];


        contenedor.innerHTML="";


        Object.keys(items)

        .sort((a,b)=>{

            if(a==="00") return -1;

            if(b==="00") return 1;

            return parseInt(a)-parseInt(b);

        })


        .forEach(id=>{


            let btn =
            document.createElement('button');


            btn.className="btn-animal";


            btn.innerHTML =
            `<strong>${id}</strong><br>${items[id]}`;


            btn.onclick=()=>{

                this.agregarJugada(id);

            };


            contenedor.appendChild(btn);


        });


    },


    agregarJugada(id){


        const tipo =
        document.getElementById('loteriaSelect').value;


        const monto =
        Number(document.getElementById('montoInput').value);


        const hora =
        document.getElementById('horarioSelect').value;


        const items =
        window.DATA_LOTERIAS[tipo];



        if(!monto || monto<=0){

            alert("Ingrese un monto válido");

            return;

        }



        this.ticket.push({

            id:id,

            nombre:items[id],

            monto:monto,

            hora:hora,

            loteria:tipo

        });



        this.guardarTicket();


        this.renderTicket();


        document
        .getElementById('inputRapido')
        .focus();


    },


    renderTicket(){


        const tbody =
        document.querySelector('#ticketTable tbody');


        if(!tbody) return;



        tbody.innerHTML =

        this.ticket.map((t,i)=>{


            return `

            <tr>

            <td>${t.id} ${t.nombre}</td>

            <td>${t.hora}</td>

            <td>${t.monto}</td>

            <td>

            <button 
            class="btn-anular"
            onclick="window.App.remover(${i})">

            X

            </button>

            </td>

            </tr>

            `;


        }).join("");



        this.actualizarTotal();


    },


    remover(i){

        this.ticket.splice(i,1);

        this.guardarTicket();

        this.renderTicket();

    },


    actualizarTotal(){


        const total =

        this.ticket.reduce(

            (suma,jugada)=> suma + Number(jugada.monto),

            0

        );



        document.getElementById('totalDisplay')

        .innerText =

        "Total: Bs. " +

        total.toLocaleString("es-VE");


    },


    guardarTicket(){

        localStorage.setItem(

            "goldenking_ticket",

            JSON.stringify(this.ticket)

        );

    },


    cargarTicket(){


        const datos =

        localStorage.getItem("goldenking_ticket");



        if(datos){

            this.ticket =
            JSON.parse(datos);

        }


    }


};




window.addEventListener("DOMContentLoaded",()=>{

    window.App.init();

});
