# Flappy Bird Clone

A modern web-based clone of Flappy Bird built with React and Canvas, with mobile support via Capacitor.

## Features

- Classic Flappy Bird gameplay
- Responsive canvas rendering
- Multiple control options (spacebar, mouse click, touch)
- Random bird colors and day/night backgrounds
- Mobile-friendly design

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Mobile Development (Android)

### Prerequisites

- Node.js v20 or higher
- Android Studio installed
- Android SDK configured
- JDK (Java Development Kit)

### Building for Android

1. Install Capacitor:

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

2. Build the web app:

```bash
npm run build
```

3. Add Android platform:

```bash
npx cap add android
```

4. Sync web content with Android:

```bash
npx cap sync
```

5. Open in Android Studio:

```bash
npx cap open android
```

### Testing on Android

1. In Android Studio:
   - Wait for project sync to complete
   - Set up an Android Virtual Device (emulator) or connect a physical device
   - Click the "Run" button (green play icon) or press Shift+F10

2. For subsequent updates:
   - Rebuild the web app: `npm run build`
   - Sync with Android: `npx cap sync`
   - Run again in Android Studio

## Controls

- Press spacebar to flap
- Click/tap the screen to flap
- Press spacebar/click/tap to restart after game over

## License

MIT License
