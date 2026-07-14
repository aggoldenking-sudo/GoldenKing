window.Taquilla = {


    sorteos: [],

    jugadas: [],



    iniciar(){


        this.cargarSorteos();



        document
        .getElementById("agregar")
        .onclick = () => {

            this.agregarJugada();

        };



        document
        .getElementById("imprimir")
        .onclick = () => {

            this.imprimir();

        };



        document
        .getElementById("copiar")
        .onclick = () => {

            this.copiarWhatsApp();

        };


    },





    cargarSorteos(){


        const lista =
        document.getElementById("listaSorteos");



        let loterias = [


            "LOTTO ACTIVO",
            "LA GRANJITA",
            "SELVA PLUS",
            "GUACHARO ACTIVO"


        ];



        let horarios = [


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




        loterias.forEach(loteria=>{


            let titulo =
            document.createElement("h3");


            titulo.textContent=loteria;


            lista.appendChild(titulo);




            horarios.forEach(hora=>{


                let boton =
                document.createElement("button");


                boton.className="btn-sorteo";


                boton.textContent=hora;




                boton.onclick=()=>{


                    boton.classList.toggle("active");



                    let existe =
                    this.sorteos.find(s=>

                        s.loteria===loteria &&
                        s.hora===hora

                    );



                    if(existe){


                        this.sorteos =
                        this.sorteos.filter(s=>

                            !(s.loteria===loteria &&
                            s.hora===hora)

                        );


                    }else{


                        this.sorteos.push({

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
        document
        .getElementById("numero")
        .value
        .trim();




        let monto =
        Number(
        document
        .getElementById("monto")
        .value
        );





        if(this.sorteos.length===0){

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





        this.sorteos.forEach(s=>{


            this.jugadas.push({


                loteria:s.loteria,

                hora:s.hora,

                numero:numero,

                animal:this.buscarAnimal(numero),

                monto:monto


            });



        });





        this.mostrarTicket();



        this.guardar();



    },







    buscarAnimal(numero){


        if(window.DATA_LOTERIAS){


            let tabla =
            DATA_LOTERIAS.LottoActivo;



            if(tabla[numero]){

                return tabla[numero];

            }


        }



        return "Animal";


    },






    mostrarTicket(){



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


            <strong>
            ${j.monto} Bs
            </strong>


            </div>


            `;



        });





        document
        .getElementById("total")
        .textContent =
        total.toFixed(2);



    },







    guardar(){


        localStorage.setItem(

            "jugadas",

            JSON.stringify(this.jugadas)

        );


    },








    copiarWhatsApp(){



        let texto =
        "👑 GOLDEN KING\n\n";



        this.jugadas.forEach(j=>{


            texto +=

            j.loteria+" "+
            j.hora+"\n"+

            j.numero+" "+
            j.animal+"\n"+

            j.monto+
            " Bs\n\n";


        });




        texto +=

        "TOTAL: "+
        document.getElementById("total").textContent+
        " Bs";





        navigator.clipboard.writeText(texto);


        alert("Ticket copiado");


    },








    imprimir(){


        let ventana =
        window.open(
            "",
            "",
            "width=300,height=600"
        );



        ventana.document.write(`

        <pre>

👑 GOLDEN KING


${document.getElementById("ticket").innerText}


TOTAL:

${document.getElementById("total").innerText} Bs


        </pre>

        `);



        ventana.print();



    }



};



Taquilla.iniciar();
