window.App = {

    sorteosSeleccionados: [],
    jugadas: [],
    numeroTicket: 1,


    init(){

        this.cargarSorteos();


        const agregar = document.getElementById("agregar");

        if(agregar){

            agregar.onclick = () => {

                this.agregarJugada();

            };

        }



        const imprimir = document.getElementById("imprimir");

        if(imprimir){

            imprimir.onclick = () => {

                this.imprimirTicket();

            };

        }



        const copiar = document.getElementById("copiarTicket");

        if(copiar){

            copiar.onclick = () => {

                this.copiarTicket();

            };

        }



        const todos = document.getElementById("seleccionarTodos");

        if(todos){

            todos.onclick = () => {

                this.seleccionarTodos();

            };

        }



        const limpiar = document.getElementById("limpiarSeleccion");

        if(limpiar){

            limpiar.onclick = () => {

                this.limpiarSeleccion();

            };

        }


    },





    cargarSorteos(){


        const lista =
        document.getElementById("listaSorteos");


        if(!lista) return;



        const loterias = [

            "LOTTO ACTIVO",
            "LA GRANJITA",
            "SELVA PLUS",
            "GUACHARO ACTIVO"

        ];



        const horarios = [

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


                boton.className="btn-sorteo";


                boton.textContent=hora;


                boton.dataset.loteria=loteria;

                boton.dataset.hora=hora;




                boton.onclick=()=>{


                    boton.classList.toggle("active");



                    let existe =
                    this.sorteosSeleccionados.some(s=>

                        s.loteria===loteria &&
                        s.hora===hora

                    );




                    if(existe){


                        this.sorteosSeleccionados =
                        this.sorteosSeleccionados.filter(s=>

                            !(s.loteria===loteria &&
                            s.hora===hora)

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




        if(numero===""){

            alert("Ingrese número");

            return;

        }




        if(monto<=0){

            alert("Ingrese monto");

            return;

        }






        this.sorteosSeleccionados.forEach(s=>{


            this.jugadas.push({


                loteria:s.loteria,

                hora:s.hora,

                numero:numero,

                animal:this.buscarAnimal(
                    s.loteria,
                    numero
                ),

                monto:monto


            });


        });





        this.mostrarTicket();



        document.getElementById("numero").value="";

        document.getElementById("monto").value="";



    },







    buscarAnimal(loteria,numero){



        let tabla=null;



        if(loteria==="LOTTO ACTIVO")
            tabla=DATA_LOTERIAS.LottoActivo;


        if(loteria==="LA GRANJITA")
            tabla=DATA_LOTERIAS.Granjita;


        if(loteria==="SELVA PLUS")
            tabla=DATA_LOTERIAS.SelvaPlus;


        if(loteria==="GUACHARO ACTIVO")
            tabla=DATA_LOTERIAS.Guacharo;




        if(tabla && tabla[numero]){

            return tabla[numero];

        }



        return "Animal";

    },







    mostrarTicket(){


        let caja =
        document.getElementById("ticket");


        let totalBox =
        document.getElementById("total");


        if(!caja) return;



        caja.innerHTML="";

        let total=0;



        this.jugadas.forEach(j=>{


            total+=j.monto;



            caja.innerHTML += `

            <div class="ticket-item">

            <b>${j.loteria}</b><br>

            ${j.hora}<br>

            ${j.numero} - ${j.animal}

            <strong>${j.monto} Bs</strong>


            </div>

            `;


        });



        if(totalBox){

            totalBox.innerHTML =
            total.toFixed(2);

        }



    },








    seleccionarTodos(){


        document
        .querySelectorAll(".btn-sorteo")
        .forEach(b=>{


            b.classList.add("active");


            let existe =
            this.sorteosSeleccionados.some(s=>

                s.loteria===b.dataset.loteria &&
                s.hora===b.dataset.hora

            );



            if(!existe){

                this.sorteosSeleccionados.push({

                    loteria:b.dataset.loteria,

                    hora:b.dataset.hora

                });

            }


        });


    },







    limpiarSeleccion(){


        this.sorteosSeleccionados=[];


        document
        .querySelectorAll(".btn-sorteo")
        .forEach(b=>{

            b.classList.remove("active");

        });


    },







    copiarTicket(){


        let texto="👑 GOLDEN KING\n\n";


        this.jugadas.forEach(j=>{


            texto +=

            j.loteria+"\n"+
            j.hora+"\n"+
            j.numero+" "+j.animal+"\n"+
            j.monto+" Bs\n\n";


        });



        texto += "TOTAL: "+
        document.getElementById("total").innerText+
        " Bs";



        navigator.clipboard.writeText(texto);



        alert("Ticket copiado para WhatsApp");


    },







    imprimirTicket(){


        let ventana =
        window.open(
        "",
        "",
        "width=250,height=600"
        );



        ventana.document.write(`

        <pre>

👑 GOLDEN KING


${document.getElementById("ticket").innerText}


TOTAL:

${document.getElementById("total").innerText} Bs


Gracias por su jugada


        </pre>

        `);



        ventana.print();


    }



};



App.init();
