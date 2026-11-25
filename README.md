# ThaliTime – Smart Mess Meal Management System (Late-thali)

> **Tagline:** "Your Meal, On Time – Every Time."

ThaliTime is a modern, responsive, full-stack web application designed to solve common bottlenecks in college and hostel mess management: long queues, delayed food preparation, counter overcrowding, uncertain availability, and food wastage.

---

## 🚀 Key Features

### 1. Student Portal
- **Smart 5-Step Meal Booking Wizard:**
  1. *Select Meal Session:* Breakfast, Lunch, or Dinner.
  2. *View Live Menu Availability:* Real-time stock counts; prevents booking sold-out meals.
  3. *Choose 10-Minute Pickup Slot:* Intelligent scheduling with occupancy meters.
  4. *Confirmation Summary:* Comprehensive order review with assigned serving counter.
  5. *Digital Token Generation:* Instant generation of unique tokens (`TT-XXXX`) with confetti celebration.
- **Digital Token Ticket Wallet:**
  - Boarding-pass style digital tickets with perforation aesthetics, barcodes, and print/PDF support.
  - One-click booking cancellation with automatic inventory restoration and slot capacity replenishment.
- **Live Queue Tracking:**
  - Real-time display of **NOW SERVING**, **YOUR TOKEN**, **PEOPLE AHEAD**, and **ESTIMATED WAIT TIME**.
  - Animated progress bar tracking the student's relative position in the service line.
  - Instant in-app banner alert when meals are marked "Ready" at Counter 1 or 2.
- **Digital Daily & Weekly Menu:**
  - Daily live counter availability (Available, Few Left, Sold Out, Closed).
  - Monday-to-Sunday rotating menu calendar.
  - Pure Veg and Non-Veg dietary filters.
- **In-App Notification Center:**
  - Real-time alerts for booking confirmation, pickup reminders, meal-ready alerts, and kitchen delay broadcasts.
- **Feedback & Complaints Hub:**
  - 1 to 5 star ratings, complaint categories (Food Quality, Hygiene, Service Delay, Shortage, etc.), and review of official mess administration replies.
- **Profile & Dietary Settings:**
  - Manage student registration number, hostel block, room number, and dietary preferences.

---

### 2. Mess Administrator Portal
- **Live Operations Dashboard:**
  - 6 Key Performance Indicators: Total Bookings Today, Active Bookings, Meals Prepared, Remaining Stock, Pending Tokens, and Average Student Rating.
- **Live Token & Queue Control Desk:**
  - Instant token status state-machine: `Waiting` → `Preparing` → `Ready` (calls student) → `Collected`.
  - Dynamic counter routing (Counter 1: Veg, Counter 2: Special/Non-Veg, Counter 3: Express).
- **Menu Catalog Management:**
  - Full CRUD: Add dishes, edit descriptions, adjust prices, set batch preparation quantities, and toggle live availability.
- **Pickup Slot Dispatcher:**
  - Configure 10-minute slot intervals, adjust student capacity caps, and toggle open/closed states.
- **Food Inventory & Sustainability Manager:**
  - Batch tracking: Prepared vs. Served vs. Remaining Stock vs. Surplus.
- **Student Quality Feedback Panel:**
  - Review student ratings, investigate recurring complaints, and submit official resolution responses that notify the student directly.
- **Campus Alert Dispatcher:**
  - Broadcast emergency delay notices or shortage alerts to all students in real time.

---

### 3. Five Innovative Smart Features
1. **Smart Peak-Hour Distribution:** Analyzes pickup slot occupancy and recommends less crowded alternatives (e.g. *"Your selected slot is busy (51/55). Try 7:30 PM for faster service"*).
2. **Rule-Based Meal Demand Prediction:** Transparent forecasting engine analyzing day-of-week consumption patterns, current confirmed bookings, and an 8% dynamic safety buffer to recommend precise batch cooking quantities.
3. **Food Waste Reduction Analytics:** Tracks kitchen efficiency percentage, estimated surplus in kilograms, and cost savings in INR.
4. **Emergency Low Food Stock Alerts:** Automatic alerts when remaining portions drop below the configurable threshold (≤15 portions).
5. **Accessibility & High-Contrast Mode:** Dedicated toggle offering 110% font scaling, minimum 48px touch targets, enhanced card borders, and dark/light cream theme support.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite 6, Tailwind CSS 3
- **Icons:** Lucide React
- **Navigation:** React Router DOM v6
- **Charts & Data Visualization:** Recharts
- **Celebration Effects:** Canvas Confetti
- **Storage & State Layer:** Event-driven reactive LocalStorage abstraction with cross-tab real-time event broadcasting (Firebase-ready architecture).

