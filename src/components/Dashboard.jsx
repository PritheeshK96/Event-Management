import React from 'react';
import { Calendar, Users, DollarSign, TrendingUp, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Dashboard({ events, setView, setSelectedEvent }) {
  // Statistics Calculations
  const totalEvents = events.length;
  
  const totalAttendees = events.reduce((sum, event) => {
    const goingCount = event.attendees ? event.attendees.filter(a => a.rsvp === 'Going').length : 0;
    return sum + goingCount;
  }, 0);

  const totalRevenue = events.reduce((sum, event) => {
    const goingCount = event.attendees ? event.attendees.filter(a => a.rsvp === 'Going').length : 0;
    return sum + (goingCount * (event.price || 0));
  }, 0);

  const averageCapacity = totalEvents > 0 
    ? Math.round((events.reduce((sum, e) => {
        const going = e.attendees ? e.attendees.filter(a => a.rsvp === 'Going').length : 0;
        return sum + (going / e.capacity);
      }, 0) / totalEvents) * 100)
    : 0;

  // Category counts
  const categoryCounts = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  const categoriesList = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    count: categoryCounts[cat],
    percentage: Math.round((categoryCounts[cat] / totalEvents) * 100)
  })).sort((a, b) => b.count - a.count);

  // Sorting events by date to find upcoming ones
  const upcomingEvents = [...events]
    .filter(e => new Date(e.date) >= new Date('2026-06-29')) // filter out past events relative to mock timeline
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  // Custom SVG Area Chart Data (Mocking a 6-month registration trend)
  const chartData = [
    { month: 'Jan', registrations: 120 },
    { month: 'Feb', registrations: 210 },
    { month: 'Mar', registrations: 180 },
    { month: 'Apr', registrations: 340 },
    { month: 'May', registrations: 290 },
    { month: 'Jun', registrations: 450 }
  ];

  // SVG Chart Dimensions & Computations
  const width = 500;
  const height = 200;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxVal = Math.max(...chartData.map(d => d.registrations)) * 1.1;

  const points = chartData.map((d, index) => {
    const x = padding + (index / (chartData.length - 1)) * chartWidth;
    const y = padding + chartHeight - (d.registrations / maxVal) * chartHeight;
    return { x, y, label: d.month, value: d.registrations };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding + chartHeight} L ${points[0].x} ${padding + chartHeight} Z`;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Welcome Back, Organizer</h1>
        <p>Here is what's happening with your events today.</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
            <Calendar size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Total Events</p>
            <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>{totalEvents}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'hsl(var(--success) / 0.1)', color: 'hsl(var(--success))' }}>
            <Users size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Active Attendees</p>
            <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>{totalAttendees}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(236, 72, 153, 0.1)', color: 'hsl(var(--accent))' }}>
            <DollarSign size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Total Revenue</p>
            <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>${totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'hsl(var(--warning) / 0.1)', color: 'hsl(var(--warning))' }}>
            <TrendingUp size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Avg. Capacity Filled</p>
            <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>{averageCapacity}%</h3>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {/* Registration Chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Attendee Registration Trend</h3>
            <p style={{ fontSize: '0.875rem' }}>Monthly trend of confirmed RSVPs</p>
          </div>
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="hsl(var(--border-color))" strokeDasharray="4 4" />
              <line x1={padding} y1={padding + chartHeight / 2} x2={width - padding} y2={padding + chartHeight / 2} stroke="hsl(var(--border-color))" strokeDasharray="4 4" />
              <line x1={padding} y1={padding + chartHeight} x2={width - padding} y2={padding + chartHeight} stroke="hsl(var(--border-color))" />

              {/* Area path */}
              <path d={areaD} fill="url(#chartGradient)" />
              {/* Line path */}
              <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />

              {/* Data points */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle cx={p.x} cy={p.y} r="5" fill="hsl(var(--bg-secondary))" stroke="hsl(var(--primary))" strokeWidth="2" />
                  {/* Tooltip value */}
                  <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--text-primary))">
                    {p.value}
                  </text>
                  {/* X Axis Labels */}
                  <text x={p.x} y={height - 5} textAnchor="middle" fontSize="11" fill="hsl(var(--text-secondary))">
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Event Categories</h3>
            <p style={{ fontSize: '0.875rem' }}>Distribution of events by industry category</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {categoriesList.length > 0 ? (
              categoriesList.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600 }}>
                    <span>{cat.name}</span>
                    <span style={{ color: 'hsl(var(--text-secondary))' }}>{cat.count} {cat.count === 1 ? 'event' : 'events'} ({cat.percentage}%)</span>
                  </div>
                  <div style={{ height: '8px', background: 'hsl(var(--border-color))', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${cat.percentage}%`,
                      background: idx === 0 
                        ? 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)' 
                        : 'hsl(var(--primary) / 0.7)',
                      borderRadius: '4px',
                      transition: 'width var(--transition-slow)'
                    }} />
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontStyle: 'italic', textAlign: 'center', margin: '2rem 0' }}>No categories found. Create an event to begin!</p>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Events Panel */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Upcoming Events</h3>
            <p style={{ fontSize: '0.875rem' }}>Your next scheduled sessions</p>
          </div>
          <button className="btn btn-secondary" onClick={() => setView('events')} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            View All Events <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => {
              const goingCount = event.attendees ? event.attendees.filter(a => a.rsvp === 'Going').length : 0;
              const capacityPct = Math.round((goingCount / event.capacity) * 100);
              
              return (
                <div key={event.id} className="glass-card" style={{ 
                  padding: '1.25rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  flexWrap: 'wrap',
                  gap: '1rem',
                  boxShadow: 'none',
                  border: '1px solid hsl(var(--border-color))'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    {/* Visual Banner Thumbnail */}
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: 'var(--radius-md)', 
                      background: event.banner,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      {event.category.substring(0, 4).toUpperCase()}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>{event.title}</h4>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} /> {event.date} at {event.time}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={12} /> {event.location.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Capacity Tracker */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '120px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
                        <span>Attendees</span>
                        <span>{goingCount}/{event.capacity}</span>
                      </div>
                      <div style={{ height: '6px', background: 'hsl(var(--border-color))', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${Math.min(capacityPct, 100)}%`, 
                          background: capacityPct > 80 ? 'hsl(var(--danger))' : 'hsl(var(--success))',
                          borderRadius: '3px'
                        }} />
                      </div>
                    </div>

                    <button 
                      className="btn btn-secondary" 
                      onClick={() => {
                        setSelectedEvent(event);
                        setView('events');
                      }}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ fontStyle: 'italic', textAlign: 'center', padding: '2rem' }}>No upcoming events scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
}
