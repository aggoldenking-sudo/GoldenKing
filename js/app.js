window.App = {

    ticket: [],
    seleccionados: [],
    codigoPendiente: null,


    init() {

        const select = document.getElementById("loteriaSelect");

        select.innerHTML = "";

        Object.keys(window.DATA_LOTERIAS).forEach(loteria => {
            select.innerHTML += `
                <option value="${loteria}">
                    ${loteria}
                </option>`;
        });


        select.addEventListener("change", () => {
            this.seleccionados = [];
            this.renderMatriz();
        });


        this.cargarTicket();
        this.renderMatriz();
        this.renderTicket();


        const codigo = document.getElementById("codigoAnimal");

        if(codigo){
            codigo.focus();
        }

    },



    renderMatriz(){

        const contenedor =
        document.getElementById("matrizAnimalitos");


        const loteria =
        document.getElementById("loteriaSelect").value;


        const animales =
        window.DATA_LOTERIAS[loteria];


        contenedor.innerHTML = "";


        Object.keys(animales)
        .sort((a,b)=>{

            if(a==="00") return -1;
            if(b==="00") return 1;

            return Number(a)-Number(b);

        })
        .forEach(id=>{


            let btn =
            document.createElement("button");


            btn.className="btn-animal";


            btn.innerHTML =
            `<strong>${id}</strong><br>${animales[id]}`;



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



        const monto =
        Number(document.getElementById("montoInput").value);



        if(!monto || monto<=0){

            alert("Coloque un monto válido");
            return;

        }



        const hora =
        document.getElementById("horarioSelect").value;



        const loteria =
        document.getElementById("loteriaSelect").value;




        this.seleccionados.forEach(id=>{


            let existe =
            this.ticket.find(t=>

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

                    loteria:loteria,

                    fecha:
                    new Date().toLocaleString()

                });


            }


        });



        this.seleccionados=[];


        this.guardarTicket();

        this.renderMatriz();

        this.renderTicket();


        document.getElementById("montoInput").value="";

        document.getElementById("codigoAnimal").focus();



    },






    agregarCodigo(codigo){


        const loteria =
        document.getElementById("loteriaSelect").value;



        if(!window.DATA_LOTERIAS[loteria][codigo]){

            alert("Código no existe");
            return;

        }



        this.codigoPendiente=codigo;


        document.getElementById("montoInput").focus();


        document.getElementById("montoInput").select();


    },








    agregarDirecto(){


        if(!this.codigoPendiente) return;


        const monto =
        Number(document.getElementById("montoInput").value);



        if(!monto || monto<=0){

            alert("Monto inválido");
            return;

        }



        const codigo =
        this.codigoPendiente;



        const hora =
        document.getElementById("horarioSelect").value;



        const loteria =
        document.getElementById("loteriaSelect").value;



        let existe =
        this.ticket.find(t=>

            t.id===codigo &&
            t.hora===hora &&
            t.loteria===loteria

        );



        if(existe){

            existe.monto+=monto;


        }else{


            this.ticket.push({

                id:codigo,

                nombre:
                window.DATA_LOTERIAS[loteria][codigo],

                monto:monto,

                hora:hora,

                loteria:loteria,

                fecha:
                new Date().toLocaleString()

            });


        }



        this.guardarTicket();

        this.renderTicket();


        document.getElementById("codigoAnimal").value="";

        document.getElementById("montoInput").value="";


        this.codigoPendiente=null;


        document.getElementById("codigoAnimal").focus();


    },







    renderTicket(){


        const tbody =
        document.querySelector("#ticketTable tbody");


        if(!tbody) return;



        tbody.innerHTML =
        this.ticket.map((t,i)=>{


            return `

            <tr>

            <td>
            ${t.id} ${t.nombre}
            </td>


            <td>
            ${t.loteria}
            </td>


            <td>
            ${t.hora}
            </td>


            <td>
            Bs.${t.monto}
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
            (s,t)=>s+t.monto,
            0
        );


        document.getElementById("totalDisplay")
        .innerText =
        "Total: Bs. "+total;



    },







    remover(i){

        this.ticket.splice(i,1);

        this.guardarTicket();

        this.renderTicket();

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


    },






    limpiarTodo(){


        this.ticket=[];

        this.guardarTicket();

        this.renderTicket();


    },







    imprimirTicket(){


        if(this.ticket.length===0){

            alert("No hay jugadas");
            return;

        }



        const total =
        this.ticket.reduce(
            (s,t)=>s+t.monto,
            0
        );



        let historial =
        JSON.parse(
            localStorage.getItem("goldenking_historial")
        ) || [];



        historial.push({

            fecha:
            new Date().toLocaleString(),

            jugadas:this.ticket,

            total:total

        });



        localStorage.setItem(

            "goldenking_historial",

            JSON.stringify(historial)

        );



        if(window.Impresion){

            window.Impresion.generarTicket(
                this.ticket,
                total
            );

        }



        this.limpiarTodo();


    }


};







// ===============================
// CONTROL TECLADO
// ===============================


document.addEventListener("keydown",function(e){


    if(e.key!=="Enter") return;


    let campo =
    document.activeElement;



    if(campo.id==="codigoAnimal"){


        e.preventDefault();


        let codigo =
        campo.value.trim();


        window.App.agregarCodigo(codigo);



    }



    else if(campo.id==="montoInput"){


        e.preventDefault();


        window.App.agregarDirecto();



    }



});







window.onload=function(){

    window.App.init();

};
