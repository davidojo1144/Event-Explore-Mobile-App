# 🚀 Event Explorer App - Setup Guide

This guide will help you get the Event Explorer app up and running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control)

### For iOS Development (Mac only)

- **Xcode** (latest version from Mac App Store)
- **Xcode Command Line Tools**
- **iOS Simulator** (included with Xcode)

### For Android Development

- **Android Studio** - [Download here](https://developer.android.com/studio)
- **Android SDK** (installed via Android Studio)
- **Android Emulator** (configured in Android Studio)

### For Testing on Physical Devices

- **Expo Go App** - Download from:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 🛠️ Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd event-explorer-app
```

### Step 2: Install Dependencies

Choose one of the following commands:

**Using npm:**

```bash
npm install
```

**Using yarn:**

```bash
yarn install
```

This will install all required dependencies including:

- React Native and Expo
- React Navigation
- AsyncStorage
- TypeScript
- And all other dependencies listed in package.json

### Step 3: Verify Installation

After installation completes, verify that node_modules directory was created:

```bash
ls -la
```

You should see a `node_modules` folder.

## 🎯 Running the App

### Option 1: Start Development Server (Recommended)

```bash
npm start
```

or

```bash
npx expo start
```

This will:

1. Start the Metro bundler
2. Display a QR code in the terminal
3. Open Expo DevTools in your browser

### Option 2: Run on iOS Simulator (Mac only)

```bash
npm run ios
```

or

```bash
npx expo start --ios
```

This will automatically:

1. Start the development server
2. Build the app
3. Launch iOS Simulator
4. Install and run the app

### Option 3: Run on Android Emulator

```bash
npm run android
```

or

```bash
npx expo start --android
```

This will automatically:

1. Start the development server
2. Build the app
3. Launch Android Emulator (if not running)
4. Install and run the app

### Option 4: Run on Physical Device

1. **Start the development server:**

   ```bash
   npm start
   ```

2. **Install Expo Go app** on your device (if not already installed)

3. **Scan the QR code:**

   - **iOS**: Open Camera app and scan the QR code
   - **Android**: Open Expo Go app and scan the QR code

4. The app will download and run on your device

### Option 5: Run on Web Browser (Experimental)

```bash
npm run web
```

or

```bash
npx expo start --web
```

Note: Some features may not work perfectly on web.

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Command not found: expo"

**Solution:** Install Expo CLI globally:

```bash
npm install -g expo-cli
```

#### Issue 2: Metro bundler port already in use

**Solution:** Kill the process using port 8081:

```bash
# On Mac/Linux
lsof -ti:8081 | xargs kill -9

# On Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

#### Issue 3: iOS Simulator not opening

**Solution:**

1. Open Xcode
2. Go to Xcode > Preferences > Locations
3. Ensure Command Line Tools is set
4. Try running: `sudo xcode-select --switch /Applications/Xcode.app`

#### Issue 4: Android Emulator not starting

**Solution:**

1. Open Android Studio
2. Go to Tools > AVD Manager
3. Create a new Virtual Device if none exists
4. Start the emulator manually
5. Then run `npm run android`

#### Issue 5: "Unable to resolve module"

**Solution:** Clear cache and reinstall:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Clear Metro bundler cache
npx expo start --clear
```

#### Issue 6: TypeScript errors in IDE

**Solution:** The TypeScript errors you see before installing dependencies are normal. They will disappear after running `npm install`.

#### Issue 7: "Expo Go app not connecting"

**Solution:**

1. Ensure your phone and computer are on the same WiFi network
2. Disable any VPN or firewall temporarily
3. Try using tunnel mode: `npx expo start --tunnel`

## 📱 Development Tips

### Hot Reloading

- The app automatically reloads when you save changes
- Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android) for dev menu

### Debug Menu

- **iOS Simulator**: Press `Cmd+D`
- **Android Emulator**: Press `Cmd+M` (Mac) or `Ctrl+M` (Windows/Linux)
- **Physical Device**: Shake the device

### Useful Commands

```bash
# Clear cache and restart
npx expo start --clear

# Start with tunnel (for devices not on same network)
npx expo start --tunnel

# View logs
npx expo start --dev-client

# Check for updates
npx expo-cli upgrade
```

## 🎨 Customization

### Changing App Name

Edit `app.json`:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Changing Colors

Edit the color values in component StyleSheet objects:

- Primary color: `#6366f1` (Indigo)
- Background: `#f9fafb` (Light gray)
- Text: `#1f2937` (Dark gray)

### Adding App Icons

1. Create icons in the `assets` folder:

   - `icon.png` (1024x1024)
   - `splash.png` (1284x2778)
   - `adaptive-icon.png` (1024x1024 for Android)
   - `favicon.png` (48x48 for web)

2. Icons are already referenced in `app.json`

## 📦 Building for Production

### Build for iOS (requires Mac)

```bash
npx expo build:ios
```

### Build for Android

```bash
npx expo build:android
```

### Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] App launches successfully
- [ ] Event list displays all events
- [ ] Search functionality works
- [ ] Pull-to-refresh works
- [ ] Event details screen opens
- [ ] Add to favorites works
- [ ] Favorites persist after app restart
- [ ] Remove from favorites works
- [ ] Navigation between screens works
- [ ] Animations are smooth

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🆘 Getting Help

If you encounter issues not covered in this guide:

1. Check the [Expo Forums](https://forums.expo.dev/)
2. Search [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)
3. Review [React Native Issues](https://github.com/facebook/react-native/issues)
4. Check the project's README.md for more information

## ✅ Verification

After setup, verify everything works:

1. ✅ Dependencies installed without errors
2. ✅ Development server starts successfully
3. ✅ App runs on simulator/emulator/device
4. ✅ All screens are accessible
5. ✅ Features work as expected

---

**You're all set! Happy coding! 🎉**
