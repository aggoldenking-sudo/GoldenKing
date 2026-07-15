/*
=====================================================
 GOLDEN KING POS
 SISTEMA DE TAQUILLA
 sistema.js
=====================================================
*/


const Taquilla = {


    jugadas: [],


    animales: {


        "00":"🐳 Ballena",
        "01":"🐏 Carnero",
        "02":"🐂 Toro",
        "03":"🐛 Ciempiés",
        "04":"🦂 Alacrán",
        "05":"🦁 León",
        "06":"🐸 Rana",
        "07":"🦜 Perico",
        "08":"🐭 Ratón",
        "09":"🐰 Conejo",

        "10":"🐯 Tigre",
        "11":"🐱 Gato",
        "12":"🐴 Caballo",
        "13":"🐓 Gallo",
        "14":"🐷 Cerdo",
        "15":"🦊 Zorro",
        "16":"🐻 Oso",
        "17":"🦌 Venado",
        "18":"🐐 Chivo",
        "19":"🐟 Pescado",

        "20":"🐊 Caimán",
        "21":"🐕 Perro",
        "22":"🦋 Mariposa",
        "23":"🐼 Panda",
        "24":"🦅 Águila",
        "25":"🐢 Tortuga",
        "26":"🐘 Elefante",
        "27":"🐒 Mono",
        "28":"🐓 Pavo",
        "29":"🐍 Culebra",

        "30":"🐎 Burro",
        "31":"🐺 Lobo",
        "32":"🦉 Lechuza",
        "33":"🦀 Cangrejo",
        "34":"🐝 Abeja",
        "35":"🐄 Vaca",
        "36":"🐋 Delfín",
        "37":"🦓 Cebra",
        "38":"🦈 Tiburón"

    },




    init(){


        document
        .getElementById("numero")
        .addEventListener("input",()=>{

            this.mostrarAnimal();

        });



        document
        .getElementById("agregar")
        .addEventListener("click",()=>{

            this.agregarJugada();

        });



        document
        .getElementById("limpiar")
        .addEventListener("click",()=>{

            this.limpiar();

        });



        this.actualizarTicket();


    },





    mostrarAnimal(){


        let numero =
        document.getElementById("numero").value;



        let animal =
        this.animales[numero];



        document.getElementById("animal").innerHTML =

        animal ? animal : "🐾 Número no válido";


    },






    agregarJugada(){


        let loteria =
        document.getElementById("loteria").value;



        let numero =
        document.getElementById("numero").value;



        let monto =
        Number(
        document.getElementById("monto").value
        );



        if(!this.animales[numero]){

            alert("Seleccione un número válido");

            return;

        }



        if(!monto || monto<=0){

            alert("Ingrese un monto válido");

            return;

        }





        this.jugadas.push({

            loteria,

            numero,

            animal:this.animales[numero],

            monto


        });




        this.actualizarTicket();



        document.getElementById("numero").value="";

        document.getElementById("monto").value="";

        document.getElementById("animal").innerHTML="🐾 Animal";



    },







    actualizarTicket(){


        let contenedor =
        document.getElementById("ticket");


        let total =
        0;



        if(this.jugadas.length===0){

            contenedor.innerHTML="Sin jugadas";

            document.getElementById("total").innerHTML="0";

            return;

        }




        contenedor.innerHTML="";




        this.jugadas.forEach((j,index)=>{


            total += j.monto;



            contenedor.innerHTML += `


            <div class="jugada">

            <strong>
            ${j.numero} ${j.animal}
            </strong>


            <small>
            ${j.loteria}
            </small>


            <small>
            Monto: ${j.monto} Bs
            </small>


            </div>


            `;


        });




        document.getElementById("total").innerHTML = total;



    },







    limpiar(){


        this.jugadas=[];

        this.actualizarTicket();


    }



};





document.addEventListener("DOMContentLoaded",()=>{


    Taquilla.init();


});
