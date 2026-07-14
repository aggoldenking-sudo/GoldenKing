window.App = {

    ticket: [],
    seleccionados: [],


    init() {

        this.cargarTicket();

        this.renderMatriz();

        this.renderTicket();


    },



    renderMatriz() {


        const contenedor = document.getElementById("matrizAnimalitos");


        const tipo = document.getElementById("loteriaSelect").value;


        const items = window.DATA_LOTERIAS[tipo];



        if(!items){

            console.error("No hay datos de lotería");

            return;

        }



        contenedor.innerHTML = "";



        Object.keys(items)
        .sort((a,b)=>{


            if(a==="00") return -1;

            if(b==="00") return 1;


            if(a==="0") return -1;

            if(b==="0") return 1;


            return Number(a)-Number(b);


        })

        .forEach(id=>{


            let btn=document.createElement("button");


            btn.className="btn-animal";


            btn.innerHTML=

            `<strong>${id}</strong><br>${items[id]}`;



            if(this.seleccionados.includes(id)){

                btn.classList.add("seleccionado");

            }



            btn.onclick=()=>{


                if(this.seleccionados.includes(id)){


                    this.seleccionados =

                    this.seleccionados.filter(x=>x!==id);


                    btn.classList.remove("seleccionado");


                }else{


                    this.seleccionados.push(id);


                    btn.classList.add("seleccionado");


                }


            };



            contenedor.appendChild(btn);


        });



    },





    agregarSeleccion(){


        if(this.seleccionados.length===0){


            alert("Seleccione animales");


            return;


        }



        const monto=

        Number(document.getElementById("montoInput").value);



        const hora=

        document.getElementById("horarioSelect").value;



        const loteria=

        document.getElementById("loteriaSelect").value;




        this.seleccionados.forEach(id=>{


            this.agregarJugada(id,monto,hora,loteria);


        });



        this.seleccionados=[];


        this.guardarTicket();


        this.renderMatriz();


        this.renderTicket();



    },






    agregarJugada(id,monto,hora,loteria){



        let existe=this.ticket.find(t=>


            t.id===id &&

            t.hora===hora &&

            t.loteria===loteria


        );



        if(existe){


            existe.monto += monto;


        }else{


            this.ticket.push({


                id:id,


                nombre:

                window.DATA_LOTERIAS[loteria][id],


                monto:monto,


                hora:hora,


                loteria:loteria


            });


        }


    },






    agregarCodigoRapido(codigo){


        const loteria=

        document.getElementById("loteriaSelect").value;



        const animales=

        window.DATA_LOTERIAS[loteria];



        if(!animales[codigo]){


            alert("Código no existe");


            return;


        }



        const monto=

        Number(document.getElementById("montoInput").value);



        const hora=

        document.getElementById("horarioSelect").value;



        this.agregarJugada(

            codigo,

            monto,

            hora,

            loteria

        );



        this.guardarTicket();


        this.renderTicket();



    },






    renderTicket(){


        const tbody=

        document.querySelector("#ticketTable tbody");



        if(!tbody) return;



        tbody.innerHTML=this.ticket.map((t,i)=>`


        <tr>

        <td>${t.id} ${t.nombre}</td>

        <td>${t.hora}</td>

        <td>${t.monto}</td>

        <td>

        <button onclick="window.App.remover(${i})">

        X

        </button>

        </td>


        </tr>


        `).join("");




        const total=

        this.ticket.reduce(

            (s,t)=>s+t.monto,

            0

        );



        document.getElementById("totalDisplay")

        .innerText=

        "Total: Bs. "+total;



    },







    remover(i){


        this.ticket.splice(i,1);


        this.guardarTicket();


        this.renderTicket();


    },






    limpiarTodo(){


        this.ticket=[];


        this.seleccionados=[];


        this.guardarTicket();


        this.renderMatriz();


        this.renderTicket();


    },







    guardarTicket(){


        localStorage.setItem(

            "goldenking_ticket",

            JSON.stringify(this.ticket)

        );


    },






    cargarTicket(){


        let datos=

        localStorage.getItem(

            "goldenking_ticket"

        );



        if(datos){


            this.ticket=

            JSON.parse(datos);


        }


    },







    imprimirTicket(){


        if(this.ticket.length===0){


            alert("No hay jugadas");


            return;


        }



        let total=

        this.ticket.reduce(

            (s,t)=>s+t.monto,

            0

        );



        window.Impresion.generarTicket(

            this.ticket,

            total

        );



        this.ticket=[];


        this.guardarTicket();


        this.renderTicket();



    }


};





window.onload=function(){


    window.App.init();


};





// CODIGO RAPIDO

document.addEventListener("keydown",function(e){


    if(e.key==="Enter"){


        let campo=document.activeElement;


        if(campo && campo.id==="codigoAnimal"){


            window.App.agregarCodigoRapido(

                campo.value.trim()

            );


            campo.value="";


        }


    }


});
