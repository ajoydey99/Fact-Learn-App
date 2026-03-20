import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://izcfznrotfxhvrxbfqeq.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6Y2Z6bnJvdGZ4aHZyeGJmcWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNTIwOTMsImV4cCI6MjA4NzcyODA5M30.Z33y8I92eS7eHEbnA-n9chl_n9Dm8O9CfjDfZxK_l2Y";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
