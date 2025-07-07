import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Calendar, CheckSquare, Clock, GripVertical, Eye, EyeOff } from 'lucide-react';

const WidgetSettings = ({ onApiCall }) => {
  const [widgets, setWidgets] = useState([
    {
      id: 'github',
      name: 'GitHub Activity',
      description: 'Shows your recent GitHub contributions and commits',
      icon: Github,
      enabled: true,
      order: 1
    },
    {
      id: 'calendar',
      name: 'Calendar',
      description: 'Displays upcoming events and calendar preview',
      icon: Calendar,
      enabled: true,
      order: 2
    },
    {
      id: 'todo',
      name: 'Todo List',
      description: 'Task management and productivity tracking',
      icon: CheckSquare,
      enabled: true,
      order: 3
    },
    {
      id: 'alarm',
      name: 'Alarms & Timers',
      description: 'Manage alarms, timers, and reminders',
      icon: Clock,
      enabled: true,
      order: 4
    }
  ]);

  const handleToggleWidget = (widgetId) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, enabled: !widget.enabled }
        : widget
    ));
    
    const widget = widgets.find(w => w.id === widgetId);
    onApiCall(`Would be calling API_ROUTE="/api/dashboard/widgets/${widgetId}" for ${widget.enabled ? 'disabling' : 'enabling'} ${widget.name} widget`);
  };

  const handleReorderWidget = (widgetId, direction) => {
    const currentIndex = widgets.findIndex(w => w.id === widgetId);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= widgets.length) return;
    
    setWidgets(prev => {
      const newWidgets = [...prev];
      [newWidgets[currentIndex], newWidgets[newIndex]] = [newWidgets[newIndex], newWidgets[currentIndex]];
      return newWidgets.map((widget, index) => ({ ...widget, order: index + 1 }));
    });
    
    onApiCall(`Would be calling API_ROUTE="/api/dashboard/widgets/reorder" for reordering ${widgets[currentIndex].name} widget`);
  };

  const enabledCount = widgets.filter(w => w.enabled).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Dashboard Widgets</h3>
            <p className="text-text-light text-sm mt-1">
              Customize which widgets appear on your dashboard and their order
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary-500">{enabledCount}</div>
            <div className="text-xs text-text-light">Active Widgets</div>
          </div>
        </div>

        <div className="space-y-3">
          {widgets.map((widget, index) => {
            const IconComponent = widget.icon;
            return (
              <motion.div
                key={widget.id}
                layout
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  widget.enabled 
                    ? 'border-primary-500/20 bg-primary-500/5' 
                    : 'border-border bg-surface'
                }`}
              >
                {/* Drag Handle */}
                <div className="cursor-move text-text-light hover:text-text transition-colors">
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* Widget Icon */}
                <div className={`p-2 rounded-lg ${
                  widget.enabled ? 'bg-primary-500 text-white' : 'bg-surface text-text-light'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Widget Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{widget.name}</h4>
                    {widget.enabled && (
                      <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-light">{widget.description}</p>
                </div>

                {/* Order Controls */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleReorderWidget(widget.id, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <div className="w-3 h-3 border-l-2 border-b-2 border-text-light transform rotate-45"></div>
                  </button>
                  <button
                    onClick={() => handleReorderWidget(widget.id, 'down')}
                    disabled={index === widgets.length - 1}
                    className="p-1 rounded hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <div className="w-3 h-3 border-l-2 border-b-2 border-text-light transform -rotate-45"></div>
                  </button>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggleWidget(widget.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    widget.enabled ? 'bg-primary-500' : 'bg-border'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      widget.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Integration Status */}
        <div className="mt-6 p-4 bg-surface rounded-lg border-l-4 border-primary-500">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium flex items-center gap-2">
                <Github className="w-4 h-4 text-primary-500" />
                GitHub Integration
              </h4>
              <p className="text-sm text-text-light mt-1">
                The GitHub widget requires API access to show your contributions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-500">Connected</span>
            </div>
          </div>
          <div className="mt-3">
            <button
              onClick={() => onApiCall('Would be calling API_ROUTE="/api/integrations/github/configure" for configuring GitHub integration')}
              className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
            >
              Configure Integration →
            </button>
          </div>
        </div>

        {/* Widget Preview */}
        <div className="mt-6">
          <h4 className="font-medium mb-3">Preview Layout</h4>
          <div className="grid grid-cols-4 gap-2 p-4 bg-surface rounded-lg">
            {widgets.filter(w => w.enabled).map((widget) => {
              const IconComponent = widget.icon;
              return (
                <div
                  key={widget.id}
                  className="aspect-square bg-background rounded border-2 border-border flex items-center justify-center"
                >
                  <IconComponent className="w-4 h-4 text-text-light" />
                </div>
              );
            })}
          </div>
          <p className="text-xs text-text-light mt-2">
            This preview shows how your dashboard widgets will be arranged
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WidgetSettings;