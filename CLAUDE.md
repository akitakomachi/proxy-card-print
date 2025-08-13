# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React web application called "プロキシカード印刷" (Proxy Card Print) - a tool for easily printing proxy cards for card games. It's built with Vike (SSR framework), React, TypeScript, and Material-UI with Emotion for styling.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript check first via `prebuild`)
- `npm run i18next` - Update translation files
- `tsc` - TypeScript compilation and type checking

## Architecture

### Core Framework Stack
- **Vike**: SSR/SSG framework with file-based routing (`src/pages/`)
- **React 18**: Main UI framework with hooks-based state management
- **TypeScript**: Strict type checking enabled
- **Emotion**: CSS-in-JS styling with `@emotion/react`
- **Material-UI v5**: Component library
- **i18next**: Internationalization (supports ja, en, zh-hans)

### State Management Pattern
Uses `action-reducer` library for predictable state updates:
- `cardsReducer`: Manages card data and operations
- `settingsReducer`: Manages print settings (page size, card dimensions, margins)
- State is managed at the App level and passed down to components

### Key Application Features
- **Cards Management**: Upload, crop, and manage card images
- **Print Settings**: Configure page size, card dimensions, margins, and spacing
- **Preview System**: Real-time preview of print layout
- **PDF Export**: Generate PDFs using jsPDF with Web Workers for performance
- **Maybe Integration**: Japanese-specific feature for card recommendations

### File Structure Patterns
- `src/app/features/`: Feature-based organization (cards, preview, settings, usage, maybe)
- `src/app/features/*/parts/`: Component sub-modules within features
- `src/domains/`: Type definitions and domain models
- `src/locales/`: Translation files by language
- `src/pages/`: Vike file-based routing
- `src/renderer/`: Vike SSR configuration

### Worker Integration
- PDF generation uses Web Workers (`pdf.worker.ts`) for non-blocking processing
- Item processing also uses workers (`items.worker.ts`)
- Workers are configured with ES module format in Vite config

### Styling Approach
- Emotion CSS-in-JS with theme-based responsive design
- Custom breakpoints and Material-UI theme integration
- Responsive layout using CSS Grid and Flexbox
- Component-level styling with emotion's `css` prop

### Build Configuration
- Vite with React plugin and Emotion babel plugin
- PWA capabilities via `vite-plugin-pwa`
- Custom alias `~/` pointing to `src/`
- SSR with prerendering enabled
- Specific module aliasing to noop certain packages (canvg, dompurify, html2canvas)

### Key Components
- `App.tsx`: Main application container with state management
- `Cards.tsx`: Card upload and management interface
- `Preview.tsx`: Print layout preview with export functionality
- `Settings.tsx`: Print configuration controls
- `Maybe.tsx`: Japanese-specific card recommendation feature

### TypeScript Configuration
- Strict mode enabled with `@emotion/react` JSX import source
- Path mapping with `~/*` alias for `src/*`
- No emit mode (build handled by Vite)