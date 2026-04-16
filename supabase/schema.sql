-- ============================================
-- KAGUJJE Portfolio — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================

-- Profile (single row)
CREATE TABLE IF NOT EXISTS profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT 'KAGUJJE',
  tagline TEXT NOT NULL DEFAULT 'Creative Professional',
  bio TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  resume_url TEXT,
  email TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  available_for_hire BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Social / External Links
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'link',
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  long_description TEXT,
  image_url TEXT,
  live_url TEXT,
  repo_url TEXT,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Writings / Blog Posts
CREATE TABLE IF NOT EXISTS writings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- File uploads registry
CREATE TABLE IF NOT EXISTS file_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT DEFAULT 0,
  file_type TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Business Units / Subdomains
CREATE TABLE IF NOT EXISTS business_units (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'briefcase',
  image_url TEXT,
  is_visible BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Editable page sections (hero, projects, writings, contact, etc.)
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  heading TEXT NOT NULL DEFAULT '',
  subheading TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Site settings (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title TEXT NOT NULL DEFAULT 'KAGUJJE',
  site_description TEXT NOT NULL DEFAULT 'Portfolio & Creative Works',
  motto TEXT NOT NULL DEFAULT 'just a brand',
  theme_accent_color TEXT NOT NULL DEFAULT '#c9a84c',
  og_image_url TEXT,
  favicon_url TEXT,
  footer_text TEXT NOT NULL DEFAULT '© KAGUJJE Brand. All rights reserved.',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed data
INSERT INTO profile (full_name, tagline, bio, email, location)
VALUES (
  'KAGUJJE',
  'Creative Professional & Brand Owner',
  'Welcome to the KAGUJJE Brand portfolio. We create, we build, we inspire.',
  'hello@kagujje.com',
  'Kampala, Uganda'
) ON CONFLICT DO NOTHING;

INSERT INTO site_settings (site_title, site_description, motto, footer_text)
VALUES (
  'KAGUJJE',
  'Portfolio & Creative Works by KAGUJJE',
  'just a brand',
  '© KAGUJJE Brand. All rights reserved.'
) ON CONFLICT DO NOTHING;

-- Seed editable page sections
INSERT INTO page_sections (section_key, heading, subheading, body) VALUES
  ('hero', 'KAGUJJE', 'just a brand', 'Welcome to the KAGUJJE Brand. We create, we build, we inspire.'),
  ('projects', 'Featured Projects', 'A showcase of work and creative endeavors', ''),
  ('writings', 'Latest Writings', 'Thoughts, ideas, and stories', ''),
  ('business_units', 'Our Ventures', 'The brands and businesses under KAGUJJE', ''),
  ('contact', 'Get In Touch', 'Have a project in mind or just want to say hello? Feel free to reach out.', ''),
  ('footer', 'KAGUJJE', '© KAGUJJE Brand. All rights reserved.', '')
ON CONFLICT (section_key) DO NOTHING;
