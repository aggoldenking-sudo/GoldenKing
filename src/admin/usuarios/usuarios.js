/*
==================================================
 GOLDEN KING v3
 ADMIN - CREAR USUARIOS
 usuarios.js
==================================================
*/


import { supabase } from "../../services/supabase.js";



console.log("USUARIOS ADMIN INICIADO");





const formulario =
document.getElementById("usuarioForm");


const lista =
document.getElementById("listaUsuarios");


const mensaje =
document.getElementById("mensaje");


const selectTaquilla =
document.getElementById("taquilla");







// INICIO


cargarTaquillas();

cargarUsuarios();








// CARGAR TAQUILLAS


async function cargarTaquillas(){



const {

data,

error

}= await supabase


.from("taquillas")


.select("*")


.eq(
"estado",
"activo"
)

.order(
"nombre"
);





if(error){

console.error(error);

return;

}






selectTaquilla.innerHTML = `

<option value="">
Seleccione taquilla
</option>

`;






data.forEach((taquilla)=>{


selectTaquilla.innerHTML += `


<option value="${taquilla.id}">

${taquilla.nombre}

</option>


`;


});



}









// CREAR USUARIO


formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();




const nombre =
document
.getElementById("nombre")
.value
.trim();



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



const rol =
document
.getElementById("rol")
.value;



const taquilla_id =
selectTaquilla.value || null;







mostrarMensaje(
"Creando usuario...",
"#2563eb"
);








const {data,error}=

await supabase.functions.invoke(

"create-user",

{

body:{

nombre,

email,

password,

rol,

taquilla_id

}

}

);






if(error){


console.error(error);


mostrarMensaje(
error.message,
"#ef4444"
);


return;


}







mostrarMensaje(

"Usuario creado correctamente",

"#16a34a"

);



formulario.reset();


cargarUsuarios();



});











// LISTAR USUARIOS


async function cargarUsuarios(){



lista.innerHTML =
"Cargando...";






const {

data,

error

}= await supabase


.from("profiles")


.select(`

*,

taquillas(nombre)

`)


.order(
"created_at",
{
ascending:false
}
);






if(error){

lista.innerHTML =
error.message;

return;

}






lista.innerHTML="";







data.forEach((usuario)=>{


lista.innerHTML += `


<div class="item-usuario">


<h3>
👤 ${usuario.nombre}
</h3>


<p>
${usuario.email}
</p>



<p>

Rol:

<span class="rol">

${usuario.rol}

</span>

</p>



<p>

Taquilla:

${usuario.taquillas?.nombre ?? "Sin asignar"}

</p>



</div>


`;



});



}









function mostrarMensaje(
texto,
color
){


mensaje.textContent =
texto;


mensaje.style.color =
color;



}
