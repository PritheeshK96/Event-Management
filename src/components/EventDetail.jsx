import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin, Users, CheckSquare, Plus, Trash2, Ticket, Check, Calendar } from 'lucide-react';

export default function EventDetail({ event, onBack, onUpdateEvent, setEditingEvent, setIsModalOpen }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '', rsvp: 'Going' });
  const [newTaskText, setNewTaskText] = useState('');
  const [registeredTicket, setRegisteredTicket] = useState(null);

  // Countdown Timer effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(`${event.date}T${event.time}:00`) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return timeLeft;
    };

    setCountdown(calculateTimeLeft());
    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  // RSVP Form submission
  const handleRegister = (e) => {
    e.preventDefault();
    if (!newAttendee.name.trim() || !newAttendee.email.trim()) return;

    // Check capacity
    const goingCount = event.attendees ? event.attendees.filter(a => a.rsvp === 'Going').length : 0;
    if (goingCount >= event.capacity && newAttendee.rsvp === 'Going') {
      alert("This event has reached maximum capacity!");
      return;
    }

    const tktNumber = `TKT-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(10 + Math.random() * 89)}`;
    const newAttendeeObj = {
      id: 'att-' + Date.now(),
      name: newAttendee.name,
      email: newAttendee.email,
      rsvp: newAttendee.rsvp,
      ticketNumber: tktNumber
    };

    const updatedAttendees = [...(event.attendees || []), newAttendeeObj];
    const updatedEvent = { ...event, attendees: updatedAttendees };
    onUpdateEvent(updatedEvent);

    // Save ticket to state to display the voucher modal or card
    if (newAttendee.rsvp === 'Going') {
      setRegisteredTicket({
        name: newAttendee.name,
        ticketNumber: tktNumber,
        eventTitle: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price
      });
    }

    // Reset Form
    setNewAttendee({ name: '', email: '', rsvp: 'Going' });
  };

  const handleRemoveAttendee = (attId) => {
    if (!window.confirm("Are you sure you want to cancel this registration?")) return;
    const updatedAttendees = event.attendees.filter(a => a.id !== attId);
    onUpdateEvent({ ...event, attendees: updatedAttendees });
  };

  // Checklist Actions
  const handleToggleTask = (taskId) => {
    const updatedChecklist = event.checklist.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onUpdateEvent({ ...event, checklist: updatedChecklist });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newChecklistItem = {
      id: 'task-' + Date.now(),
      text: newTaskText,
      completed: false
    };

    const updatedChecklist = [...(event.checklist || []), newChecklistItem];
    onUpdateEvent({ ...event, checklist: updatedChecklist });
    setNewTaskText('');
  };

  const handleRemoveTask = (taskId) => {
    const updatedChecklist = event.checklist.filter(task => task.id !== taskId);
    onUpdateEvent({ ...event, checklist: updatedChecklist });
  };

  const checklistTotal = event.checklist ? event.checklist.length : 0;
  const checklistCompleted = event.checklist ? event.checklist.filter(t => t.completed).length : 0;
  const checklistPercentage = checklistTotal > 0 ? Math.round((checklistCompleted / checklistTotal) * 100) : 0;

  const goingAttendees = event.attendees ? event.attendees.filter(a => a.rsvp === 'Going') : [];
  const maybeAttendees = event.attendees ? event.attendees.filter(a => a.rsvp === 'Maybe') : [];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Back Header navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Catalog
        </button>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" onClick={() => {
            setEditingEvent(event);
            setIsModalOpen(true);
          }}>
            Edit Details
          </button>
        </div>
      </div>

      {/* Main Banner / Header */}
      <div className="glass-card" style={{ 
        padding: '2.5rem', 
        background: event.banner,
        color: 'white',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.25)', zIndex: 1 }} />
        
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <span className="badge" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
            {event.category}
          </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, background: 'rgba(0,0,0,0.6)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-md)' }}>
            {event.price === 0 ? 'FREE ADMISSION' : `$${event.price} Ticket`}
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginTop: '3rem' }}>
          <div style={{ maxWidth: '60%' }}>
            <h1 style={{ fontSize: '2.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.3)', color: '#fff' }}>{event.title}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem', opacity: 0.9, marginTop: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={16} /> {event.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} /> {event.time}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} /> {event.location}
              </span>
            </div>
          </div>

          {/* Countdown Clock Grid */}
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            background: 'rgba(0, 0, 0, 0.55)', 
            padding: '1rem', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)'
          }}>
            {[
              { label: 'D', value: countdown.days },
              { label: 'H', value: countdown.hours },
              { label: 'M', value: countdown.minutes },
              { label: 'S', value: countdown.seconds }
            ].map((unit, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '45px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{String(unit.value).padStart(2, '0')}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, opacity: 0.8, letterSpacing: '0.05em' }}>{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Left Side: About & RSVP Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* About Panel */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>About this Event</h3>
            <p style={{ fontSize: '1rem', color: 'hsl(var(--text-secondary))', whiteSpace: 'pre-wrap' }}>{event.description}</p>
          </div>

          {/* Registration / RSVP Panel */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>RSVP / Ticket Registration</h3>
              <p style={{ fontSize: '0.85rem' }}>Register to receive your ticket passcode and secure your seat.</p>
            </div>

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Attendee Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Full Name" 
                  value={newAttendee.name}
                  onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="name@example.com" 
                  value={newAttendee.email}
                  onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>RSVP Attendance Status</label>
                <select 
                  className="select-field" 
                  value={newAttendee.rsvp}
                  onChange={(e) => setNewAttendee({ ...newAttendee, rsvp: e.target.value })}
                >
                  <option value="Going">Going (Reserves a Seat)</option>
                  <option value="Maybe">Maybe (Tentative)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Confirm Registration
              </button>
            </form>

            {/* Generated Ticket Showcase */}
            {registeredTicket && (
              <div className="animate-scale-up" style={{ 
                marginTop: '1rem',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--accent) / 0.15) 100%)',
                border: '2px dashed hsl(var(--primary) / 0.3)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'relative'
              }}>
                <button 
                  onClick={() => setRegisteredTicket(null)} 
                  style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', color: 'hsl(var(--text-secondary))' }}
                >
                  ✕
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--primary))' }}>
                  <Ticket size={20} />
                  <span style={{ fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.05em' }}>REGISTRATION CONFIRMED</span>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', margin: '0.25rem 0' }}>{registeredTicket.eventTitle}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>{registeredTicket.location}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid hsl(var(--border-color))', paddingTop: '0.5rem', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ display: 'block', color: 'hsl(var(--text-muted))', fontSize: '0.7rem' }}>PASSCODE</span>
                    <strong style={{ fontSize: '0.9rem', color: 'hsl(var(--text-primary))' }}>{registeredTicket.ticketNumber}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', color: 'hsl(var(--text-muted))', fontSize: '0.7rem' }}>HOLDER</span>
                    <strong style={{ fontSize: '0.9rem', color: 'hsl(var(--text-primary))' }}>{registeredTicket.name}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Checklist and Attendees Directories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Checklist Manager */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Organizer Tasks</h3>
                <p style={{ fontSize: '0.85rem' }}>Checklist to organize logistics.</p>
              </div>
              <span className="badge" style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {checklistPercentage}% Done
              </span>
            </div>

            {/* Checklist progress bar */}
            <div style={{ height: '6px', background: 'hsl(var(--border-color))', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${checklistPercentage}%`, 
                background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
                borderRadius: '3px',
                transition: 'width var(--transition-normal)'
              }} />
            </div>

            {/* Checklist List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '0.25rem' }}>
              {event.checklist && event.checklist.length > 0 ? (
                event.checklist.map(task => (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexGrow: 1, fontSize: '0.9rem' }}>
                      <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => handleToggleTask(task.id)}
                        style={{ width: '16px', height: '16px', accentColor: 'hsl(var(--primary))' }}
                      />
                      <span style={{ 
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'hsl(var(--text-muted))' : 'hsl(var(--text-primary))',
                        transition: 'color var(--transition-fast)'
                      }}>
                        {task.text}
                      </span>
                    </label>
                    <button 
                      className="btn-icon" 
                      onClick={() => handleRemoveTask(task.id)}
                      style={{ width: '28px', height: '28px', border: 'none', background: 'transparent', color: 'hsl(var(--danger))' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ fontStyle: 'italic', textAlign: 'center', color: 'hsl(var(--text-muted))', padding: '1rem 0' }}>No tasks created yet.</p>
              )}
            </div>

            {/* Checklist Add Form */}
            <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="input-field" 
                placeholder="New checklist item..." 
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                style={{ flexGrow: 1, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                <Plus size={16} />
              </button>
            </form>
          </div>

          {/* Attendee Directory Panel */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Attendee Directory</h3>
              <p style={{ fontSize: '0.85rem' }}>Confirmed seats ({goingAttendees.length}) and tentative plans ({maybeAttendees.length})</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.25rem' }}>
              {event.attendees && event.attendees.length > 0 ? (
                event.attendees.map(attendee => (
                  <div key={attendee.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '0.6rem 0.8rem',
                    border: '1px solid hsl(var(--border-color))',
                    borderRadius: 'var(--radius-md)',
                    background: 'hsl(var(--bg-secondary) / 0.3)'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{attendee.name}</span>
                        <span className="badge" style={{ 
                          fontSize: '0.6rem', 
                          padding: '0.1rem 0.4rem',
                          background: attendee.rsvp === 'Going' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: attendee.rsvp === 'Going' ? '#10b981' : '#f59e0b'
                        }}>
                          {attendee.rsvp}
                        </span>
                      </div>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'hsl(var(--text-secondary))', marginTop: '0.1rem' }}>
                        {attendee.email} • <span style={{ fontFamily: 'monospace' }}>{attendee.ticketNumber}</span>
                      </span>
                    </div>

                    <button 
                      className="btn-icon" 
                      onClick={() => handleRemoveAttendee(attendee.id)}
                      title="Remove attendee"
                      style={{ width: '28px', height: '28px', border: 'none', background: 'transparent', color: 'hsl(var(--danger))' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ fontStyle: 'italic', textAlign: 'center', color: 'hsl(var(--text-muted))', padding: '2rem 0' }}>No attendees registered yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
