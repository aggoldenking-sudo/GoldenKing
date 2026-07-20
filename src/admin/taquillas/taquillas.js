/*
==================================================
 GOLDEN KING v3
 TAQUILLAS TEST
==================================================
*/

import { getSupabase } from "../../services/supabase.js";


console.log("TAQUILLAS JS CARGADO");


const supabase = getSupabase();


const lista = document.getElementById("listaTaquillas");


lista.innerHTML = "JAVASCRIPT FUNCIONANDO";


console.log("SUPABASE CLIENTE:", supabase);
