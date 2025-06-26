# Mood Tracker

A modern, responsive Mood Tracker app built with React and Tailwind CSS. Track your daily moods, visualize trends, and enjoy a beautiful, interactive UI with local persistence, analytics, and smooth UX enhancements.

## Features

- **Mood Entry Creation:**
  - Select a mood emoji and add a mood with date/time.
  - All entries are listed with emoji, mood text, and timestamp.
- **Mood List Management:**
  - Delete individual moods with confirmation.
  - Undo the last deletion or clear action with confirmation.
  - Clear all moods with a confirmation modal.
- **Analytics Dashboard:**
  - Visualize mood trends with a responsive bar chart (Recharts).
- **Persistence:**
  - All moods are saved in your browser's localStorage and persist across refreshes.
- **Responsive Design:**
  - Fully responsive for mobile, tablet, and desktop.
- **UI/UX Enhancements:**
  - Animated notifications (react-toastify) for all actions.
  - Modal dialogs for critical actions with background blur.
  - Tabbed interface for switching between mood list and analytics.

## Tech Stack

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) (for analytics)
- [react-toastify](https://fkhadra.github.io/react-toastify/) (for notifications)

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Amarnath1212/Mood-Tracker.git
   cd mood-tracker
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Usage

- Add a mood by selecting an emoji and clicking **Add**.
- View, delete, or undo mood entries in the **Mood List** tab.
- See mood analytics in the **Mood Analytics** tab.
- Use the **Clear All** button to remove all moods (with confirmation).
- All actions provide animated feedback and confirmations.

## Repository

[https://github.com/Amarnath1212/Mood-Tracker.git](https://github.com/Amarnath1212/Mood-Tracker.git)

---

**Enjoy tracking your moods and visualizing your emotional trends!**
