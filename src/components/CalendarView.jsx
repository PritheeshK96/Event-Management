import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus, ExternalLink } from 'lucide-react';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView({ events, setView, setSelectedEvent, setEditingEvent, setIsModalOpen, setPreselectedDate }) {
  // Setup default timeline state to July 2026 (matching mock events)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 29)); // July 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get details for month calculation
  const firstDayOfMonthIndex = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const totalDaysInPrevMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Find events on a specific calendar date (formatted as YYYY-MM-DD)
  const getEventsForDate = (dayNum) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(dayNum).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    return events.filter(e => e.date === dateStr);
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'technology': return '#3b82f6';
      case 'music': return '#ec4899';
      case 'food': return '#f59e0b';
      case 'art': return '#10b981';
      case 'business': return '#8b5cf6';
      case 'sports': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  // Calendar cells generation
  const calendarCells = [];

  // 1. Previous month trailing days
  for (let i = firstDayOfMonthIndex - 1; i >= 0; i--) {
    calendarCells.push({
      day: totalDaysInPrevMonth - i,
      isCurrentMonth: false,
      monthOffset: -1
    });
  }

  // 2. Current month days
  for (let d = 1; d <= totalDaysInMonth; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      monthOffset: 0
    });
  }

  // 3. Next month leading days (fill up grid to multiples of 7, max 42 cells)
  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      day: i,
      isCurrentMonth: false,
      monthOffset: 1
    });
  }

  // Selected date's events display sidebar / drawer
  const [activeDateInfo, setActiveDateInfo] = useState(null);

  const handleDateClick = (cell) => {
    if (!cell.isCurrentMonth) return;
    const cellEvents = getEventsForDate(cell.day);
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(cell.day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

    setActiveDateInfo({
      day: cell.day,
      dateString: dateStr,
      events: cellEvents
    });
  };

  const handleQuickCreateEvent = (dateStr) => {
    setPreselectedDate(dateStr);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Interactive Planner</h1>
        <p>A month-to-month calendar dashboard displaying all scheduled event dates.</p>
      </div>

      {/* Main Grid: Left is Calendar, Right is Selected Day Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Calendar Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
          
          {/* Calendar Controller Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Calendar size={24} style={{ color: 'hsl(var(--primary))' }} />
              <h3 style={{ fontSize: '1.4rem' }}>{MONTH_NAMES[month]} {year}</h3>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-icon" onClick={handlePrevMonth} style={{ width: '36px', height: '36px' }}>
                <ChevronLeft size={18} />
              </button>
              <button className="btn-icon" onClick={handleNextMonth} style={{ width: '36px', height: '36px' }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
            {WEEKDAYS.map((day, idx) => (
              <span key={idx} style={{ 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                color: 'hsl(var(--text-secondary))',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid hsl(var(--border-color))'
              }}>
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Month grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
            {calendarCells.map((cell, idx) => {
              const cellEvents = cell.isCurrentMonth ? getEventsForDate(cell.day) : [];
              const isSelected = activeDateInfo && activeDateInfo.day === cell.day && cell.isCurrentMonth;
              const hasEvents = cellEvents.length > 0;

              return (
                <div
                  key={idx}
                  onClick={() => handleDateClick(cell)}
                  style={{
                    minHeight: '85px',
                    padding: '0.5rem',
                    background: cell.isCurrentMonth 
                      ? (isSelected ? 'hsl(var(--primary) / 0.08)' : 'hsl(var(--bg-secondary) / 0.4)') 
                      : 'transparent',
                    border: '1px solid ' + (isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border-color))'),
                    borderRadius: 'var(--radius-md)',
                    opacity: cell.isCurrentMonth ? 1 : 0.35,
                    cursor: cell.isCurrentMonth ? 'pointer' : 'default',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                  className={cell.isCurrentMonth ? 'calendar-cell-hover' : ''}
                >
                  {/* Day Indicator */}
                  <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: cell.isCurrentMonth ? 700 : 400,
                    color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--text-primary))',
                    alignSelf: 'flex-start'
                  }}>
                    {cell.day}
                  </span>

                  {/* Events dots or titles inside cells */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                    {cellEvents.slice(0, 2).map((event, eventIdx) => (
                      <div
                        key={event.id}
                        style={{
                          fontSize: '0.7rem',
                          background: getCategoryColor(event.category) + '1a',
                          color: getCategoryColor(event.category),
                          borderLeft: `2.5px solid ${getCategoryColor(event.category)}`,
                          padding: '2px 4px',
                          borderRadius: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontWeight: 600
                        }}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {cellEvents.length > 2 && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'hsl(var(--text-muted))', paddingLeft: '4px' }}>
                        + {cellEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Sidebar Panel for selected date */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minHeight: '350px' }}>
          {activeDateInfo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="animate-fade-in">
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'hsl(var(--text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SELECTED DATE</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.1rem' }}>{activeDateInfo.dateString}</h3>
              </div>

              {activeDateInfo.events.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: '0.85rem' }}>{activeDateInfo.events.length} event(s) scheduled for this day:</p>
                  
                  {activeDateInfo.events.map(event => (
                    <div 
                      key={event.id}
                      style={{ 
                        padding: '1rem',
                        border: '1px solid hsl(var(--border-color))',
                        borderRadius: 'var(--radius-md)',
                        background: 'hsl(var(--bg-secondary) / 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{event.title}</h4>
                      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                        <span>🕒 {event.time}</span>
                        <span>🏷️ {event.category}</span>
                      </div>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => {
                          setSelectedEvent(event);
                          setView('events');
                        }}
                        style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', marginTop: '0.25rem', width: '100%' }}
                      >
                        Go to Details <ExternalLink size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center', padding: '1.5rem 0' }}>
                  <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>No events scheduled for this date.</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleQuickCreateEvent(activeDateInfo.dateString)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', width: '100%' }}
                  >
                    <Plus size={14} /> Schedule Event
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, textAlign: 'center', padding: '1.5rem', gap: '0.75rem' }}>
              <Calendar size={32} style={{ color: 'hsl(var(--text-muted) / 0.6)' }} />
              <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))' }}>Click a day on the calendar grid to inspect event details or add new events.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
