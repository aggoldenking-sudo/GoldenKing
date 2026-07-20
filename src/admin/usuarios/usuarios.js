/*
==================================================
 GOLDEN KING v3
 GESTIÓN DE USUARIOS
 usuarios.js
==================================================
*/


import { supabase } from "../../services/supabase.js";



console.log("USUARIOS SISTEMA INICIADO");




// Elementos

const listaUsuarios =
document.getElementById("listaUsuarios");


const selectTaquilla =
document.getElementById("taquilla");




const formulario =
document.getElementById("usuarioForm");






// Iniciar

cargarTaquillas();

cargarUsuarios();







// Cargar taquillas

async function cargarTaquillas(){



    const {data,error} =

    await supabase

    .from("taquillas")

    .select("*")

    .eq(
        "estado",
        "activo"
    );




    if(error){

        console.error(error);

        selectTaquilla.innerHTML =
        "Error cargando";

        return;

    }





    selectTaquilla.innerHTML = "";





    data.forEach((taquilla)=>{


        selectTaquilla.innerHTML += `


        <option value="${taquilla.id}">

        ${taquilla.nombre}

        </option>


        `;


    });



}









// Cargar usuarios

async function cargarUsuarios(){



    listaUsuarios.innerHTML =
    "Cargando...";





    const {data,error}=

    await supabase

    .from("profiles")

    .select(`

        *,

        taquillas(

            nombre

        )

    `)

    .order(
        "created_at",
        {
            ascending:false
        }
    );





    console.log(
        "USUARIOS:",
        data,
        error
    );






    if(error){


        listaUsuarios.innerHTML =
        error.message;


        return;


    }







    if(!data.length){


        listaUsuarios.innerHTML =
        "No existen usuarios";


        return;


    }







    listaUsuarios.innerHTML="";






    data.forEach((usuario)=>{


        listaUsuarios.innerHTML += `


        <div class="item-usuario">


        <strong>

        ${usuario.nombre}

        </strong>


        <br>


        Email:
        ${usuario.email}


        <br>


        Rol:
        ${usuario.rol}


        <br>


        Taquilla:

        ${usuario.taquillas?.nombre || "Sin asignar"}



        </div>


        `;



    });



}







// Crear usuario (temporal)

formulario.addEventListener(
"submit",
(e)=>{


    e.preventDefault();


    alert(
        "Módulo de creación listo. Falta conectar Auth."
    );


});
