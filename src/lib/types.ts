export interface Profile {
  id: string;
  full_name: string;
  tagline: string;
  bio: string;
  avatar_url: string | null;
  resume_url: string | null;
  email: string;
  location: string;
  available_for_hire: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  tags: string[];
  is_featured: boolean;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Writing {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface FileUpload {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  file_type: string;
  category: string;
  created_at: string;
}

export interface BusinessUnit {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  image_url: string | null;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PageSection {
  id: string;
  section_key: string;
  heading: string;
  subheading: string;
  body: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  motto: string;
  theme_accent_color: string;
  og_image_url: string | null;
  favicon_url: string | null;
  footer_text: string;
  updated_at: string;
}
