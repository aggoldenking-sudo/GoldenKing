/*
==================================================
 GOLDEN KING v3
 GESTIÓN DE TAQUILLAS
 taquillas.js
==================================================
*/


import { supabase } from "../../services/supabase.js";



console.log("TAQUILLAS SISTEMA INICIADO");




// ELEMENTOS

const formulario =
document.getElementById("taquillaForm");


const lista =
document.getElementById("listaTaquillas");


const mensaje =
document.getElementById("mensaje");




// CARGAR AL INICIAR

cargarTaquillas();





// CREAR TAQUILLA

formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const nombre =
document.getElementById("nombre")
.value
.trim();



const codigo =
document.getElementById("codigo")
.value
.trim();



const responsable =
document.getElementById("responsable")
.value
.trim();



const estado =
document.getElementById("estado")
.value;





// USUARIO ACTUAL

const {

data:{
session

}

} = await supabase.auth.getSession();




if(!session){

mostrarMensaje(
"Sesión no encontrada",
"red"
);

return;

}



const usuario_id =
session.user.id;






// INSERTAR TAQUILLA


const {
data,
error

}= await supabase

.from("taquillas")

.insert([{

nombre,

codigo,

responsable,

estado,

usuario_id

}])

.select();





if(error){

console.error(
"ERROR:",
error
);


mostrarMensaje(
error.message,
"red"
);


return;

}





mostrarMensaje(
"Taquilla creada correctamente",
"green"
);



formulario.reset();


cargarTaquillas();



});









// MOSTRAR TAQUILLAS


async function cargarTaquillas(){



lista.innerHTML =
"Cargando...";




const {

data:{
session

}

} = await supabase.auth.getSession();




if(!session){

lista.innerHTML =
"Sesión no encontrada";

return;

}





const usuario_id =
session.user.id;






const {
data,
error

}= await supabase

.from("taquillas")

.select("*")

.eq(
"usuario_id",
usuario_id
)

.order(
"created_at",
{
ascending:false
}
);






if(error){

console.error(error);

lista.innerHTML =
error.message;

return;

}





if(!data || data.length===0){


lista.innerHTML =
"No existen taquillas";


return;


}







lista.innerHTML="";






data.forEach(
(taquilla)=>{


lista.innerHTML += `


<div class="item-taquilla">


<h3>
🏪 ${taquilla.nombre}
</h3>



<p>
<strong>Código:</strong>
${taquilla.codigo}
</p>



<p>
<strong>Responsable:</strong>
${taquilla.responsable}
</p>



<p>
<strong>Estado:</strong>
${taquilla.estado}
</p>



<button 
class="btn-entrar"
onclick='entrarTaquilla(${JSON.stringify(taquilla)})'>

🚀 Entrar

</button>



</div>


`;



});



}









// ENTRAR A TAQUILLA


window.entrarTaquilla = function(taquilla){



localStorage.setItem(

"taquilla_activa",

JSON.stringify(taquilla)

);




window.location.href =

"../../taquilla/index.html";



};









// MENSAJE


function mostrarMensaje(
texto,
color
){


mensaje.textContent =
texto;


mensaje.style.color =
color;



}
