import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { categories } from '../utils/mockData';

const bannerPresets = [
  { name: 'Indigo Glow', value: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' },
  { name: 'Neon Sunset', value: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' },
  { name: 'Honey Amber', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  { name: 'Emerald Wave', value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
  { name: 'Cosmic Indigo', value: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)' },
  { name: 'Crimson Rose', value: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)' }
];

export default function EventModal({ isOpen, onClose, onSaveEvent, editingEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Technology',
    price: 0,
    capacity: 100,
    banner: bannerPresets[0].value
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || '',
        description: editingEvent.description || '',
        date: editingEvent.date || '',
        time: editingEvent.time || '',
        location: editingEvent.location || '',
        category: editingEvent.category || 'Technology',
        price: editingEvent.price ?? 0,
        capacity: editingEvent.capacity ?? 100,
        banner: editingEvent.banner || bannerPresets[0].value
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'Technology',
        price: 0,
        capacity: 100,
        banner: bannerPresets[0].value
      });
    }
  }, [editingEvent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.date || !formData.time || !formData.location.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.capacity <= 0) {
      alert("Capacity must be at least 1.");
      return;
    }

    if (formData.price < 0) {
      alert("Price cannot be negative.");
      return;
    }

    const savedEvent = {
      id: editingEvent ? editingEvent.id : 'event-' + Date.now(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      category: formData.category,
      price: Number(formData.price),
      capacity: Number(formData.capacity),
      banner: formData.banner,
      // Retain checklist and attendees if editing, else initialize them
      checklist: editingEvent ? (editingEvent.checklist || []) : [],
      attendees: editingEvent ? (editingEvent.attendees || []) : []
    };

    onSaveEvent(savedEvent);
  };

  // Filter categories to remove the "All" placeholder
  const formCategories = categories.filter(cat => cat !== 'All');

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div 
        className="glass-card animate-scale-up" 
        style={{ 
          width: '100%', 
          maxWidth: '600px', 
          maxHeight: '90vh', 
          overflowY: 'auto',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          background: 'hsl(var(--bg-secondary))',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem' }}>{editingEvent ? 'Edit Event Details' : 'Create New Event'}</h2>
          <button 
            className="btn-icon" 
            onClick={onClose}
            style={{ width: '32px', height: '32px', border: 'none', background: 'transparent' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Title */}
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Event Title *</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Annual Developer Sync"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Event Description</label>
            <textarea 
              className="textarea-field" 
              placeholder="Provide a detailed description of the sessions, schedules, speakers, and requirements..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          {/* Date & Time Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Event Date *</label>
              <input 
                type="date" 
                className="input-field" 
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Start Time *</label>
              <input 
                type="time" 
                className="input-field" 
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Location / Link *</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. San Francisco Central Park, CA or Zoom Webinar Link"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          {/* Category, Price & Capacity Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Category</label>
              <select 
                className="select-field" 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {formCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Ticket Price ($) *</label>
              <input 
                type="number" 
                min="0"
                className="input-field" 
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Capacity *</label>
              <input 
                type="number" 
                min="1"
                className="input-field" 
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Theme Banner Selector */}
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Event Card Banner Theme</label>
            <div style={{ 
              height: '60px', 
              background: formData.banner, 
              borderRadius: 'var(--radius-md)', 
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }}>
              LIVE BANNER PREVIEW
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {bannerPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, banner: preset.value })}
                  style={{
                    background: preset.value,
                    height: '35px',
                    border: formData.banner === preset.value ? '2px solid hsl(var(--primary))' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                    boxShadow: formData.banner === preset.value ? '0 0 8px hsl(var(--primary))' : 'none',
                    transition: 'transform var(--transition-fast)'
                  }}
                >
                  {preset.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
