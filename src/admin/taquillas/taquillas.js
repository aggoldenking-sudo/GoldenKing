/*
==================================================
 GOLDEN KING v3
 SUPABASE CONNECTION
==================================================
*/


import { createClient } from 
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";



const SUPABASE_URL =
"https://atdxeuxrjepiumpxcqxt.supabase.co";



const SUPABASE_KEY =
"sb_publishable_wKsM2OWm4USke2jZ1fl0qw_M2TIR3S6";




export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
