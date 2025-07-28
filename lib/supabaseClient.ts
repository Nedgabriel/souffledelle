// lib/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fjrhwflqjaecexhneblt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcmh3ZmxxamFlY2V4aG5lYmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MDAzNTgsImV4cCI6MjA2OTI3NjM1OH0.b8IORjUz5PMsVkGP_LaRkC4PKrdthKN0immz203QKA0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
