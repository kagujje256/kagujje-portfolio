import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dtejfdquiqogwapjtfar.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for your database
export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  video_url?: string;
  views: number;
  created_at: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

// Helper functions
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
}

export async function submitContact(formData: { name: string; email: string; message: string }) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([formData])
    .select();
  
  if (error) throw error;
  return data[0] as Contact;
}
