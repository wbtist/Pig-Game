# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a client-side implementation of the classic Pig dice game built with vanilla HTML, CSS, and JavaScript. It's a simple browser-based game where two players take turns rolling a die to accumulate points, with the first to reach 100 points winning.

## Development Commands

This is a static web project with no build process. To run locally:
- Open `index.html` directly in a web browser, or
- Use a local web server like `python -m http.server` or `npx serve`

## Architecture

- **index.html**: Main HTML structure using Bootstrap for responsive layout
- **script.js**: Core game logic with event-driven architecture
- **style.css**: Custom styling with CSS variables for theming and responsive design
- **img/**: Dice images (dice--0.png through dice--6.png) and other assets

## Key Components

### Game State Management
- Global variables track current player, scores, and game state
- `scores` array holds total scores for both players
- `currentScore` tracks points accumulated in current turn
- `currentPlayer` (0 or 1) indicates active player

### Core Functions
- `setDefaults()`: Initializes/resets game state and UI visibility
- `switchPlayers()`: Changes active player and updates UI highlighting
- `toggleButtons()`: Adjusts button positioning based on active player

### Game Flow
1. Players enter names and click "Save names"
2. Game reveals dice controls and randomly selects starting player
3. Active player rolls dice or holds to bank points
4. Rolling 1 ends turn with no points; otherwise points accumulate
5. First player to 100+ points wins

## UI Patterns

- Uses Bootstrap classes extensively for responsive grid layout
- Custom CSS classes like `.disapper` and `.hidden` control element visibility
- Player highlighting uses `.player-highlighted` class with color changes
- Responsive design with separate mobile/desktop media queries

## File References

Game logic is centralized in `script.js:34-131`, with dice rolling at `script.js:72-92` and win condition checking at `script.js:101-111`.