window.Taquilla = {

    sorteos: [],
    jugadas: [],


    init(){


        this.cargarSorteos();


        document
        .getElementById("numero")
        .addEventListener("input",()=>{

            this.mostrarAnimal();

        });



        document
        .getElementById("agregar")
        .onclick = ()=>{

            this.agregarJugada();

        };



        document
        .getElementById("imprimir")
        .onclick = ()=>{

            this.imprimir();

        };


    },




    cargarSorteos(){


        const lista =
        document.getElementById("listaSorteos");

        lista.innerHTML="";



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




        loterias.forEach(loteria=>{


            let titulo =
            document.createElement("h3");


            titulo.textContent=loteria;


            lista.appendChild(titulo);



            horarios.forEach(hora=>{


                let btn =
                document.createElement("button");


                btn.className="btn-sorteo";

                btn.textContent=hora;



                btn.onclick=()=>{


                    btn.classList.toggle("active");



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



                    this.mostrarAnimal();



                };



                lista.appendChild(btn);


            });


        });


    },







    mostrarAnimal(){


        let numero =
        document.getElementById("numero")
        .value.trim();



        let caja =
        document.getElementById("animalEncontrado");



        if(!caja) return;



        caja.innerHTML="";



        if(numero==="") return;



        if(this.sorteos.length===0){

            caja.innerHTML=
            "⚠️ Seleccione un sorteo";

            return;

        }



        let encontrado=false;



        this.sorteos.forEach(s=>{


            let animal =
            this.buscarAnimal(
                s.loteria,
                numero
            );



            if(animal){


                caja.innerHTML +=

                "🐾 "+animal+
                "<br>";


                encontrado=true;


            }



        });



        if(!encontrado){


            caja.innerHTML =
            "❌ Número no existe";


        }


    },







    buscarAnimal(loteria,numero){


        let tabla=null;



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


        return null;


    },








    agregarJugada(){



        let numero =
        document.getElementById("numero")
        .value.trim();



        let monto =
        Number(
        document.getElementById("monto")
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


            let animal =
            this.buscarAnimal(
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







    mostrarTicket(){


        let caja =
        document.getElementById("ticket");



        caja.innerHTML="";



        let total=0;



        this.jugadas.forEach(j=>{


            total+=j.monto;



            caja.innerHTML += `

            <div class="ticket-item">

            <b>${j.loteria}</b><br>

            ${j.hora}<br>

            ${j.numero} -
            ${j.animal}<br>

            ${j.monto} Bs

            </div>

            `;


        });



        document
        .getElementById("total")
        .textContent =
        total.toFixed(2);



    },







    imprimir(){


        let w =
        window.open(
        "",
        "",
        "width=300,height=600"
        );



        w.document.write(`

        <pre>

👑 GOLDEN KING


${document.getElementById("ticket").innerText}


TOTAL:
${document.getElementById("total").innerText} Bs


        </pre>

        `);



        w.print();


    }


};



Taquilla.init();
