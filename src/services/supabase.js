/*
==================================================
 GOLDEN KING v3
 SUPABASE CONNECTION
==================================================
*/


// Configuración Supabase

const SUPABASE_URL = 
"https://atdxeuxrjepiumpxcqxt.supabase.co";


const SUPABASE_KEY = 
"sb_publishable_wKsM2OWm4USke2jZ1fl0qw_M2TIR3S6";




// Crear cliente

let supabaseClient = null;



export function getSupabase(){


    if(!supabaseClient){


        supabaseClient = window.supabase.createClient(

            SUPABASE_URL,

            SUPABASE_KEY

        );


    }


    return supabaseClient;


}




// Exportar configuración

export {

    SUPABASE_URL,

    SUPABASE_KEY

};
