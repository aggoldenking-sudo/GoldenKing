/*
==================================================
 GOLDEN KING v3
 ADMIN DASHBOARD
 dashboard.js
==================================================
*/


import { getSupabase } from "../services/supabase.js";



const supabase = getSupabase();



// Elemento usuario

const userBox = document.querySelector(".user");




// Verificar sesión

async function verificarSesion(){


    const { data, error } = 
    await supabase.auth.getSession();



    if(error){

        console.error(error);

        return;

    }




    const session = data.session;



    // Si no hay sesión

    if(!session){


        window.location.href =

        "../modules/auth/login.html";


        return;

    }




    const usuario = session.user;



    // Buscar perfil

    await cargarPerfil(usuario.id);



}






// Cargar perfil desde profiles

async function cargarPerfil(id){



    const { data, error } =

    await supabase

    .from("profiles")

    .select("*")

    .eq("id", id)

    .single();





    if(error){


        console.error(
            "Error cargando perfil:",
            error
        );


        userBox.innerHTML = `

            ⚠️ Perfil no encontrado

        `;


        return;


    }





    mostrarPerfil(data);



}








// Mostrar datos del perfil

function mostrarPerfil(perfil){



    if(!userBox){

        return;

    }




    userBox.innerHTML = `


        👑

        <div>

            <strong>
                ${perfil.nombre}
            </strong>

            <br>

            <small>

                ${perfil.rol}

            </small>


        </div>


    `;



}








// Cerrar sesión

async function cerrarSesion(){


    await supabase.auth.signOut();



    window.location.href =

    "../modules/auth/login.html";


}






// Iniciar sistema

verificarSesion();





// Disponible globalmente

window.cerrarSesion = cerrarSesion;
