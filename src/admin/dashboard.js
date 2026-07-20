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



    // Si no existe sesión

    if(!session){


        window.location.href =

        "../modules/auth/login.html";


        return;


    }




    const usuario = session.user;



    mostrarUsuario(usuario);



}





// Mostrar usuario

function mostrarUsuario(usuario){



    if(!userBox){

        return;

    }




    userBox.innerHTML = `

        👑

        ${usuario.email}

    `;



}







// Cerrar sesión

async function cerrarSesion(){


    await supabase.auth.signOut();



    window.location.href =

    "../modules/auth/login.html";


}






// Iniciar

verificarSesion();





// Exponer función

window.cerrarSesion = cerrarSesion;
