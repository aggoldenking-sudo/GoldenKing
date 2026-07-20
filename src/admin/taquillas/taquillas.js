/*
==================================================
 GOLDEN KING v3
 GESTIÓN DE TAQUILLAS
 taquillas.js
==================================================
*/


import { getSupabase } from "../../services/supabase.js";



const supabase = getSupabase();




// Elementos

const formulario = 
document.getElementById("taquillaForm");


const lista = 
document.getElementById("listaTaquillas");


const mensaje =
document.getElementById("mensaje");






// Cargar al iniciar

cargarTaquillas();





// Crear taquilla

formulario.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();




    const nombre =
    document.getElementById("nombre").value.trim();



    const codigo =
    document.getElementById("codigo").value.trim();



    const responsable =
    document.getElementById("responsable").value.trim();



    const estado =
    document.getElementById("estado").value;






    const {error}=

    await supabase

    .from("taquillas")

    .insert({


        nombre,

        codigo,

        responsable,

        estado


    });






    if(error){


        console.error(error);


        mostrarMensaje(
            "Error creando taquilla",
            "#ef4444"
        );


        return;


    }







    mostrarMensaje(

        "Taquilla creada correctamente",

        "#2563eb"

    );




    formulario.reset();



    cargarTaquillas();



});









// Mostrar taquillas

async function cargarTaquillas(){



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





    if(error){


        console.error(error);

        lista.innerHTML =

        "Error cargando taquillas";


        return;


    }






    if(!data.length){


        lista.innerHTML =

        "No existen taquillas creadas";


        return;


    }







    lista.innerHTML="";





    data.forEach((taquilla)=>{


        lista.innerHTML += `


        <div class="item-taquilla">


            <strong>

            ${taquilla.nombre}

            </strong>


            <br>


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








// Mensajes

function mostrarMensaje(texto,color){


    mensaje.textContent = texto;

    mensaje.style.color=color;


}
