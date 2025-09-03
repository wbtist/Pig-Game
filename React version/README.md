# 🐖 Pig Game - React Version

A modern React implementation of the classic Pig dice game, built with Vite for fast development and optimized performance.

## About the Game

Pig is a simple dice game where players take turns rolling a die and accumulating points. The goal is to reach 100 points first, but there's a catch - if you roll a 1, you lose all points from that turn!

## Features

- 🎮 Classic Pig dice game mechanics
- ⚡ Built with React 18 and Vite
- 🎨 Modern dark theme with smooth animations
- 📱 Fully responsive design (mobile-first)
- ✨ Interactive dice with hover effects
- 🏆 Winner celebration animations
- 🔒 Input validation and error handling
- ♿ Accessibility features (high contrast, reduced motion support)

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern CSS with flexbox, animations, and responsive design
- **ESLint** - Code linting and formatting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the React version folder:
   ```bash
   cd "React version"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Game Rules

1. Players take turns rolling a die
2. Each roll adds to your current turn score
3. You can "hold" to add your turn score to your total score
4. If you roll a 1, you lose all points from that turn and your turn ends
5. First player to reach 100 points wins!

## Project Structure

```
React version/
├── public/           # Static assets
│   ├── dice-*.png   # Dice images
│   ├── pig-characters.png
│   └── pig-game-icon.ico
├── src/
│   ├── components/  # React components
│   ├── hooks/       # Custom hooks
│   ├── App.jsx      # Main app component
│   ├── main.jsx     # React entry point
│   └── index.css    # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## Components

- **App** - Main application container
- **Header** - Game title and character images
- **InfoSection** - Game rules and feedback form
- **GameControls** - Player name inputs, dice controls, and game buttons
- **ScoresSection** - Score display and current turn tracking
- **Footer** - Attribution and links

## Custom Hooks

- **useGameState** - Manages all game state and logic including:
  - Player scores and names
  - Current player and turn score
  - Dice rolling mechanics
  - Win condition checking
  - Input validation

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Original Project

This React version is based on the original vanilla JavaScript Pig Game. The game logic and styling have been carefully ported to React while maintaining all functionality and visual design.

## Author

Made with 💗 and 😰 by Istvan Toth

## License

This project is open source and available under the MIT License.