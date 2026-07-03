**Intern ID: CITS2282**

# 🎯 Evently — Event Management System

A modern, full-featured **Event Management System** built with React. Evently helps you create, organize, and track events with an intuitive dashboard, interactive calendar, and detailed event management — all wrapped in a sleek, responsive UI.

---

## ✨ Features

- **📊 Dashboard** — Get a quick overview of all upcoming, ongoing, and completed events with real-time stats and visual cards.
- **📋 Event List** — Browse, search, filter, and manage all events in one place. Create, edit, or delete events with ease.
- **📅 Calendar Planner** — Visual monthly calendar view to plan and schedule events. Click any date to quickly create a new event.
- **📝 Event Details** — View full event information including attendees, checklists, and status tracking.
- **🌗 Dark / Light Theme** — Toggle between a premium dark mode and a clean light mode. Your preference is saved automatically.
- **📱 Fully Responsive** — Works seamlessly across desktops, tablets, and mobile devices with a collapsible sidebar navigation.
- **💾 Local Storage Persistence** — All events and preferences are saved locally so your data persists across sessions.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library for building component-based interfaces |
| **Vite 8** | Lightning-fast build tool and dev server |
| **Lucide React** | Beautiful, consistent icon set |
| **Vanilla CSS** | Custom-designed styling with CSS variables and theming |
| **LocalStorage** | Client-side data persistence |

---

## 📁 Project Structure

```
event-management/
├── public/               # Static assets (favicon, icons)
├── src/
│   ├── assets/           # Images and SVG assets
│   ├── components/
│   │   ├── Dashboard.jsx       # Dashboard overview with stats
│   │   ├── EventList.jsx       # Event listing with search & filters
│   │   ├── EventDetail.jsx     # Detailed event view with attendees & checklists
│   │   ├── EventModal.jsx      # Create / Edit event modal form
│   │   └── CalendarView.jsx    # Interactive monthly calendar planner
│   ├── utils/
│   │   └── mockData.js         # Initial sample event data
│   ├── App.jsx           # Main application with routing & state management
│   ├── App.css           # Component-specific styles
│   ├── index.css         # Global styles, theme variables & design system
│   └── main.jsx          # Application entry point
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PritheeshK96/Event-Management.git
   cd Event-Management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` folder.

---

## 📸 Key Highlights

- **Create Events** — Add events with title, date, time, location, category, and description
- **Edit & Delete** — Full CRUD operations on all events
- **Attendee Management** — Track attendees for each event
- **Task Checklists** — Add and manage checklists within events
- **Category Filtering** — Filter events by categories like Conference, Workshop, Meetup, etc.
- **Search** — Quickly find events using the search bar
- **Status Tracking** — Automatic status updates (Upcoming, Ongoing, Completed)

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run OxLint for code quality checks |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
