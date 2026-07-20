/*
==================================================
 GOLDEN KING v3
 GESTIÓN DE TAQUILLAS
 taquillas.js
==================================================
*/


import { supabase } from "../../services/supabase.js";



console.log("TAQUILLAS SISTEMA INICIADO");




// Elementos

const formulario =
document.getElementById("taquillaForm");


const lista =
document.getElementById("listaTaquillas");


const mensaje =
document.getElementById("mensaje");




// Cargar taquillas al iniciar

cargarTaquillas();





// CREAR TAQUILLA

formulario.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    const nombre =
    document.getElementById("nombre")
    .value
    .trim();



    const codigo =
    document.getElementById("codigo")
    .value
    .trim();



    const responsable =
    document.getElementById("responsable")
    .value
    .trim();



    const estado =
    document.getElementById("estado")
    .value;





    console.log({
        nombre,
        codigo,
        responsable,
        estado
    });







    const {data,error}=

    await supabase

    .from("taquillas")

    .insert([{

        nombre,

        codigo,

        responsable,

        estado

    }])

    .select();







    if(error){


        console.error(
            "ERROR CREANDO:",
            error
        );


        mostrarMensaje(
            error.message,
            "red"
        );


        return;

    }







    mostrarMensaje(
        "Taquilla creada correctamente",
        "green"
    );



    formulario.reset();



    cargarTaquillas();



});











// MOSTRAR TAQUILLAS

async function cargarTaquillas(){



    lista.innerHTML =
    "Cargando...";





    const {data,error}=

    await supabase

    .from("taquillas")

    .select("*")

    .order(
        "created_at",
        {
            ascending:false
        }
    );





    console.log(
        "TAQUILLAS:",
        data,
        error
    );






    if(error){


        lista.innerHTML =

        "ERROR: " + error.message;


        return;

    }







    if(!data || data.length===0){


        lista.innerHTML =

        "No existen taquillas creadas";


        return;


    }








    lista.innerHTML="";





    data.forEach((taquilla)=>{


        lista.innerHTML += `


        <div class="item-taquilla">


            <h3>

            ${taquilla.nombre}

            </h3>


            Código:
            ${taquilla.codigo}


            <br>


            Responsable:
            ${taquilla.responsable}


            <br>


            Estado:
            ${taquilla.estado}



        </div>


        `;


    });



}








// MENSAJE

function mostrarMensaje(
texto,
color
){


    mensaje.textContent =
    texto;


    mensaje.style.color =
    color;



}
