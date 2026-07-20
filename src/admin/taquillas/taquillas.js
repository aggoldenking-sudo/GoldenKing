/*
==================================================
 GOLDEN KING v3
 GESTIÓN DE TAQUILLAS
 taquillas.js
==================================================
*/


import { getSupabase } from "../../services/supabase.js";


console.log("TAQUILLAS JS FUNCIONANDO");



const supabase = getSupabase();


console.log("SUPABASE:", supabase);




const lista =
document.getElementById("listaTaquillas");


const formulario =
document.getElementById("taquillaForm");



const mensaje =
document.getElementById("mensaje");





// Cargar al entrar

cargarTaquillas();





async function cargarTaquillas(){


    console.log("CONSULTANDO TABLA TAQUILLAS");


    lista.innerHTML =
    "Conectando con Supabase...";



    const respuesta = await supabase
    .from("taquillas")
    .select("*");



    console.log(
        "RESPUESTA:",
        respuesta
    );



    const {data,error}=respuesta;




    if(error){


        lista.innerHTML =
        "ERROR: " + error.message;


        console.error(error);


        return;

    }




    if(data.length===0){


        lista.innerHTML =
        "No existen taquillas creadas";


        return;


    }




    lista.innerHTML="";



    data.forEach(t=>{


        lista.innerHTML += `

        <div class="item-taquilla">

        <b>${t.nombre}</b>

        <br>

        Código: ${t.codigo}

        <br>

        Responsable: ${t.responsable}

        <br>

        Estado: ${t.estado}

        </div>

        `;


    });



}







// Crear taquilla


formulario.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    console.log(
        "CREANDO TAQUILLA"
    );



    const nueva = {


        nombre:
        document.getElementById("nombre").value,


        codigo:
        document.getElementById("codigo").value,


        responsable:
        document.getElementById("responsable").value,


        estado:
        document.getElementById("estado").value


    };



    console.log(nueva);





    const {data,error}=

    await supabase

    .from("taquillas")

    .insert(nueva)
    .select();




    console.log(
        data,
        error
    );




    if(error){


        mensaje.textContent =
        error.message;


        return;


    }



    mensaje.textContent =
    "Taquilla creada correctamente";



    formulario.reset();


    cargarTaquillas();



});
