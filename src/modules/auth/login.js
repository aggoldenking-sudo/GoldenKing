/*
==================================================
 GOLDEN KING v3
 LOGIN SYSTEM
 Supabase Auth + Roles
==================================================
*/


import { supabase } from "../../services/supabase.js";




// Elementos

const loginForm =
document.getElementById("loginForm");


const message =
document.getElementById("message");


const button =
loginForm.querySelector("button");






// LOGIN


loginForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();




const email =
document
.getElementById("email")
.value
.trim();




const password =
document
.getElementById("password")
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

button.textContent =
"Ingresando...";







try{



// AUTENTICAR


const {

data,

error

}= await supabase.auth.signInWithPassword({

email,

password

});






if(error){

throw error;

}







const usuario =
data.user;







// BUSCAR PERFIL


const {

data:perfil,

error:perfilError

}= await supabase


.from("profiles")


.select("*")


.eq(
"id",
usuario.id
)


.single();







if(perfilError){


throw perfilError;


}








mostrarMensaje(
"Acceso correcto",
"#16a34a"
);








setTimeout(()=>{



if(perfil.rol === "administrador"){



window.location.href =

"../../admin/dashboard.html";



}

else if(perfil.rol === "taquilla"){



window.location.href =

"../../taquilla/index.html";



}

else{



mostrarMensaje(

"Rol no configurado",

"#ef4444"

);



}




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


button.textContent =
"Iniciar Sesión";


}



});







function mostrarMensaje(texto,color){


message.textContent =
texto;


message.style.color =
color;



}
