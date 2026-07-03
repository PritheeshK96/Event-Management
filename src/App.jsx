import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, ListTodo, Sun, Moon, Plus, Menu, X } from 'lucide-react';
import { initialEvents } from './utils/mockData';
import Dashboard from './components/Dashboard';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import EventModal from './components/EventModal';
import CalendarView from './components/CalendarView';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark'; // default to premium dark mode
  });

  // Navigation views: 'dashboard', 'events', 'calendar'
  const [view, setView] = useState('dashboard');
  
  // Events database state
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events_db');
    return savedEvents ? JSON.parse(savedEvents) : initialEvents;
  });

  // Event Selection details
  const [selectedEventId, setSelectedEventId] = useState(null);
  
  // Modal controllers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [preselectedDate, setPreselectedDate] = useState(null);
  
  // Mobile responsiveness sidebar toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync events database
  useEffect(() => {
    localStorage.setItem('events_db', JSON.stringify(events));
  }, [events]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSaveEvent = (savedEvent) => {
    // If we have a preselected date from calendar, make sure it's applied
    if (preselectedDate && !editingEvent) {
      savedEvent.date = preselectedDate;
    }

    if (editingEvent) {
      // Editing
      setEvents(prev => prev.map(e => e.id === savedEvent.id ? savedEvent : e));
    } else {
      // Creating new
      setEvents(prev => [savedEvent, ...prev]);
    }
    
    // Reset States
    setIsModalOpen(false);
    setEditingEvent(null);
    setPreselectedDate(null);
    
    // If the event we edited was selected, update detail view
    if (selectedEventId === savedEvent.id) {
      setSelectedEventId(savedEvent.id);
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to permanently delete this event? This will remove all attendee registrations and checklists.")) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
      if (selectedEventId === eventId) {
        setSelectedEventId(null);
      }
    }
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  // Find currently selected event object
  const selectedEvent = events.find(e => e.id === selectedEventId);

  // Render active view dispatcher
  const renderActiveView = () => {
    if (selectedEventId && selectedEvent && view === 'events') {
      return (
        <EventDetail 
          event={selectedEvent}
          onBack={() => setSelectedEventId(null)}
          onUpdateEvent={handleUpdateEvent}
          setEditingEvent={setEditingEvent}
          setIsModalOpen={setIsModalOpen}
        />
      );
    }

    switch (view) {
      case 'dashboard':
        return (
          <Dashboard 
            events={events} 
            setView={setView} 
            setSelectedEvent={(evt) => {
              setSelectedEventId(evt.id);
              setView('events');
            }} 
          />
        );
      case 'events':
        return (
          <EventList 
            events={events}
            setView={setView}
            setSelectedEvent={(evt) => setSelectedEventId(evt.id)}
            setEditingEvent={setEditingEvent}
            setIsModalOpen={setIsModalOpen}
            onDeleteEvent={handleDeleteEvent}
          />
        );
      case 'calendar':
        return (
          <CalendarView 
            events={events}
            setView={setView}
            setSelectedEvent={(evt) => {
              setSelectedEventId(evt.id);
              setView('events');
            }}
            setEditingEvent={setEditingEvent}
            setIsModalOpen={setIsModalOpen}
            setPreselectedDate={setPreselectedDate}
          />
        );
      default:
        return <Dashboard events={events} setView={setView} setSelectedEvent={(evt) => {
          setSelectedEventId(evt.id);
          setView('events');
        }} />;
    }
  };

  return (
    <div className="main-wrapper">
      {/* Mobile Header Bar */}
      <div className="mobile-header" style={{
        display: 'none',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        background: 'hsl(var(--bg-secondary) / 0.9)',
        borderBottom: '1px solid hsl(var(--border-color))',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ListTodo size={22} style={{ color: 'hsl(var(--primary))' }} />
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>EVENTLY</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={toggleTheme} className="btn-icon" style={{ width: '32px', height: '32px' }}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="btn-icon" style={{ width: '32px', height: '32px' }}>
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation Panel */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-active' : ''}`} style={{
        // Add styles inline to support mobile animation overrides
        ...(isMobileMenuOpen ? { transform: 'translateX(0)' } : {})
      }}>
        {/* Sidebar Header */}
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ListTodo size={20} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.025em' }}>Evently</span>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
            { id: 'events', label: 'Events List', icon: <ListTodo size={18} /> },
            { id: 'calendar', label: 'Calendar Planner', icon: <Calendar size={18} /> }
          ].map(item => {
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setSelectedEventId(null);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)' : 'transparent',
                  color: isActive ? 'white' : 'hsl(var(--text-secondary))',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isActive ? '0 4px 12px 0 hsl(var(--primary) / 0.25)' : 'none'
                }}
                className={isActive ? '' : 'sidebar-nav-hover'}
              >
                {item.icon}
                <span className="sidebar-text">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid hsl(var(--border-color))', paddingTop: '1.5rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={toggleTheme}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            {theme === 'light' ? (
              <>
                <Moon size={16} /> <span className="sidebar-text">Dark Theme</span>
              </>
            ) : (
              <>
                <Sun size={16} /> <span className="sidebar-text">Light Theme</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="content-area" style={{
        // Padding adjustment for mobile header spacing
        paddingTop: '2.5rem'
      }}>
        {renderActiveView()}
      </main>

      {/* Global Event Form Modal */}
      <EventModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
          setPreselectedDate(null);
        }}
        onSaveEvent={handleSaveEvent}
        editingEvent={editingEvent}
      />

      {/* CSS Overrides for Mobile Sidebar & hover states */}
      <style>{`
        .sidebar-nav-hover:hover {
          background: hsl(var(--text-muted) / 0.08);
          color: hsl(var(--text-primary));
        }
        .calendar-cell-hover:hover {
          background: hsl(var(--text-muted) / 0.05) !important;
          border-color: hsl(var(--text-muted) / 0.3) !important;
        }
        @media (max-width: 768px) {
          .mobile-header {
            display: flex !important;
          }
          .sidebar {
            position: fixed;
            top: 60px;
            bottom: 0;
            left: 0;
            width: 260px;
            transform: translateX(-100%);
            z-index: 99;
            box-shadow: 10px 0 30px rgba(0,0,0,0.1);
          }
          .content-area {
            padding-top: 5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
