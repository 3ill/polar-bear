# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React + Vite application showcasing 3D car models using Three.js. The project is a portfolio/showcase website featuring interactive 3D car models (JAC vehicles) with color variants, built with modern web technologies including React Three Fiber, GSAP animations, and TailwindCSS.

## Development Commands

### Core Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Code Quality & Formatting
- `npx biome check` - Run Biome linter/formatter checks
- `npx biome format --write` - Auto-format code with Biome
- `npx biome lint --apply` - Auto-fix linting issues

## Architecture Overview

### Directory Structure
```
src/
├── components/        # 3D model components and reusable UI
├── sections/         # Page sections (Hero, Gallery, Navbar, Footer)
├── ui/              # Reusable UI components (Button, Card, etc.)
├── constants/       # Application constants and configuration
├── lib/             # Utility functions
└── utils/           # Custom React hooks
```

### Key Architectural Patterns

**3D Model System**: The application uses a model-based architecture where:
- 3D car models are defined in `src/constants/index.js` with configurations for scale, position, rotation, and color variants
- Each 3D model component (e.g., `RedJac`, `WhiteJac`, `BlackJac`) is auto-generated from GLB files using `gltfjsx`
- Models use GSAP for smooth entry animations and Three.js/React Three Fiber for rendering

**Component Architecture**:
- **Sections**: Large page sections that compose the main layout
- **Components**: Specific 3D models and complex interactive elements
- **UI**: Generic, reusable UI components following a design system pattern
- **Constants**: Centralized configuration for models, navigation, projects, and responsive sizing calculations

**State Management**: Uses React's built-in state management with:
- `activeModelIndex` and `activeColorIndex` to control 3D model display
- Responsive design hooks from `react-responsive` for device-specific layouts
- Custom hooks like `useIsVisible` for intersection observer functionality

**Animation System**:
- GSAP integration for smooth 3D model animations
- TailwindCSS Motion for CSS-based animations
- React Three Fiber's frame-based animation system

### Key Technologies Integration

**Three.js Stack**:
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers (OrbitControls, PerspectiveCamera, useGLTF)
- Custom 3D model components with GSAP-powered animations

**Styling & UI**:
- TailwindCSS v4 with custom color palette and typography (General Sans, Space Grotesk, Bebas Neue)
- Responsive design with mobile-first approach
- Custom UI components in `/ui` directory

**Development Tools**:
- Vite for fast development and building
- ESLint + Biome for dual linting/formatting approach
- Custom configurations for React, Three.js globals, and strict error handling

## Development Guidelines

### 3D Models
- 3D models are stored in `public/models/` as GLB files
- Use `npx gltfjsx` to generate React components from GLB files
- Models should include GSAP animations for smooth entry effects
- Always preload models using `useGLTF.preload()`

### Responsive Design
- Use the `calculateSizes()` utility from constants for consistent 3D model scaling across devices
- Leverage `react-responsive` hooks for conditional rendering
- Mobile-first approach with breakpoints: small (440px), mobile (768px), tablet (1024px)

### Component Structure
- 3D model components should accept `animationKey` prop to trigger re-animations
- Use `useMediaQuery` for responsive positioning and scaling
- Implement proper cleanup in useEffect hooks for observers and animations

### Code Quality
- This project uses both ESLint and Biome for code quality
- Biome is configured with strict rules for complexity, correctness, and suspicious patterns
- Use double quotes for JavaScript strings (Biome config)
- Tab indentation is enforced

### Performance Considerations
- 3D models are optimized and compressed (original 84MB → 4MB after transformation)
- Use `Suspense` with `CanvasLoader` for 3D content loading states
- Implement proper disposal patterns for Three.js resources

## Project-Specific Notes

### Model Configuration
Models are defined in `src/constants/index.js` with the following structure:
- `component`: React component reference
- `defaultScale`, `defaultPosition`, `defaultRotation`: 3D positioning
- `colors`: Array of color variants with corresponding components

### Custom Hooks
- `useIsVisible`: Intersection Observer hook for scroll-triggered animations
- Media query hooks are used extensively for responsive 3D scene management

### Deployment
The project includes:
- Vercel configuration (`.vercel/` directory)
- Docker support (`Dockerfile`, `nginx.conf`)
- Production-optimized Vite build process