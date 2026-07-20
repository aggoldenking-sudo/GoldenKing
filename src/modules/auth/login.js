/*
==================================================
 GOLDEN KING v3
 LOGIN SYSTEM
 login.js
==================================================
*/


const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");



loginForm.addEventListener("submit", (e)=>{


    e.preventDefault();



    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;



    if(!email || !password){


        message.textContent = 
        "Complete todos los campos";


        message.style.color = "red";


        return;

    }



    /*
    ==============================================
    PRUEBA TEMPORAL

    Más adelante aquí irá:

    Supabase Auth
    Validación de usuario
    Roles
    Permisos
    Redirección

    ==============================================
    */


    message.textContent =
    "Sistema preparado correctamente";


    message.style.color =
    "#2563eb";



});
