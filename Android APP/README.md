# Pig Game Android App

A modern Android implementation of the classic Pig dice game, built with Jetpack Compose and Material Design 3.

## Features

- 🎮 Classic Pig game mechanics
- 🎨 Modern Material Design 3 UI with dark theme
- 📱 Fully responsive design for all screen sizes
- ✨ Smooth animations and transitions
- 🎲 Interactive dice rolling with visual feedback
- 🏆 Winner celebration screen
- 💾 Clean architecture with MVVM pattern

## Game Rules

Players take turns rolling a die and accumulating points. On each turn, you can:
- **Roll the dice**: Add the rolled number to your current turn score
- **Hold**: Bank your current turn score and end your turn

**But beware**: If you roll a 1, you lose all points from that turn!

The first player to reach 100 points wins the game.

## Technical Details

### Built With
- **Kotlin** - Programming language
- **Jetpack Compose** - Modern Android UI toolkit
- **Material Design 3** - Design system
- **ViewModel** - Architecture component for state management
- **Android Gradle Plugin 8.1.2** - Build system

### Requirements
- **Minimum SDK**: API 24 (Android 7.0)
- **Target SDK**: API 34 (Android 14)
- **Kotlin Version**: 1.9.10
- **Gradle Version**: 8.0

### Architecture
The app follows the MVVM (Model-View-ViewModel) pattern:
- **GameViewModel**: Manages game state and business logic
- **PigGameScreen**: Main UI composable with game screens
- **Player & GamePhase**: Data classes for game state
- **Material3 Theme**: Custom theming with dark color scheme

## Building the App

### Prerequisites
1. Android Studio Flamingo or later
2. Android SDK with API level 34
3. Kotlin 1.9.10 or later

### Setup
1. Clone the repository
2. Open the project in Android Studio
3. Update `local.properties` with your SDK path:
   ```
   sdk.dir=/path/to/your/android/sdk
   ```
4. Sync the project with Gradle files
5. Build and run on device or emulator

### Build Variants
- **Debug**: Development build with debugging enabled
- **Release**: Production build with ProGuard optimization

## Google Play Store Preparation

### Before Publishing
1. **Update Version**: Increment `versionCode` and `versionName` in `app/build.gradle`
2. **Generate Signed APK**: Create a keystore and sign the release APK
3. **Test Thoroughly**: Test on multiple devices and Android versions
4. **Prepare Store Assets**: 
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 PNG)
   - Screenshots for different screen sizes
   - App description and metadata

### Store Listing Requirements
- **App Category**: Games > Casual
- **Content Rating**: Everyone
- **Target Audience**: All ages
- **Permissions**: None required (offline game)

### Privacy Policy
This app does not collect, store, or transmit any personal data. All game data is stored locally on the device and is not shared with any third parties.

## Development

### Project Structure
```
app/src/main/
├── java/com/piggame/
│   ├── MainActivity.kt          # Main activity
│   ├── GameState.kt            # Game logic and state management
│   ├── PigGameScreen.kt        # UI composables
│   └── ui/theme/               # Theme and styling
├── res/
│   ├── values/                 # Strings, colors, themes
│   ├── drawable/              # Vector drawables and icons
│   └── mipmap*/               # App launcher icons
└── AndroidManifest.xml        # App configuration
```

### Adding Features
To extend the game:
1. Update `GameViewModel` for new game logic
2. Add new UI screens in `PigGameScreen.kt`
3. Update strings and resources as needed
4. Add animations using Compose Animation APIs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Pig Game collection by Istvan Toth.

## Acknowledgments

- Original web version: [Pig Game Web](https://wbtist.github.io/Pig-Game/)
- Built with modern Android development best practices
- Material Design 3 components and theming
- Jetpack Compose for declarative UI

---

**Made with 💗 and ☕ by Istvan Toth**