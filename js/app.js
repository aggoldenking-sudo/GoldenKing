window.App = {

    ticket: [],
    seleccionados: [],


    init() {

        this.cargarTicket();

        this.renderMatriz();

        this.renderTicket();

    },


    renderMatriz() {

        const contenedor =
        document.getElementById('matrizAnimalitos');


        const tipo =
        document.getElementById('loteriaSelect').value;


        const items =
        window.DATA_LOTERIAS[tipo];


        contenedor.innerHTML = "";

        this.seleccionados = [];


        Object.keys(items)

        .sort((a,b)=>{

            if(a==="00") return -1;
            if(b==="00") return 1;

            if(a==="0") return -1;
            if(b==="0") return 1;

            return Number(a)-Number(b);

        })


        .forEach(id=>{


            let btn =
            document.createElement("button");


            btn.className="btn-animal";


            btn.innerHTML =
            `<strong>${id}</strong><br>${items[id]}`;



            btn.onclick=()=>{


                if(this.seleccionados.includes(id)){


                    this.seleccionados =
                    this.seleccionados.filter(x=>x!==id);


                    btn.style.background="white";


                }else{


                    this.seleccionados.push(id);


                    btn.style.background="#f1c40f";


                }


            };


            contenedor.appendChild(btn);


        });


    },



    agregarSeleccion(){


        if(this.seleccionados.length===0){

            alert("Seleccione uno o varios animales");

            return;

        }



        const monto =
        Number(document.getElementById('montoInput').value);



        if(monto<=0){

            alert("Ingrese un monto válido");

            return;

        }



        const hora =
        document.getElementById('horarioSelect').value;



        const tipo =
        document.getElementById('loteriaSelect').value;



        this.seleccionados.forEach(id=>{


            this.ticket.push({

                id:id,

                nombre:
                window.DATA_LOTERIAS[tipo][id],

                monto:monto,

                hora:hora,

                loteria:tipo

            });


        });



        this.seleccionados=[];


        this.guardarTicket();


        this.renderMatriz();

        this.renderTicket();


    },



    renderTicket(){


        const tbody =
        document.querySelector("#ticketTable tbody");


        tbody.innerHTML =

        this.ticket.map((t,i)=>{


            return `

            <tr>

            <td>${t.id} ${t.nombre}</td>

            <td>${t.hora}</td>

            <td>${t.monto}</td>

            <td>
            <button 
            onclick="window.App.remover(${i})">
            X
            </button>
            </td>

            </tr>

            `;


        }).join("");



        const total =

        this.ticket.reduce(

        (a,b)=>a+b.monto,

        0);



        document.getElementById("totalDisplay")

        .innerText=

        "Total: Bs. " + total;



    },



    remover(i){


        this.ticket.splice(i,1);


        this.guardarTicket();


        this.renderTicket();


    },



    limpiarTodo(){


        if(confirm("¿Borrar todo el ticket?")){


            this.ticket=[];


            this.guardarTicket();


            this.renderTicket();


        }


    },



    guardarTicket(){


        localStorage.setItem(

        "goldenking_ticket",

        JSON.stringify(this.ticket)

        );


    },



    cargarTicket(){


        let datos =
        localStorage.getItem("goldenking_ticket");


        if(datos){

            this.ticket =
            JSON.parse(datos);

        }


    }


};



window.onload = ()=>{

    window.App.init();

};
