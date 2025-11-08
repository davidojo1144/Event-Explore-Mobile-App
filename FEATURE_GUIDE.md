# Event Explorer - Feature Guide

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start the app
npm start
```

### First Time Setup

1. The app will start on the **Login Screen**
2. Use test credentials:
   - Email: `test@example.com`
   - Password: `password123`
3. Or create a new account via **Sign Up**

## 📱 Features Overview

### 1. Authentication

**Location**: Login/Signup Screens

- **Login**: Enter email and password
- **Signup**: Create new account with name, email, and password
- **Logout**: Available in Settings screen
- **Session**: Stays logged in until you logout

**Test Account**:

- Email: test@example.com
- Password: password123

---

### 2. Event Discovery

**Location**: Events Tab (Home)

**Features**:

- Browse 35+ diverse events
- Search by title, description, category, or location
- Pull to refresh
- Smooth animations

**Categories Available**:

- Technology
- Music
- Business
- Food & Drink
- Sports
- Art & Culture
- Health & Wellness
- Entertainment
- Education
- Networking

---

### 3. Category Filter

**Location**: Events Tab → Category chips below search

**How to Use**:

1. Scroll horizontally through category chips
2. Tap a category to filter events
3. Tap "All" to clear filter
4. Active category is highlighted

---

### 4. Date Range Filter

**Location**: Events Tab → "Filter by Date" button

**How to Use**:

1. Tap "Filter by Date" button
2. Choose from presets:
   - Today
   - This Week
   - This Month
   - Next Month
3. Or select custom date range
4. Tap "Apply Filter"
5. Clear with "Clear Filter" button

---

### 5. Map View

**Location**: Events Tab → Map icon (🗺️) in header

**Features**:

- View all events on interactive map
- Tap markers to see event info
- Navigate to event details
- Shows your current location
- Event count displayed

**How to Use**:

1. Tap map icon in Events tab header
2. Tap any marker to see event details
3. Tap "View Details" to go to full event page

---

### 6. Event Details

**Location**: Tap any event card

**Available Actions**:

- ❤️ **Add to Favorites**: Save event for later
- 📤 **Share**: Share event via native share dialog
- 📆 **Add to Calendar**: Add event to device calendar
- 🔔 **Set Reminder**: Schedule notification
- 🎫 **Buy Tickets**: Purchase event tickets

**Reminder Options**:

- 1 hour before event
- 1 day before event
- 1 week before event

---

### 7. Favorites

**Location**: Favorites Tab

**Features**:

- View all saved events
- Real-time updates (no refresh needed!)
- Tap to view event details
- Remove by tapping heart again in event details

**How It Works**:

- Favorites sync instantly across all screens
- Persists even after closing the app
- Shows count in tab subtitle

---

### 8. Event Sharing

**Location**: Event Details → Share button (📤)

**What Gets Shared**:

- Event title
- Date and time
- Location
- Description
- Link (when available)

**Platforms**:

- SMS/iMessage
- Email
- Social media
- Any app that supports sharing

---

### 9. Calendar Integration

**Location**: Event Details → Calendar button (📆)

**Features**:

- Adds event to default device calendar
- Includes all event details
- Sets location for navigation
- Handles permissions automatically

**First Time**:

- App will request calendar permission
- Grant permission to use this feature

---

### 10. Push Notifications

**Location**: Event Details → Remind button (🔔)

**How to Use**:

1. Tap the bell icon
2. Choose reminder time:
   - 1 hour before
   - 1 day before
   - 1 week before
3. Receive notification at scheduled time

**First Time**:

- App will request notification permission
- Grant permission to receive reminders

---

### 11. Ticket Booking

**Location**: Event Details → "Buy Tickets" button

**Features**:

- Select ticket quantity (1-10)
- View price breakdown
- Secure purchase flow
- Instant confirmation
- E-ticket delivery (simulated)

**How to Use**:

1. Tap "Buy Tickets" button
2. Adjust quantity with +/- buttons
3. Review total price
4. Tap "Purchase" button
5. Receive confirmation

**Note**: Currently uses mock payment system

---

### 12. Dark Mode

**Location**: Settings Tab → Dark Mode toggle

**Features**:

- Beautiful dark theme
- Smooth transitions
- Persists across app restarts
- All screens fully supported

**How to Toggle**:

1. Go to Settings tab
2. Toggle "Dark Mode" switch
3. Theme changes instantly

**Colors**:

- **Light**: Clean white backgrounds
- **Dark**: Deep grays with reduced eye strain

---

### 13. Settings

**Location**: Settings Tab

**Available Options**:

- **Account Info**: View your profile
- **Dark Mode**: Toggle theme
- **Notifications**: Manage preferences (coming soon)
- **Privacy Policy**: View policy (coming soon)
- **Terms of Service**: View terms (coming soon)
- **Logout**: Sign out of account

---

## 🎯 Quick Tips

### Efficient Event Discovery

1. Use **search** for quick finds
2. Use **category filter** to browse by type
3. Use **date filter** for planning ahead
4. Use **map view** to find nearby events

### Managing Favorites

- Tap heart on any event to save
- Access all favorites in Favorites tab
- Changes reflect immediately everywhere

### Getting Reminders

1. Add event to favorites
2. Set a reminder notification
3. Add to calendar for extra backup

### Best Practices

- Enable notifications for reminders
- Grant calendar permission for syncing
- Use dark mode in low light
- Pull to refresh for latest events

---

## 🔧 Troubleshooting

### Favorites Not Updating?

- This has been fixed! Favorites now update in real-time
- If issues persist, try restarting the app

### Notifications Not Working?

- Check app permissions in device settings
- Ensure notifications are enabled
- Try setting a test reminder

### Calendar Not Syncing?

- Grant calendar permission when prompted
- Check device calendar app
- Ensure calendar app is installed

### Map Not Loading?

- Check internet connection
- Ensure location permission is granted
- Try refreshing the map

### Login Issues?

- Use test account: test@example.com / password123
- Or create a new account
- Password must be 6+ characters

---

## 📊 Event Statistics

- **Total Events**: 35+
- **Categories**: 10
- **Date Range**: 2024-2025
- **Locations**: San Francisco Bay Area
- **Price Range**: $15 - $150

---

## 🎨 Theme Colors

### Light Mode

- Primary: Indigo (#6366f1)
- Background: White
- Text: Dark Gray

### Dark Mode

- Primary: Light Indigo (#818cf8)
- Background: Dark Gray
- Text: Light Gray

---

## 📱 Supported Platforms

- ✅ iOS (iPhone & iPad)
- ✅ Android (Phone & Tablet)
- ✅ Web (Limited features)

---

## 🆘 Need Help?

If you encounter any issues:

1. Check this guide
2. Review TODO.md for known issues
3. Check PHASE2_COMPLETION_SUMMARY.md for technical details

---

**Last Updated**: 2024
**Version**: 2.0.0
**Status**: All Phase 2 Features Active ✅
