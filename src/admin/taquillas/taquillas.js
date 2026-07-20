/*
==================================================
 GOLDEN KING v3
 TAQUILLAS - PRUEBA SUPABASE
==================================================
*/


import { getSupabase } from "../../services/supabase.js";


console.log("TAQUILLAS JS CARGADO");



const supabase = getSupabase();


const lista = document.getElementById("listaTaquillas");



lista.innerHTML = "Probando conexión Supabase...";




async function probar(){


    console.log("Consultando tabla taquillas...");



    const {data,error} = await supabase
    .from("taquillas")
    .select("*");




    console.log("DATA:", data);

    console.log("ERROR:", error);




    if(error){


        lista.innerHTML = 
        "ERROR: " + error.message;


        return;

    }



    if(data.length === 0){


        lista.innerHTML =
        "Conexión OK. No hay taquillas creadas";


        return;


    }



    lista.innerHTML =
    "Hay " + data.length + " taquillas";


}



probar();
