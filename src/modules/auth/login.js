/*
==================================================
 GOLDEN KING v3
 LOGIN SYSTEM
 Supabase Auth
==================================================
*/

import { supabase } from "../../services/supabase.js";



// Elementos

const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");

const button = loginForm.querySelector("button");




// Evento Login

loginForm.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const email =
    document.getElementById("email")
    .value
    .trim();

    const password =
    document.getElementById("password")
    .value
    .trim();



    if(!email || !password){

        mostrarMensaje(
            "Complete todos los campos",
            "#ef4444"
        );

        return;

    }



    button.disabled = true;

    button.textContent = "Ingresando...";



    try{

        const { error } =
        await supabase.auth.signInWithPassword({

            email,

            password

        });



        if(error){

            throw error;

        }



        mostrarMensaje(

            "Acceso correcto",

            "#16a34a"

        );



        setTimeout(()=>{

            window.location.href =
            "../../admin/dashboard.html";

        },800);



    }

    catch(error){

        console.error(error);

        mostrarMensaje(

            error.message,

            "#ef4444"

        );

    }

    finally{

        button.disabled = false;

        button.textContent = "Iniciar Sesión";

    }

});





function mostrarMensaje(texto,color){

    message.textContent = texto;

    message.style.color = color;

}
