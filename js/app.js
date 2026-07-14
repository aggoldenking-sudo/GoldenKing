window.App = {

    ticket: [],
    seleccionados: [],


    init() {

        this.cargarTicket();

        this.renderMatriz();

        this.renderTicket();

    },


    renderMatriz() {

        const contenedor = document.getElementById('matrizAnimalitos');

        const tipo = document.getElementById('loteriaSelect').value;

        const items = window.DATA_LOTERIAS[tipo];

        contenedor.innerHTML = "";


        Object.keys(items)
        .sort((a,b)=>{


            if(a === "00") return -1;
            if(b === "00") return 1;

            if(a === "0") return -1;
            if(b === "0") return 1;


            return Number(a)-Number(b);


        })


        .forEach(id=>{


            let btn = document.createElement("button");


            btn.className = "btn-animal";


            btn.innerHTML =

            `<strong>${id}</strong><br>${items[id]}`;



            btn.onclick = () => {


                if(this.seleccionados.includes(id)){


                    this.seleccionados =

                    this.seleccionados.filter(x => x !== id);



                    btn.classList.remove("seleccionado");


                } else {


                    this.seleccionados.push(id);


                    btn.classList.add("seleccionado");


                }


            };



            contenedor.appendChild(btn);


        });


    },



    agregarSeleccion(){


        if(this.seleccionados.length === 0){


            alert("Seleccione animales");


            return;


        }



        const monto = Number(

            document.getElementById('montoInput').value

        );



        if(monto <= 0){


            alert("Ingrese un monto válido");


            return;


        }



        const hora =

        document.getElementById('horarioSelect').value;



        const tipo =

        document.getElementById('loteriaSelect').value;




        this.seleccionados.forEach(id=>{


            const nombre =

            window.DATA_LOTERIAS[tipo][id];



            let existe = this.ticket.find(t =>


                t.id === id &&

                t.hora === hora &&

                t.loteria === tipo


            );



            if(existe){


                // SUMA EL MONTO SI YA EXISTE

                existe.monto += monto;



            } else {



                this.ticket.push({


                    id:id,

                    nombre:nombre,

                    monto:monto,

                    hora:hora,

                    loteria:tipo


                });



            }


        });




        this.seleccionados = [];



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


                <td>

                ${t.id} ${t.nombre}

                </td>


                <td>

                ${t.hora}

                </td>


                <td>

                ${t.monto}

                </td>


                <td>


                <button onclick="window.App.remover(${i})">

                X

                </button>


                </td>


            </tr>


            `;


        }).join("");




        const total =


        this.ticket.reduce(


            (suma,t)=> suma + t.monto,


            0


        );



        document.getElementById("totalDisplay")

        .innerText =


        "Total: Bs. " + total;



    },




    remover(i){


        this.ticket.splice(i,1);



        this.guardarTicket();



        this.renderTicket();



    },





    limpiarTodo(){


        if(confirm("¿Limpiar todo el ticket?")){


            this.ticket = [];



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


        const datos =


        localStorage.getItem("goldenking_ticket");



        if(datos){


            this.ticket = JSON.parse(datos);


        }


    },





    imprimirTicket(){


        if(this.ticket.length === 0){


            alert("No hay jugadas para imprimir");


            return;


        }



        const total = this.ticket.reduce(


            (suma,t)=> suma + t.monto,


            0


        );



        window.Impresion.generarTicket(


            this.ticket,


            total


        );


    }


};





window.onload = () => {


    window.App.init();


};
