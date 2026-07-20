/*
==================================================
 GOLDEN KING v3
 LOGIN SYSTEM
 Supabase Auth
==================================================
*/


import { getSupabase } from "../../services/supabase.js";



// Cliente Supabase

const supabase = getSupabase();



// Elementos

const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");

const button = loginForm.querySelector("button");





// Evento Login

loginForm.addEventListener("submit", async (e)=>{


    e.preventDefault();



    const email = 
    document.getElementById("email").value.trim();



    const password = 
    document.getElementById("password").value.trim();





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


        /*
        ==========================================
        LOGIN SUPABASE
        ==========================================
        */


        const { data, error } = 
        await supabase.auth.signInWithPassword({


            email: email,


            password: password


        });






        if(error){


            throw error;


        }





        /*
        ==========================================
        USUARIO CORRECTO

        Aquí después cargaremos:

        - Perfil
        - Rol
        - Permisos
        - Taquilla

        ==========================================
        */





        mostrarMensaje(

            "Acceso correcto",

            "#2563eb"

        );






        setTimeout(()=>{


            window.location.href = 

            "../../admin/dashboard.html";



        },1000);






    }

    catch(error){



        mostrarMensaje(

            "Usuario o contraseña incorrectos",

            "#ef4444"

        );


        console.error(error);



    }




    finally{


        button.disabled = false;

        button.textContent = "Iniciar Sesión";


    }



});







// Mostrar mensajes

function mostrarMensaje(texto,color){


    message.textContent = texto;

    message.style.color = color;


}
