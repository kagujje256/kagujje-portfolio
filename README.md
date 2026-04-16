# KAGUJJE Portfolio — *just a brand*

A professional, dark-themed portfolio website for the **KAGUJJE Brand** with a full-featured admin dashboard. Built with **Next.js 15**, **Tailwind CSS**, and **Supabase** (Auth, Database, Storage).

🌐 **Live domain**: [www.kagujje.com](https://www.kagujje.com)

---

## ✨ Features

### Landing Page
- Elegant dark theme with gold accent color
- Hero section with profile picture, brand motto ("just a brand"), and social links
- **Business Units** section — showcase sub-brands and ventures with subdomain links
- Projects gallery with tags, images, and live/repo links
- Writings/blog section with full article pages
- Contact section with email and location
- Fully customizable — all headings, subheadings, and body text are editable from admin

### Admin Dashboard (`/admin`)
- **Secure login** via Supabase Auth (email/password)
- **Profile Management** — avatar upload, name, tagline, bio, resume, location
- **Projects** — CRUD with image upload, tags, featured flag, visibility toggle
- **Writings** — CRUD with cover image, publish/draft, tags
- **Business Units** — manage sub-brands/ventures (name, description, URL/subdomain, icon)
- **Links** — manage social/external links with icon picker and visibility
- **Page Sections** — edit every text section on the landing page (hero, projects, writings, contact, footer)
- **Files** — upload/manage files via Supabase Storage
- **Settings** — site title, motto, accent color, SEO, footer text

---

## 🚀 Setup Guide

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Note your **Project URL** and **Anon Key** (found in Settings → API).

### 2. Set Up the Database

1. Go to the **SQL Editor** in your Supabase dashboard.
2. Copy and paste the contents of `supabase/schema.sql` and run it.
3. Copy and paste the contents of `supabase/storage.sql` and run it.

This creates all tables, Row Level Security policies, and seed data.

### 3. Create Storage Buckets

The `storage.sql` script creates these automatically, but verify in Supabase Dashboard → Storage:
- `avatars` (public)
- `projects` (public)
- `writings` (public)
- `files` (public)

### 4. Create an Admin User

1. Go to Supabase Dashboard → Authentication → Users
2. Click **Add User** → Create a user with email/password
3. Use these credentials to log into `/admin`

### 5. Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=https://www.kagujje.com
```

### 6. Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site, and `/admin` for the dashboard.

### 7. Deploy

#### Vercel (recommended)
```bash
npm i -g vercel
vercel
```
Set the environment variables in the Vercel dashboard.

#### Self-hosted
```bash
npm run build
npm start
```
