alert("ESTOY EJECUTANDO EL NUEVO CODIGO");

/*
==================================================
 GOLDEN KING v3
 TAQUILLAS
 CONEXIÓN SUPABASE
==================================================
*/


import { getSupabase } from "../../services/supabase.js";


console.log("TAQUILLAS SISTEMA INICIADO");



const supabase = getSupabase();


console.log(
"SUPABASE:",
supabase
);



const lista =
document.getElementById("listaTaquillas");




async function cargarTaquillas(){


    try {


        lista.innerHTML =
        "Conectando con Supabase...";



        const respuesta =
        await supabase
        .from("taquillas")
        .select("*");



        console.log(
        "RESPUESTA COMPLETA:",
        respuesta
        );



        const {data,error}=respuesta;



        if(error){


            lista.innerHTML =
            "ERROR: " + error.message;


            console.error(error);


            return;

        }




        if(!data || data.length === 0){


            lista.innerHTML =
            "Conexión correcta. No existen taquillas";


            return;

        }




        lista.innerHTML =
        "Taquillas encontradas: " + data.length;



    }
    catch(e){


        console.error(
        "ERROR GENERAL:",
        e
        );


        lista.innerHTML =
        e.message;


    }



}



cargarTaquillas();
