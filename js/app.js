window.App = {

    sorteosSeleccionados: [],
    jugadas: [],
    numeroTicket: 1,


    init(){

        this.cargarSorteos();


        document
        .getElementById("agregar")
        .onclick = () => {

            this.agregarJugada();

        };


        document
        .getElementById("imprimir")
        .onclick = () => {

            this.imprimirTicket();

        };


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



        document
        .getElementById("limpiarSeleccion")
        .onclick = () => {

            this.sorteosSeleccionados=[];

            document
            .querySelectorAll(".btn-sorteo")
            .forEach(b=>{

                b.classList.remove("active");

            });

        };



        document
        .getElementById("seleccionarTodos")
        .onclick = () => {


            document
            .querySelectorAll(".btn-sorteo")
            .forEach(b=>{


                b.classList.add("active");


                let existe =
                this.sorteosSeleccionados.find(s=>

                    s.loteria==b.dataset.loteria &&
                    s.hora==b.dataset.hora

                );


                if(!existe){

                    this.sorteosSeleccionados.push({

                        loteria:b.dataset.loteria,

                        hora:b.dataset.hora

                    });

                }


            });


        };


    },



    cargarSorteos(){


        let lista =
        document.getElementById("listaSorteos");


        let loterias=[

            "LOTTO ACTIVO",
            "LA GRANJITA",
            "SELVA PLUS",
            "GUACHARO ACTIVO"

        ];


        let horarios=[

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



        lista.innerHTML="";


        loterias.forEach(loteria=>{


            let titulo =
            document.createElement("h4");

            titulo.textContent=loteria;

            lista.appendChild(titulo);



            horarios.forEach(hora=>{


                let boton =
                document.createElement("button");


                boton.textContent=hora;

                boton.className="btn-sorteo";


                boton.dataset.loteria=loteria;

                boton.dataset.hora=hora;



                boton.onclick=()=>{


                    boton.classList.toggle("active");



                    let existe =
                    this.sorteosSeleccionados.find(s=>

                        s.loteria==loteria &&
                        s.hora==hora

                    );



                    if(existe){


                        this.sorteosSeleccionados =
                        this.sorteosSeleccionados.filter(s=>

                            !(s.loteria==loteria &&
                            s.hora==hora)

                        );


                    }else{


                        this.sorteosSeleccionados.push({

                            loteria:loteria,

                            hora:hora

                        });


                    }



                };



                lista.appendChild(boton);


            });



        });


    },




    agregarJugada(){


        let numero =
        document.getElementById("numero").value.trim();


        let monto =
        Number(
        document.getElementById("monto").value
        );



        if(this.sorteosSeleccionados.length===0){

            alert("Seleccione un sorteo");

            return;

        }



        if(numero=="" || monto<=0){

            alert("Ingrese número y monto");

            return;

        }




        this.sorteosSeleccionados.forEach(s=>{


            let animal =
            this.obtenerAnimal(
                s.loteria,
                numero
            );


            if(animal){


                this.jugadas.push({

                    loteria:s.loteria,

                    hora:s.hora,

                    numero:numero,

                    animal:animal,

                    monto:monto

                });


            }


        });



        this.mostrarTicket();


    },




    obtenerAnimal(loteria,numero){


        let tabla=null;


        if(loteria=="LOTTO ACTIVO")
            tabla=DATA_LOTERIAS.LottoActivo;


        if(loteria=="LA GRANJITA")
            tabla=DATA_LOTERIAS.Granjita;


        if(loteria=="SELVA PLUS")
            tabla=DATA_LOTERIAS.SelvaPlus;


        if(loteria=="GUACHARO ACTIVO")
            tabla=DATA_LOTERIAS.Guacharo;



        if(tabla && tabla[numero]){


            return tabla[numero]
            .replace(/^.*?\s/,"");


        }


        return "Desconocido";


    },




    mostrarTicket(){


        let div =
        document.getElementById("ticket");


        div.innerHTML="";


        let total=0;


        this.jugadas.forEach(j=>{


            total+=j.monto;


            div.innerHTML += `

            <div class="ticket-item">

            <b>${j.loteria}</b><br>

            ${j.hora}<br>

            ${j.numero} ${j.animal}

            <strong>${j.monto} Bs</strong>

            </div>

            `;


        });



        document
        .getElementById("total")
        .innerHTML=total.toFixed(2);



    },




    imprimirTicket(){


        if(this.jugadas.length==0){

            alert("Ticket vacío");

            return;

        }



        let texto="";



        this.jugadas.forEach(j=>{


            texto += `

${j.loteria} ${j.hora}

${j.numero} ${j.animal}

${j.monto} Bs

----------------

`;

        });



        let ventana =
        window.open("","", "width=350,height=600");


        ventana.document.write(`

        <h3 align="center">
        AGENCIA GOLDEN KING
        </h3>

        TICKET: ${this.numeroTicket}

        <hr>

        ${texto}

        TOTAL:
        ${document.getElementById("total").innerHTML}
        Bs

        <hr>

        El Ticket caduca a los 3 días.

        `);


        ventana.print();


        this.numeroTicket++;


    }


};


App.init();
