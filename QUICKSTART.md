# ⚡ Event Explorer App - Quick Start Guide

Get the app running in 3 simple steps!

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm start
```

### Step 3: Run the App

Choose one option:

- Press `i` for iOS Simulator (Mac only)
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your phone

## 📱 That's it! The app should now be running.

---

## 🎯 What You'll See

### Event List Screen (Home)

- 12 sample events with images
- Search bar at the top
- Pull down to refresh
- Tap any event to view details

### Event Details Screen

- Full event information
- Large event image
- Date, time, and location
- Complete description
- Heart button to add/remove from favorites

### Favorites Screen

- All your saved events
- Same card design as home
- Tap to view details
- Remove from favorites

---

## ✨ Key Features to Try

1. **Search Events**: Type in the search bar to filter events
2. **View Details**: Tap any event card
3. **Add to Favorites**: Tap the heart button on details screen
4. **View Favorites**: Switch to Favorites tab
5. **Pull to Refresh**: Pull down on event list
6. **Persistent Storage**: Close and reopen app - favorites are saved!

---

## 🔧 Troubleshooting

### App won't start?

```bash
# Clear cache and try again
npx expo start --clear
```

### Dependencies not installing?

```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Need more help?

- Check **SETUP_GUIDE.md** for detailed instructions
- Check **README.md** for full documentation

---

## 📚 Project Files

- **App.tsx** - Main app entry point
- **src/screens/** - All screen components
- **src/components/** - Reusable UI components
- **src/navigation/** - Navigation setup
- **src/hooks/** - Custom hooks (favorites management)
- **src/data/** - Mock event data
- **src/types/** - TypeScript definitions

---

## 🎨 Customization

### Change App Name

Edit `app.json`:

```json
"name": "Your App Name"
```

### Change Colors

Edit StyleSheet in components:

- Primary: `#6366f1`
- Background: `#f9fafb`
- Text: `#1f2937`

### Add More Events

Edit `src/data/mockEvents.ts`

---

## 📖 Full Documentation

For complete documentation, see:

- **README.md** - Full project documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **PROJECT_STRUCTURE.md** - Project architecture

---

**Happy Exploring! 🎉**
