/*
==================================================
 GOLDEN KING v3
 TAQUILLAS
 PRUEBA CON SUPABASE
==================================================
*/


import { getSupabase } from "../../services/supabase.js";


console.log("TAQUILLAS JS CARGADO");


const supabase = getSupabase();


const lista = document.getElementById("listaTaquillas");



async function cargarTaquillas(){


    lista.innerHTML = "Conectando con Supabase...";



    console.log("Ejecutando consulta...");



    const { data, error } = await supabase
    .from("taquillas")
    .select("*");



    console.log("DATA:", data);

    console.log("ERROR:", error);




    if(error){


        lista.innerHTML =
        "ERROR: " + error.message;


        return;

    }



    if(!data || data.length === 0){


        lista.innerHTML =
        "Conexión correcta. No hay taquillas creadas";


        return;

    }




    lista.innerHTML =
    "Taquillas encontradas: " + data.length;



}



cargarTaquillas();
