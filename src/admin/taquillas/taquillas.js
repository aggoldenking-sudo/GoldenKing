/*
==================================================
 GOLDEN KING v3
 GESTIÓN DE TAQUILLAS
 taquillas.js
==================================================
*/


import { getSupabase } from "../../services/supabase.js";



const supabase = getSupabase();



console.log("✅ TAQUILLAS JS CARGADO");

console.log(
"CLIENTE SUPABASE:",
supabase
);




// Elementos

const formulario = 
document.getElementById("taquillaForm");


const lista = 
document.getElementById("listaTaquillas");


const mensaje =
document.getElementById("mensaje");




// Verificar elementos

console.log({

formulario,

lista,

mensaje

});




// Cargar al abrir

cargarTaquillas();







// CREAR TAQUILLA

formulario.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    console.log(
    "✅ FORMULARIO ENVIADO"
    );





    const nombre =
    document.getElementById("nombre").value.trim();



    const codigo =
    document.getElementById("codigo").value.trim();



    const responsable =
    document.getElementById("responsable").value.trim();



    const estado =
    document.getElementById("estado").value;





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







    console.log(
        "RESULTADO INSERT:",
        data,
        error
    );






    if(error){


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


    console.log(
        "🔄 CARGANDO TAQUILLAS..."
    );



    lista.innerHTML =
    "Consultando Supabase...";





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
        "RESULTADO SELECT:",
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









// MENSAJES

function mostrarMensaje(
texto,
color
){


    mensaje.textContent =
    texto;


    mensaje.style.color =
    color;



}
