import React, { useState } from 'react';
import { Moon, Sun, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeSettings = ({ theme, presets, actions, onApiCall }) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const handlePresetChange = (presetKey) => {
    actions.setPreset(presetKey);
    setIsCustomMode(false);
    setHasUnsavedChanges(false);
    onApiCall(`Would be calling API_ROUTE="/api/settings/theme/preset" for setting theme preset to ${presetKey}`);
  };

  const handleCustomColorChange = (colorKey, value) => {
    actions.setCustomColor(colorKey, value);
    setIsCustomMode(true);
    setHasUnsavedChanges(true);
  };

  const handleSaveCustomColors = () => {
    setHasUnsavedChanges(false);
    onApiCall('Would be calling API_ROUTE="/api/settings/theme/custom-save" for saving custom color scheme');
  };

  const handleDarkModeToggle = () => {
    actions.toggleDarkMode();
    onApiCall(`Would be calling API_ROUTE="/api/settings/theme/dark-mode" for ${theme.darkMode ? 'disabling' : 'enabling'} dark mode`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="card">
        
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {theme.darkMode ? <Moon size={20} /> : <Sun size={20} />}
            <span className="font-medium">Dark Mode</span>
          </div>
          <button
            onClick={handleDarkModeToggle}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              theme.darkMode ? 'bg-primary-500' : 'bg-border'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                theme.darkMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {/* Theme Selection Mode */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Theme Selection</h4>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setIsCustomMode(false)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                !isCustomMode 
                  ? 'border-primary-500 bg-primary-500/10 text-primary-500' 
                  : 'border-border hover:border-primary-500/50'
              }`}
            >
              Preset Themes
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isCustomMode 
                  ? 'border-primary-500 bg-primary-500/10 text-primary-500' 
                  : 'border-border hover:border-primary-500/50'
              }`}
            >
              Custom Colors
            </button>
          </div>

          {!isCustomMode && (
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => handlePresetChange(key)}
                  className={`p-4 rounded-lg border transition-colors ${
                    theme.preset === key && !isCustomMode
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-border hover:border-primary-500/50'
                  }`}
                >
                  <div className="flex gap-2 mb-2">
                    {['primary', 'secondary', 'accent'].map((colorKey) => (
                      <div
                        key={colorKey}
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.colors[colorKey] }}
                      />
                    ))}
                  </div>
                  <div className="font-medium text-sm">{preset.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Custom Colors */}
        {isCustomMode && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Custom Colors</h4>
              {hasUnsavedChanges && (
                <button
                  onClick={handleSaveCustomColors}
                  className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  <Save className="w-3 h-3" />
                  Save Colors
                </button>
              )}
            </div>
            
            {hasUnsavedChanges && (
              <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  You have unsaved color changes. Click "Save Colors" to apply them.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {['primary', 'secondary', 'accent', 'background'].map((colorKey) => (
                <div key={colorKey} className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={theme.colors[colorKey]}
                      onChange={(e) => handleCustomColorChange(colorKey, e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 cursor-pointer"
                      style={{ 
                        borderColor: 'var(--color-border)',
                        backgroundColor: theme.colors[colorKey]
                      }}
                    />
                    <div 
                      className="absolute inset-1 rounded-md ring-2 ring-white/20"
                      style={{ backgroundColor: theme.colors[colorKey] }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium capitalize">{colorKey}</div>
                    <div className="text-sm text-text-light font-mono">{theme.colors[colorKey].toUpperCase()}</div>
                    <input
                      type="text"
                      value={theme.colors[colorKey]}
                      onChange={(e) => handleCustomColorChange(colorKey, e.target.value)}
                      className="text-xs bg-surface border border-border rounded px-2 py-1 mt-1 w-full font-mono"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ThemeSettings;