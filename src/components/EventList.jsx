import React, { useState } from 'react';
import { Search, Grid, List, Plus, Calendar as CalIcon, MapPin, DollarSign, Edit3, Trash2, Filter } from 'lucide-react';
import { categories } from '../utils/mockData';

export default function EventList({ events, setView, setSelectedEvent, setEditingEvent, setIsModalOpen, onDeleteEvent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'free', 'paid'
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'

  // Filtered Events logic
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceFilter === 'free') matchesPrice = event.price === 0;
    if (priceFilter === 'paid') matchesPrice = event.price > 0;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getCategoryBadgeClass = (category) => {
    switch (category.toLowerCase()) {
      case 'technology': return 'badge-tech';
      case 'music': return 'badge-music';
      case 'food': return 'badge-food';
      case 'art': return 'badge-art';
      case 'business': return 'badge-business';
      case 'sports': return 'badge-sports';
      default: return 'badge-default';
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header and Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Event Catalog</h1>
          <p>Discover, monitor, and configure all scheduled workshops, festivals, and summits.</p>
        </div>
        <button className="btn btn-primary" onClick={() => {
          setEditingEvent(null);
          setIsModalOpen(true);
        }}>
          <Plus size={18} /> Create Event
        </button>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="glass-card" style={{ 
        padding: '1.25rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.25rem',
        boxShadow: 'none',
        border: '1px solid hsl(var(--border-color))'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'hsl(var(--bg-secondary) / 0.5)', border: '1px solid hsl(var(--border-color))', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem', width: '100%', maxWidth: '350px' }}>
            <Search size={18} style={{ color: 'hsl(var(--text-secondary))' }} />
            <input 
              type="text" 
              placeholder="Search event title or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', color: 'hsl(var(--text-primary))', width: '100%', fontSize: '0.9rem' }}
            />
          </div>

          {/* Controls: Grid/List and Pricing */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Price Filter Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} style={{ color: 'hsl(var(--text-secondary))' }} />
              <select 
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="select-field"
                style={{ padding: '0.4rem 1.5rem 0.4rem 0.75rem', fontSize: '0.85rem' }}
              >
                <option value="all">All Ticket Tiers</option>
                <option value="free">Free Admission</option>
                <option value="paid">Paid Admission</option>
              </select>
            </div>

            {/* Layout Toggle Buttons */}
            <div style={{ display: 'flex', background: 'hsl(var(--border-color))', padding: '2px', borderRadius: 'var(--radius-md)' }}>
              <button 
                onClick={() => setViewType('grid')}
                style={{ 
                  border: 'none', 
                  background: viewType === 'grid' ? 'hsl(var(--bg-secondary))' : 'transparent',
                  color: viewType === 'grid' ? 'hsl(var(--text-primary))' : 'hsl(var(--text-secondary))',
                  padding: '0.4rem 0.75rem', 
                  borderRadius: 'calc(var(--radius-md) - 2px)', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewType('list')}
                style={{ 
                  border: 'none', 
                  background: viewType === 'list' ? 'hsl(var(--bg-secondary))' : 'transparent',
                  color: viewType === 'list' ? 'hsl(var(--text-primary))' : 'hsl(var(--text-secondary))',
                  padding: '0.4rem 0.75rem', 
                  borderRadius: 'calc(var(--radius-md) - 2px)', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', whiteSpace: 'nowrap' }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              style={{
                border: '1px solid ' + (selectedCategory === cat ? 'hsl(var(--primary))' : 'hsl(var(--border-color))'),
                background: selectedCategory === cat ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--bg-secondary) / 0.5)',
                color: selectedCategory === cat ? 'hsl(var(--primary))' : 'hsl(var(--text-secondary))',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-xl)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or List Layout rendering */}
      {filteredEvents.length > 0 ? (
        viewType === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredEvents.map(event => {
              const goingCount = event.attendees ? event.attendees.filter(a => a.rsvp === 'Going').length : 0;
              const capacityPct = Math.round((goingCount / event.capacity) * 100);
              
              return (
                <div key={event.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0 }}>
                  {/* Card Banner Header */}
                  <div style={{ 
                    height: '140px', 
                    background: event.banner,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.25rem',
                    color: 'white',
                    position: 'relative'
                  }}>
                    <span className={`badge ${getCategoryBadgeClass(event.category)}`} style={{ alignSelf: 'flex-start', background: 'rgba(0,0,0,0.45)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                      {event.category}
                    </span>
                    <span style={{ 
                      alignSelf: 'flex-end',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      background: 'rgba(0,0,0,0.65)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}>
                      {event.price === 0 ? 'FREE' : `$${event.price}`}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.2rem', lineHeight: '1.4' }}>{event.title}</h3>
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CalIcon size={12} /> {event.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={12} /> {event.location.split(',')[0]}
                        </span>
                      </div>
                    </div>

                    <p style={{ 
                      fontSize: '0.875rem', 
                      display: '-webkit-box', 
                      WebkitLineClamp: 3, 
                      WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      flexGrow: 1
                    }}>
                      {event.description}
                    </p>

                    {/* Capacity Tracker */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
                        <span>Capacity Filled</span>
                        <span>{goingCount}/{event.capacity} ({capacityPct}%)</span>
                      </div>
                      <div style={{ height: '6px', background: 'hsl(var(--border-color))', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${Math.min(capacityPct, 100)}%`, 
                          background: capacityPct > 85 ? 'hsl(var(--danger))' : 'hsl(var(--primary))',
                          borderRadius: '3px'
                        }} />
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginTop: '0.5rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid hsl(var(--border-color))'
                    }}>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => setSelectedEvent(event)}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      >
                        Manage Details
                      </button>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button 
                          className="btn-icon" 
                          onClick={() => {
                            setEditingEvent(event);
                            setIsModalOpen(true);
                          }}
                          title="Edit Event"
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          className="btn-icon" 
                          onClick={() => onDeleteEvent(event.id)}
                          title="Delete Event"
                          style={{ width: '32px', height: '32px', color: 'hsl(var(--danger))' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Rendering */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredEvents.map(event => {
              const goingCount = event.attendees ? event.attendees.filter(a => a.rsvp === 'Going').length : 0;
              const capacityPct = Math.round((goingCount / event.capacity) * 100);
              
              return (
                <div 
                  key={event.id} 
                  className="glass-card" 
                  style={{ 
                    padding: '1rem 1.25rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    flexWrap: 'wrap',
                    gap: '1rem',
                    boxShadow: 'none',
                    border: '1px solid hsl(var(--border-color))'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', flex: '1 1 40%' }}>
                    {/* Visual Banner Thumbnail */}
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: 'var(--radius-md)', 
                      background: event.banner,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }}>
                      {event.category.substring(0, 4).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h4 style={{ fontSize: '1.05rem' }}>{event.title}</h4>
                        <span className={`badge ${getCategoryBadgeClass(event.category)}`} style={{ padding: '0.1rem 0.5rem', fontSize: '0.65rem' }}>
                          {event.category}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CalIcon size={12} /> {event.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={12} /> {event.location.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'flex-end', flex: '1 1 50%' }}>
                    {/* Capacity Indicator */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', width: '100px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--text-secondary))' }}>
                        {goingCount}/{event.capacity} seats
                      </span>
                      <div style={{ height: '5px', background: 'hsl(var(--border-color))', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${Math.min(capacityPct, 100)}%`, 
                          background: 'hsl(var(--primary))',
                          borderRadius: '3px'
                        }} />
                      </div>
                    </div>

                    <span style={{ fontWeight: 'bold', minWidth: '60px', textAlign: 'right' }}>
                      {event.price === 0 ? 'FREE' : `$${event.price}`}
                    </span>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => setSelectedEvent(event)}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        Manage
                      </button>
                      <button 
                        className="btn-icon" 
                        onClick={() => {
                          setEditingEvent(event);
                          setIsModalOpen(true);
                        }}
                        style={{ width: '32px', height: '32px' }}
                      >
                        <Edit3 size={12} />
                      </button>
                      <button 
                        className="btn-icon" 
                        onClick={() => onDeleteEvent(event.id)}
                        style={{ width: '32px', height: '32px', color: 'hsl(var(--danger))' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', border: '1px dashed hsl(var(--border-color))', boxShadow: 'none' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem', fontStyle: 'italic' }}>No events found matching your filter criteria.</p>
          <button className="btn btn-secondary" onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All');
            setPriceFilter('all');
          }}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
