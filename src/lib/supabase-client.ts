import { createBrowserClient } from "@supabase/ssr";

// Hardcoded fallbacks - always work
const SUPABASE_URL = "https://dtejfdquiqogwapjtfar.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZWpmZHF1aXFvZ3dhcGp0ZmFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjY5ODAsImV4cCI6MjA5MjA0Mjk4MH0.ptiq8drt1WuBrKv3OMgf6lo8IiJUFqferwnGGWSJksM";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;
  return createBrowserClient(url, key);
}