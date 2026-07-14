document
.getElementById("entrar")
.addEventListener("click", function(){


    let usuario = 
    document
    .getElementById("usuario")
    .value
    .trim();


    let clave = 
    document
    .getElementById("clave")
    .value
    .trim();



    let mensaje =
    document
    .getElementById("mensaje");



    if(usuario === "admin" && clave === "1234"){


        mensaje.textContent = "Ingresando...";


        setTimeout(function(){


            window.location.href = "dashboard/index.html";


        },500);



    }else{


        mensaje.textContent =
        "Usuario o contraseña incorrectos";


    }



});
