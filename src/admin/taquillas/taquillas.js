/*
==================================================
 GOLDEN KING v3
 TEST SUPABASE TAQUILLAS
==================================================
*/


import { getSupabase } from "../../services/supabase.js";


alert("INICIO TAQUILLAS");



const lista = document.getElementById("listaTaquillas");


lista.innerHTML = "PASO 1 OK";



let supabase;


try {


    supabase = getSupabase();


    console.log(
        "SUPABASE CREADO:",
        supabase
    );


    lista.innerHTML = "PASO 2 OK - SUPABASE CONECTADO";



}
catch(error){


    console.error(error);


    lista.innerHTML =
    "ERROR SUPABASE: " + error.message;


}
