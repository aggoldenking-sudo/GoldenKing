window.App = {

    sorteosSeleccionados: [],
    jugadas: [],
    numeroTicket: 1,


    init:function(){


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
        .getElementById("copiarTicket")
        .onclick = () => {

            this.copiarTicket();

        };



        document
        .getElementById("seleccionarTodos")
        .onclick = () => {

            this.seleccionarTodos();

        };



        document
        .getElementById("limpiarSeleccion")
        .onclick = () => {

            this.limpiarSeleccion();

        };


    },



    cargarSorteos:function(){


        let lista =
        document.getElementById("listaSorteos");


        let loterias = [

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


                let btn =
                document.createElement("button");


                btn.className="btn-sorteo";


                btn.textContent=hora;



                btn.dataset.loteria=loteria;

                btn.dataset.hora=hora;



                btn.onclick=()=>{


                    btn.classList.toggle("active");



                    let existe =
                    this.sorteosSeleccionados.find(x=>

                        x.loteria==loteria &&
                        x.hora==hora

                    );



                    if(existe){


                        this.sorteosSeleccionados =
                        this.sorteosSeleccionados.filter(x=>

                            !(x.loteria==loteria &&
                            x.hora==hora)

                        );


                    }else{


                        this.sorteosSeleccionados.push({

                            loteria:loteria,

                            hora:hora

                        });


                    }



                };



                lista.appendChild(btn);



            });



        });



    },




    agregarJugada:function(){



        let numero =
        document.getElementById("numero").value.trim();



        let monto =
        Number(
        document.getElementById("monto").value
        );



        if(this.sorteosSeleccionados.length==0){

            alert("Seleccione una lotería y horario");

            return;

        }



        if(numero==""){

            alert("Ingrese número");

            return;

        }



        if(monto<=0){

            alert("Ingrese monto");

            return;

        }




        this.sorteosSeleccionados.forEach(s=>{


            let animal =
            this.buscarAnimal(
                s.loteria,
                numero
            );



            this.jugadas.push({


                loteria:s.loteria,

                hora:s.hora,

                numero:numero,

                animal:animal,

                monto:monto


            });



        });




        this.mostrarTicket();



        document.getElementById("numero").value="";

        document.getElementById("monto").value="";



    },




    buscarAnimal:function(loteria,numero){



        let tabla;



        switch(loteria){


            case "LOTTO ACTIVO":
            tabla=DATA_LOTERIAS.LottoActivo;
            break;


            case "LA GRANJITA":
            tabla=DATA_LOTERIAS.Granjita;
            break;


            case "SELVA PLUS":
            tabla=DATA_LOTERIAS.SelvaPlus;
            break;


            case "GUACHARO ACTIVO":
            tabla=DATA_LOTERIAS.Guacharo;
            break;


        }



        if(tabla && tabla[numero]){


            return tabla[numero];


        }



        return "Animal";


    },




    mostrarTicket:function(){



        let caja =
        document.getElementById("ticket");



        caja.innerHTML="";



        let total=0;



        this.jugadas.forEach(j=>{


            total += j.monto;



            caja.innerHTML += `

            <div class="ticket-item">

            <b>${j.loteria}</b><br>

            ${j.hora}<br>

            ${j.numero} - ${j.animal}

            <strong>${j.monto} Bs</strong>


            </div>

            `;



        });



        document
        .getElementById("total")
        .innerHTML =
        total.toFixed(2);



    },




    seleccionarTodos:function(){


        document
        .querySelectorAll(".btn-sorteo")
        .forEach(b=>{


            b.classList.add("active");


            this.sorteosSeleccionados.push({

                loteria:b.dataset.loteria,

                hora:b.dataset.hora

            });


        });


    },




    limpiarSeleccion:function(){


        this.sorteosSeleccionados=[];


        document
        .querySelectorAll(".btn-sorteo")
        .forEach(b=>{

            b.classList.remove("active");

        });


    },





    copiarTicket:function(){


        let texto="👑 GOLDEN KING\n\n";


        this.jugadas.forEach(j=>{


            texto +=

            j.loteria+"\n"+
            j.hora+"\n"+
            j.numero+" "+j.animal+"\n"+
            j.monto+" Bs\n\n";


        });



        texto +=

        "TOTAL: "+
        document.getElementById("total").innerHTML+
        " Bs";



        navigator.clipboard.writeText(texto);


        alert("Ticket copiado para WhatsApp");


    },





    imprimirTicket:function(){


        let ventana =
        window.open("","", "width=250,height=600");



        ventana.document.write(`

        <pre>

👑 GOLDEN KING


${document.getElementById("ticket").innerText}


TOTAL:
${document.getElementById("total").innerHTML} Bs


Gracias por su jugada

        </pre>

        `);



        ventana.print();


    }


};



App.init();
