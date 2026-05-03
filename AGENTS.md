# Project Memory: Kagujje Portfolio

## Overview
This project is a top-tier professional and cinematic portfolio for Kasiba Shardick (Kagujje). It is built as a Zo Site using React (Vite + Bun).

## Key Features & Architectural Decisions
- **Cinematic Hero**: Multi-slide hero section with high-quality visuals and professional gradients.
- **Hidden 'Auric' Mode**: A golden stylistic theme triggered by clicking the brand name (KAGUJJE) in the nav or pressing the 'G' key. This mode toggles a global `isAuric` state that applies golden accents, prestigious glows, and adjusted image filters.
- **Interactive Topics**: Hero section topics (Innovation, Media, etc.) are mapped to site sections and use smooth scrolling (`Lenis` + custom handler) to navigate.
- **Preloader**: Custom branded preloader for a premium entrance experience.
- **Smooth Scrolling**: Integrated `Lenis` for a modern, fluid scroll feel.

## Current Technical State
- **Project Root**: `/home/workspace/kagujje-portfolio/`
- **Main Route**: `src/pages/portfolio.tsx`
- **Styling**: Tailwind CSS 4.
- **Animations**: Framer Motion and GSAP.

## Recent Changes (May 2026)
- Replaced primary hero image with user-provided cinematic asset.
- Implemented the 'Auric' mode logic and styling across all major sections (Nav, Hero, Services, Work, About, Contact, Footer).
- Fixed hero topic interaction to map correctly to the 'Services' section with tracking animations.
- Refined profile image styling in Auric mode for higher contrast and golden glow.
