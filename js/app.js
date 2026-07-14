window.App = {

    ticket: [],
    seleccionados: [],


    init() {

        this.cargarTicket();

        this.cargarLoterias();

        this.renderMatriz();

        this.renderTicket();

    },



    cargarLoterias(){

        const select = document.getElementById("loteriaSelect");

        select.innerHTML = "";


        Object.keys(window.DATA_LOTERIAS).forEach(l => {


            let option = document.createElement("option");

            option.value = l;

            option.textContent = l;

            select.appendChild(option);


        });


    },



    renderMatriz(){


        const contenedor =
        document.getElementById("matrizAnimalitos");


        const tipo =
        document.getElementById("loteriaSelect").value;



        const items =
        window.DATA_LOTERIAS[tipo];



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

                    this.seleccionados.filter(

                    x=>x!==id

                    );


                    btn.classList.remove("seleccionado");


                }

                else{


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



        const monto = Number(

        document.getElementById("montoInput").value

        );



        const hora =

        document.getElementById("horarioSelect").value;



        const tipo =

        document.getElementById("loteriaSelect").value;




        this.seleccionados.forEach(id=>{


            this.agregarJugada(id,monto,hora,tipo);



        });




        this.seleccionados=[];



        this.guardarTicket();


        this.renderMatriz();

        this.renderTicket();



    },





    agregarJugada(id,monto,hora,tipo){



        let existe = this.ticket.find(t=>


            t.id===id &&

            t.hora===hora &&

            t.loteria===tipo


        );




        if(existe){


            existe.monto += monto;


        }

        else{


            this.ticket.push({


                id:id,


                nombre:

                window.DATA_LOTERIAS[tipo][id],


                monto:monto,


                hora:hora,


                loteria:tipo


            });



        }



    },







    agregarCodigoRapido(codigo){



        const tipo =

        document.getElementById("loteriaSelect").value;



        const animales =

        window.DATA_LOTERIAS[tipo];



        if(animales[codigo] === undefined){


            alert("Código no existe");


            return;


        }





        const monto = Number(

        document.getElementById("montoInput").value

        );



        const hora =

        document.getElementById("horarioSelect").value;



        this.agregarJugada(

            codigo,

            monto,

            hora,

            tipo

        );



        this.guardarTicket();


        this.renderTicket();



    },







    renderTicket(){


        const tbody =

        document.querySelector("#ticketTable tbody");



        tbody.innerHTML = this.ticket.map((t,i)=>`


        <tr>

        <td>${t.id} ${t.nombre}</td>

        <td>${t.hora}</td>

        <td>Bs.${t.monto}</td>

        <td>

        <button onclick="window.App.remover(${i})">

        X

        </button>

        </td>


        </tr>


        `).join("");




        const total = this.ticket.reduce(

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


        if(confirm("¿Limpiar ticket?")){


            this.ticket=[];


            this.seleccionados=[];


            this.guardarTicket();


            this.renderMatriz();


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


        let datos=

        localStorage.getItem(

        "goldenking_ticket"

        );



        if(datos){


            this.ticket=JSON.parse(datos);


        }



    },







    imprimirTicket(){


        if(this.ticket.length===0){


            alert("No hay jugadas");


            return;


        }



        const total=this.ticket.reduce(

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






window.onload=()=>{


    window.App.init();


};







// ENTER PARA CODIGO RAPIDO

document.addEventListener("keydown",function(e){



    if(e.key==="Enter"){



        const campo=

        document.activeElement;



        if(campo.id==="codigoAnimal"){



            window.App.agregarCodigoRapido(

            campo.value.trim()

            );



            campo.value="";



        }



    }



});







// ESC CANCELAR SELECCION

document.addEventListener("keydown",function(e){


    if(e.key==="Escape"){


        window.App.seleccionados=[];


        window.App.renderMatriz();


    }


});