---

## 📂 Project Architecture

```
d:/Thali/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx                       # Main application router
    ├── main.jsx                      # App root mount
    ├── index.css                     # Base Tailwind, a11y, and print stylesheets
    ├── context/
    │   ├── AuthContext.jsx           # Student & Admin authentication & quick demo switcher
    │   ├── DataContext.jsx           # Reactive data provider & notifications
    │   └── ThemeContext.jsx          # Dark mode & accessibility toggle
    ├── services/
    │   ├── mockData.js               # Comprehensive realistic college seed data
    │   ├── storage.js                # Storage wrapper with custom event synchronization
    │   └── dataService.js            # Core atomic business logic & forecasting algorithms
    ├── components/
    │   ├── common/
    │   │   ├── DemoSwitcher.jsx      # Top sticky demo role switcher & a11y bar
    │   │   ├── Navbar.jsx            # Landing page navbar
    │   │   ├── ProtectedRoute.jsx    # Role-based route authorization
    │   │   └── Toast.jsx             # Alert toast component
    │   ├── student/
    │   │   └── StudentLayout.jsx     # Responsive student layout & sidebar
    │   └── admin/
    │       └── AdminLayout.jsx       # Professional admin layout & sidebar
    └── pages/
        ├── LandingPage.jsx           # Landing page with hero, live preview, features, & CTA
        ├── auth/
        │   ├── LoginPage.jsx         # Student login
        │   ├── RegisterPage.jsx      # Student registration
        │   └── AdminLoginPage.jsx    # Administrator login with provisioning key
        ├── student/
        │   ├── StudentDashboard.jsx  # Student KPI cards, active token, queue status, menu
        │   ├── BookMealPage.jsx      # 5-step smart booking wizard
        │   ├── MyTokensPage.jsx      # Digital token ticket wallet & print view
        │   ├── LiveQueuePage.jsx     # Real-time queue tracker
        │   ├── StudentMenuPage.jsx   # Daily & weekly rotating menus
        │   ├── BookingHistoryPage.jsx# History audit trail
        │   ├── StudentFeedbackPage.jsx# Feedback & complaint submission
        │   ├── StudentNotificationsPage.jsx # In-app notification center
        │   ├── StudentProfilePage.jsx# Student profile & dietary settings
        │   └── StudentSettingsPage.jsx # A11y, theme, and data reset
        └── admin/
            ├── AdminDashboard.jsx    # Admin overview, live token controller, forecasts
            ├── AdminMenuPage.jsx     # Menu CRUD & availability toggles
            ├── AdminSlotsPage.jsx    # Pickup slot capacity dispatcher
            ├── AdminTokenControlPage.jsx # Token status state machine
            ├── AdminInventoryPage.jsx# Batch inventory & food waste reduction
            ├── AdminAnalyticsPage.jsx# Interactive Recharts analytics & CSV export
            ├── AdminFeedbackPage.jsx # Feedback review & resolution
            ├── AdminNotificationsPage.jsx # Broadcast alert dispatcher
            └── AdminSettingsPage.jsx # System service times & thresholds
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🧪 Demo Accounts & Quick Switcher

For quick evaluation, use the persistent **Live Demo Bar** at the top of the screen:
- **Student (Aarav Sharma):** `aarav.sharma@college.edu` / `password123` (Has active token `TT-1024`)
- **Student (Ananya Iyer):** `ananya.iyer@college.edu` / `password123`
- **Mess Administrator (Chef Rajesh Verma):** `admin.rajesh@mess.college.edu` / `adminpassword` (Security Key: `MESS-ADMIN-SECURE-2026`)
- **Accessibility Mode:** Toggle A11y on the top bar anytime to test larger text, high-contrast borders, and enlarged touch buttons.

---

## 📄 License
MIT License. Developed for College Mess Automation & Smart Campus Dining.
