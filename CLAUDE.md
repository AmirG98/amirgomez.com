# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Development Server
The development server runs on `http://localhost:3000` with Turbopack enabled for faster builds and hot reloading.

## Architecture

### Next.js App Router
This project uses Next.js 15.4.6 with the App Router architecture:
- `app/` directory contains all routes and layouts
- `app/layout.tsx` is the root layout with Geist font configuration
- `app/page.tsx` is the home page component
- `app/globals.css` contains global styles and CSS custom properties

### TypeScript Configuration
- Strict TypeScript enabled with ES2017 target
- Path alias `@/*` maps to project root for clean imports
- Next.js plugin enabled for enhanced TypeScript support

### Styling
- Tailwind CSS v4 with PostCSS integration
- Uses CSS custom properties for theming (supports light/dark mode)
- Global CSS variables: `--background`, `--foreground`
- Geist Sans and Geist Mono fonts loaded via `next/font/google`

### Key Technical Details
- React 19.1.0 with concurrent features
- Image optimization using `next/image` component
- Automatic font optimization with variable fonts
- CSS-in-JS theming through Tailwind's `@theme` directive
- Responsive design patterns with Tailwind utilities

### Project Structure
```
app/
├── layout.tsx          # Root layout with fonts and metadata
├── page.tsx           # Home page component
├── globals.css        # Global styles and CSS variables
└── favicon.ico        # Site favicon

public/                # Static assets (SVG icons)
```

### Development Notes
- Hot reloading enabled via Turbopack
- Dark mode support through CSS `prefers-color-scheme`
- Font variables injected via className in root layout
- All components use TypeScript with proper type definitions