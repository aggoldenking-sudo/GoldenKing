document
.getElementById("entrar")
.addEventListener("click", function(){


    let usuario =
    document.getElementById("usuario").value;


    let clave =
    document.getElementById("clave").value;



    if(usuario === "admin" && clave === "1234"){


        window.location.href = "sistema/index.html";


    }else{


        document
        .getElementById("mensaje")
        .textContent =
        "Usuario o contraseña incorrectos";


    }


});
