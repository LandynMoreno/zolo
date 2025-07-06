import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlarmClock, Plus, X, Bell, BellOff } from 'lucide-react';
import Modal from '../shared/Modal';

const AlarmWidget = ({ onApiCall }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarms, setAlarms] = useState([
    {
      id: 1,
      time: '07:00',
      label: 'Morning Routine',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      enabled: true,
      sound: 'gentle'
    },
    {
      id: 2,
      time: '14:00',
      label: 'System Check',
      days: ['Mon', 'Wed', 'Fri'],
      enabled: true,
      sound: 'chime'
    },
    {
      id: 3,
      time: '22:00',
      label: 'Backup Routine',
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      enabled: false,
      sound: 'digital'
    }
  ]);

  const [newAlarm, setNewAlarm] = useState({
    time: '',
    label: '',
    days: [],
    enabled: true,
    sound: 'gentle'
  });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sounds = ['gentle', 'chime', 'digital', 'beep'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getNextAlarm = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' });
    const currentTime = now.getHours() * 100 + now.getMinutes();

    let nextAlarm = null;
    let minTimeDiff = Infinity;

    alarms.forEach(alarm => {
      if (!alarm.enabled) return;

      const [hours, minutes] = alarm.time.split(':').map(Number);
      const alarmTime = hours * 100 + minutes;

      alarm.days.forEach(day => {
        const dayIndex = weekDays.indexOf(day);
        const currentDayIndex = weekDays.indexOf(currentDay);
        
        let daysDiff = dayIndex - currentDayIndex;
        if (daysDiff < 0) daysDiff += 7;
        if (daysDiff === 0 && alarmTime <= currentTime) daysDiff = 7;

        const timeDiff = daysDiff * 24 * 60 + (hours * 60 + minutes) - (now.getHours() * 60 + now.getMinutes());
        
        if (timeDiff > 0 && timeDiff < minTimeDiff) {
          minTimeDiff = timeDiff;
          nextAlarm = { ...alarm, day, timeDiff };
        }
      });
    });

    return nextAlarm;
  };

  const handleAddAlarm = () => {
    if (newAlarm.time && newAlarm.label && newAlarm.days.length > 0) {
      onApiCall('Would be calling API_ROUTE="/api/alarms" for creating new alarm');
      
      const alarm = {
        id: Date.now(),
        ...newAlarm
      };
      
      setAlarms(prev => [...prev, alarm]);
      setNewAlarm({ time: '', label: '', days: [], enabled: true, sound: 'gentle' });
    }
  };

  const handleToggleAlarm = (id) => {
    onApiCall(`Would be calling API_ROUTE="/api/alarms/${id}" for toggling alarm status`);
    setAlarms(prev => prev.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };

  const handleDeleteAlarm = (id) => {
    onApiCall(`Would be calling API_ROUTE="/api/alarms/${id}" for deleting alarm`);
    setAlarms(prev => prev.filter(alarm => alarm.id !== id));
  };

  const handleToggleDay = (day) => {
    setNewAlarm(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const nextAlarm = getNextAlarm();
  const enabledAlarms = alarms.filter(alarm => alarm.enabled);

  return (
    <>
      <div className="card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsModalOpen(true)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Alarms</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-light">{enabledAlarms.length} active</span>
            <AlarmClock className="w-5 h-5 text-primary-500" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="text-center py-2">
            <div className="text-2xl font-mono font-bold text-primary-500">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-text-light">
              {formatDate(currentTime)}
            </div>
          </div>
          
          {nextAlarm && (
            <div className="p-3 bg-surface rounded-lg">
              <div className="text-sm font-medium">Next Alarm</div>
              <div className="text-sm text-text-light">
                {nextAlarm.label} • {nextAlarm.time} • {nextAlarm.day}
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Alarm Manager"
        size="lg"
      >
        <div className="p-6">
          {/* Current Time Display */}
          <div className="text-center mb-6 p-6 bg-surface rounded-lg">
            <div className="text-4xl font-mono font-bold text-primary-500 mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-lg text-text-light">
              {formatDate(currentTime)}
            </div>
            {nextAlarm && (
              <div className="mt-4 p-3 bg-primary-500/10 rounded-lg">
                <div className="text-sm font-medium text-primary-500">Next Alarm</div>
                <div className="text-sm">
                  {nextAlarm.label} in {Math.floor(nextAlarm.timeDiff / 60)}h {nextAlarm.timeDiff % 60}m
                </div>
              </div>
            )}
          </div>

          {/* Add New Alarm */}
          <div className="mb-6 p-4 bg-surface rounded-lg">
            <h4 className="font-medium mb-3">Add New Alarm</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="time"
                  value={newAlarm.time}
                  onChange={(e) => setNewAlarm(prev => ({ ...prev, time: e.target.value }))}
                  className="px-3 py-2 border border-border rounded-lg bg-background"
                />
                <input
                  type="text"
                  placeholder="Alarm label"
                  value={newAlarm.label}
                  onChange={(e) => setNewAlarm(prev => ({ ...prev, label: e.target.value }))}
                  className="px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Repeat on</label>
                <div className="flex gap-2">
                  {weekDays.map(day => (
                    <button
                      key={day}
                      onClick={() => handleToggleDay(day)}
                      className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                        newAlarm.days.includes(day)
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-background border-border hover:border-primary-500'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Sound</label>
                <select
                  value={newAlarm.sound}
                  onChange={(e) => setNewAlarm(prev => ({ ...prev, sound: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  {sounds.map(sound => (
                    <option key={sound} value={sound}>
                      {sound.charAt(0).toUpperCase() + sound.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleAddAlarm}
                className="w-full button bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
              >
                Add Alarm
              </button>
            </div>
          </div>

          {/* Alarms List */}
          <div>
            <h4 className="font-medium mb-3">Active Alarms</h4>
            <div className="space-y-3">
              {alarms.map(alarm => (
                <motion.div
                  key={alarm.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border rounded-lg transition-colors ${
                    alarm.enabled 
                      ? 'border-border bg-background' 
                      : 'border-border bg-surface/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-xl font-mono font-bold">
                          {alarm.time}
                        </div>
                        <div className="text-sm font-medium">
                          {alarm.label}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-light">
                        <div className="flex gap-1">
                          {alarm.days.map(day => (
                            <span key={day} className="px-2 py-1 bg-surface rounded text-xs">
                              {day}
                            </span>
                          ))}
                        </div>
                        <span>•</span>
                        <span className="capitalize">{alarm.sound}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleAlarm(alarm.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          alarm.enabled 
                            ? 'text-green-500 hover:bg-green-500/10' 
                            : 'text-gray-400 hover:bg-gray-400/10'
                        }`}
                      >
                        {alarm.enabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteAlarm(alarm.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AlarmWidget;