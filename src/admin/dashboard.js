/*
==================================================
 GOLDEN KING v3
 ADMIN DASHBOARD
 dashboard.js
==================================================
*/


import { supabase } from "../services/supabase.js";



const userBox =
document.querySelector(".user");





async function verificarSesion(){



    const {
        data,
        error
    } = await supabase.auth.getSession();




    if(error){

        console.error(error);

        return;

    }




    const session =
    data.session;




    if(!session){


        window.location.href =
        "../modules/auth/login.html";


        return;

    }




    const usuario =
    session.user;






    cargarPerfil(usuario.id);



}









async function cargarPerfil(id){



    const {
        data,
        error
    } = await supabase

    .from("profiles")

    .select("*")

    .eq(
        "id",
        id
    )

    .single();






    if(error){


        console.error(
            "ERROR PERFIL:",
            error
        );


        userBox.innerHTML =

        "Perfil no encontrado";


        return;

    }







    userBox.innerHTML = `


    👑 ${data.nombre}


    <br>


    <small>

    Rol:
    ${data.rol.toUpperCase()}

    </small>


    `;







    // Verificar administrador


    if(data.rol !== "admin"){


        alert(
        "Acceso limitado"
        );


    }



}









async function cerrarSesion(){


    await supabase.auth.signOut();


    window.location.href =
    "../modules/auth/login.html";


}






verificarSesion();




window.cerrarSesion =
cerrarSesion;
