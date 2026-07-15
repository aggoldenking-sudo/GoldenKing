document.addEventListener("DOMContentLoaded", function() {
    const btnEntrar = document.getElementById("entrar");

    btnEntrar.addEventListener("click", function() {
        let usuario = document.getElementById("usuario").value.trim();
        let clave = document.getElementById("clave").value.trim();
        let mensaje = document.getElementById("mensaje");

        if (usuario === "admin" && clave === "1234") {
            mensaje.style.color = "green";
            mensaje.textContent = "Ingresando...";
            setTimeout(() => {
                window.location.href = "dashboard/index.html";
            }, 500);
        } else {
            mensaje.style.color = "#d63031";
            mensaje.textContent = "Usuario o contraseña incorrectos";
        }
    });
});
