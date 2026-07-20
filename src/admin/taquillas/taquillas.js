/*
==================================================
 GOLDEN KING v3
 GESTIÓN DE TAQUILLAS
 taquillas.js
==================================================
*/


import { getSupabase } from "../../services/supabase.js";


const supabase = getSupabase();



console.log("TAQUILLAS SISTEMA CARGADO");



// Elementos

const formulario = document.getElementById("taquillaForm");

const lista = document.getElementById("listaTaquillas");

const mensaje = document.getElementById("mensaje");




// Iniciar

document.addEventListener(
"DOMContentLoaded",
()=>{

    cargarTaquillas();

}
);





// Crear taquilla

formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const nombre =
document.getElementById("nombre").value.trim();



const codigo =
document.getElementById("codigo").value.trim();



const responsable =
document.getElementById("responsable").value.trim();



const estado =
document.getElementById("estado").value;





console.log({

nombre,
codigo,
responsable,
estado

});





const {data,error}=

await supabase

.from("taquillas")

.insert([{

    nombre,

    codigo,

    responsable,

    estado

}])

.select();






if(error){


console.error(
"ERROR CREANDO:",
error
);



mostrarMensaje(

error.message,

"#ef4444"

);


return;


}






console.log(
"TAQUILLA CREADA:",
data
);




mostrarMensaje(

"Taquilla creada correctamente",

"#2563eb"

);



formulario.reset();



cargarTaquillas();



});









// Leer taquillas

async function cargarTaquillas(){



lista.innerHTML =
"Cargando...";





const {data,error}=

await supabase

.from("taquillas")

.select("*")

.order(
"created_at",
{
ascending:false
}
);






if(error){


console.error(
"ERROR CARGANDO:",
error
);



lista.innerHTML =

error.message;



return;


}






if(!data || data.length===0){


lista.innerHTML =

"No existen taquillas creadas";


return;


}







lista.innerHTML="";





data.forEach((taquilla)=>{



lista.innerHTML += `


<div class="item-taquilla">


<strong>

${taquilla.nombre}

</strong>


<br>


Código:
${taquilla.codigo}


<br>


Responsable:
${taquilla.responsable}


<br>


Estado:
${taquilla.estado}



</div>


`;



});




}







// Mensajes

function mostrarMensaje(texto,color){


mensaje.textContent = texto;


mensaje.style.color=color;



setTimeout(()=>{


mensaje.textContent="";


},4000);



}
