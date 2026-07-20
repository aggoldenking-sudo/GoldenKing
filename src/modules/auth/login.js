/*
==================================================
 GOLDEN KING v3
 LOGIN SYSTEM
 login.js
==================================================
*/


// Elementos del formulario

const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");

const button = loginForm?.querySelector("button");




// Verificar que exista el formulario

if(loginForm){


loginForm.addEventListener("submit",(e)=>{


    e.preventDefault();



    const email = 
    document.getElementById("email").value.trim();



    const password = 
    document.getElementById("password").value.trim();




    // Limpiar mensaje

    message.textContent = "";




    if(!email || !password){


        mostrarMensaje(
            "Complete todos los campos",
            "#ef4444"
        );


        return;

    }



    // Estado de carga

    button.disabled = true;

    button.textContent = "Ingresando...";




    /*
    ==================================================
    FUTURA CONEXIÓN SUPABASE

    Aquí irá:

    supabase.auth.signInWithPassword()

    Validación del usuario

    Consulta del rol:

    Super Admin
    Administrador
    Cajero
    Supervisor

    Redirección:

    Dashboard
    Taquilla

    ==================================================
    */





    setTimeout(()=>{


        mostrarMensaje(
            "Sistema preparado correctamente",
            "#2563eb"
        );


        button.disabled = false;

        button.textContent = "Iniciar Sesión";



    },1000);




});


}




// Función mensajes

function mostrarMensaje(texto,color){


    message.textContent = texto;


    message.style.color = color;


}
