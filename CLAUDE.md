# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains two implementations of the classic Pig dice game:

1. **Vanilla JavaScript Version** (root directory): Original implementation using HTML, CSS, and vanilla JavaScript
2. **React Version** (`React version/` directory): Modern React implementation with Vite build system

Both implementations feature the same game mechanics where two players take turns rolling a die to accumulate points, with the first to reach 100 points winning.

## Development Commands

### Vanilla JavaScript Version (Root)
This is a static web project with no build process. To run locally:
- Open `index.html` directly in a web browser, or
- Use a local web server like `python -m http.server` or `npx serve`

### React Version
Development commands for the React implementation:
```bash
cd "React version"
npm install          # Install dependencies
npm run dev         # Start development server (Vite)
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## Architecture

### Vanilla JavaScript Version (Root)
- **index.html**: Main HTML structure using Bootstrap for responsive layout
- **script.js**: Core game logic with event-driven architecture using global state
- **style.css**: Custom styling with CSS variables for theming and responsive design
- **img/**: Dice images (dice--0.png through dice--6.png) and other assets

### React Version
- **src/App.jsx**: Main application container orchestrating all components
- **src/hooks/useGameState.js**: Custom hook managing all game state and logic
- **src/components/**: Modular React components (Header, GameControls, ScoresSection, etc.)
- **public/**: Static assets including dice images and character graphics
- **vite.config.js**: Vite build configuration

## Key Components

### Vanilla JavaScript Architecture
- **Global State**: Variables like `scores[]`, `currentScore`, `currentPlayer` track game state
- **DOM Manipulation**: Direct element selection and class toggling for UI updates
- **Event Listeners**: Attached to buttons for user interactions
- **Core Functions**: `setDefaults()`, `switchPlayers()`, `toggleButtons()` manage game flow

### React Architecture  
- **useGameState Hook**: Centralized state management using React hooks
  - Manages player scores, names, current player, dice value, and game status
  - Provides sanitization and validation for player inputs
  - Handles all game logic including rolling, holding, and win conditions
- **Component Structure**: Modular design with clear separation of concerns
  - `Header`: Game branding and character images
  - `GameControls`: Player inputs, dice controls, game buttons
  - `ScoresSection`: Score displays and turn tracking
  - `InfoSection`: Game rules and feedback form

## Game Flow (Both Versions)
1. Players enter names and start the game
2. Game randomly selects starting player
3. Active player rolls dice or holds to bank points
4. Rolling 1 ends turn with no points; otherwise points accumulate
5. First player to reach 100+ points wins

## File References

**Vanilla Version**: Game logic centralized in `script.js:34-131`, dice rolling at `script.js:72-92`, win checking at `script.js:101-111`

**React Version**: State management in `React version/src/hooks/useGameState.js:24-80`, main app structure in `React version/src/App.jsx:9-23`