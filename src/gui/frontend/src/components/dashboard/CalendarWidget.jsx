import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import Modal from '../shared/Modal';

const CalendarWidget = ({ onApiCall }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'System Maintenance',
      date: '2025-07-06',
      time: '14:00',
      type: 'maintenance',
      description: 'Scheduled system maintenance and updates'
    },
    {
      id: 2,
      title: 'Camera Calibration',
      date: '2025-07-07',
      time: '10:30',
      type: 'task',
      description: 'Calibrate camera system for optimal performance'
    },
    {
      id: 3,
      title: 'Security Check',
      date: '2025-07-08',
      time: '09:00',
      type: 'security',
      description: 'Routine security system verification'
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'task',
    description: ''
  });

  const eventTypeColors = {
    maintenance: 'bg-orange-500',
    task: 'bg-blue-500',
    security: 'bg-red-500',
    general: 'bg-gray-500'
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const upcoming = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    return upcoming.slice(0, 3);
  };

  const handleAddEvent = () => {
    if (newEvent.title.trim() && newEvent.date && newEvent.time) {
      onApiCall('Would be calling API_ROUTE="/api/calendar/events" for creating new event');
      
      const event = {
        id: Date.now(),
        ...newEvent
      };
      
      setEvents(prev => [...prev, event]);
      setNewEvent({ title: '', date: '', time: '', type: 'task', description: '' });
    }
  };

  const handleDeleteEvent = (id) => {
    onApiCall(`Would be calling API_ROUTE="/api/calendar/events/${id}" for deleting event`);
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const days = getDaysInMonth(currentMonth);
  const upcomingEvents = getUpcomingEvents();

  return (
    <>
      <div className="card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsModalOpen(true)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Schedule</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-light">{upcomingEvents.length} upcoming</span>
            <Calendar className="w-5 h-5 text-primary-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          {upcomingEvents.map(event => (
            <div key={event.id} className="flex items-center gap-3 p-2 bg-surface rounded-lg">
              <div className={`w-2 h-2 rounded-full ${eventTypeColors[event.type]}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{event.title}</div>
                <div className="text-xs text-text-light">{event.date} at {event.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule & Calendar"
        size="xl"
      >
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h4>
                  <div className="flex items-center gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-surface rounded-lg">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-surface rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-text-light">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    if (day === null) {
                      return <div key={index} className="p-2 h-10" />;
                    }
                    
                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const dayEvents = getEventsForDate(date);
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(date)}
                        className={`p-2 h-10 text-sm rounded-lg relative transition-colors ${
                          isToday ? 'bg-primary-500 text-white' :
                          isSelected ? 'bg-primary-500/20 text-primary-500' :
                          'hover:bg-surface'
                        }`}
                      >
                        {day}
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {dayEvents.slice(0, 3).map(event => (
                              <div
                                key={event.id}
                                className={`w-1 h-1 rounded-full ${eventTypeColors[event.type]}`}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Events & Add Event */}
            <div>
              {/* Add Event */}
              <div className="mb-6 p-4 bg-surface rounded-lg">
                <h4 className="font-medium mb-3">Add Event</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  >
                    <option value="task">Task</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="security">Security</option>
                    <option value="general">General</option>
                  </select>
                  <textarea
                    placeholder="Description (optional)"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background h-16 resize-none"
                  />
                  <button
                    onClick={handleAddEvent}
                    className="w-full button bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
                  >
                    Add Event
                  </button>
                </div>
              </div>

              {/* Events for Selected Date */}
              <div>
                <h4 className="font-medium mb-3">
                  Events for {selectedDate.toLocaleDateString()}
                </h4>
                <div className="space-y-2">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="p-3 border border-border rounded-lg bg-background">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${eventTypeColors[event.type]}`} />
                            <span className="font-medium text-sm">{event.title}</span>
                          </div>
                          <div className="text-xs text-text-light mb-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </div>
                          {event.description && (
                            <p className="text-xs text-text-light">{event.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-1 hover:bg-surface rounded text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  {getEventsForDate(selectedDate).length === 0 && (
                    <div className="text-center text-text-light py-4">
                      No events for this date
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CalendarWidget;