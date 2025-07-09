import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  THEME_PRESETS, 
  DEFAULT_THEME, 
  applyThemeToDocument 
} from '../constants/theme';

// Theme context
const ThemeContext = createContext();

// Theme actions
const THEME_ACTIONS = {
  SET_PRESET: 'SET_PRESET',
  SET_CUSTOM_COLOR: 'SET_CUSTOM_COLOR',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_AUTO_THEME: 'SET_AUTO_THEME',
  RESET_THEME: 'RESET_THEME',
  LOAD_SAVED_THEME: 'LOAD_SAVED_THEME',
};

// Theme reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTIONS.SET_PRESET:
      return {
        ...state,
        preset: action.payload,
        colors: {
          ...THEME_PRESETS[action.payload].colors,
          ...state.customColors,
        },
      };
      
    case THEME_ACTIONS.SET_CUSTOM_COLOR:
      const newCustomColors = {
        ...state.customColors,
        [action.payload.key]: action.payload.value,
      };
      return {
        ...state,
        customColors: newCustomColors,
        colors: {
          ...state.colors,
          [action.payload.key]: action.payload.value,
        },
      };
      
    case THEME_ACTIONS.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
        autoTheme: false,
      };
      
    case THEME_ACTIONS.SET_AUTO_THEME:
      return {
        ...state,
        autoTheme: action.payload,
        darkMode: action.payload ? detectSystemDarkMode() : state.darkMode,
      };
      
    case THEME_ACTIONS.RESET_THEME:
      return {
        ...DEFAULT_THEME,
        colors: THEME_PRESETS[DEFAULT_THEME.preset].colors,
      };
      
    case THEME_ACTIONS.LOAD_SAVED_THEME:
      return {
        ...state,
        ...action.payload,
      };
      
    default:
      return state;
  }
};

// Detect system dark mode preference
const detectSystemDarkMode = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Load saved theme from localStorage
const loadSavedTheme = () => {
  try {
    const saved = localStorage.getItem('zolo-theme');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_THEME,
        ...parsed,
        colors: {
          ...THEME_PRESETS[parsed.preset || DEFAULT_THEME.preset].colors,
          ...parsed.customColors,
        },
      };
    }
  } catch (error) {
    console.warn('Failed to load saved theme:', error);
  }
  return {
    ...DEFAULT_THEME,
    colors: THEME_PRESETS[DEFAULT_THEME.preset].colors,
  };
};

// Save theme to localStorage
const saveTheme = (theme) => {
  try {
    const toSave = {
      preset: theme.preset,
      darkMode: theme.darkMode,
      autoTheme: theme.autoTheme,
      customColors: theme.customColors,
    };
    localStorage.setItem('zolo-theme', JSON.stringify(toSave));
  } catch (error) {
    console.warn('Failed to save theme:', error);
  }
};

/**
 * Theme Provider Component
 */
export const ThemeProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(themeReducer, null, loadSavedTheme);

  // Apply theme to document when theme changes
  useEffect(() => {
    applyThemeToDocument(theme);
    saveTheme(theme);
  }, [theme]);

  // Handle system theme changes when auto-theme is enabled
  useEffect(() => {
    if (!theme.autoTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      dispatch({
        type: THEME_ACTIONS.SET_AUTO_THEME,
        payload: true,
      });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme.autoTheme]);

  // Theme actions
  const setPreset = (preset) => {
    if (THEME_PRESETS[preset]) {
      dispatch({ type: THEME_ACTIONS.SET_PRESET, payload: preset });
    }
  };

  const setCustomColor = (key, value) => {
    dispatch({
      type: THEME_ACTIONS.SET_CUSTOM_COLOR,
      payload: { key, value },
    });
  };

  const toggleDarkMode = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_DARK_MODE });
  };

  const setAutoTheme = (enabled) => {
    dispatch({ type: THEME_ACTIONS.SET_AUTO_THEME, payload: enabled });
  };

  const resetTheme = () => {
    dispatch({ type: THEME_ACTIONS.RESET_THEME });
  };

  // Context value
  const value = {
    theme,
    presets: THEME_PRESETS,
    actions: {
      setPreset,
      setCustomColor,
      toggleDarkMode,
      setAutoTheme,
      resetTheme,
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Hook for theme-aware styling
 */
export const useThemedStyles = () => {
  const { theme } = useTheme();
  
  return {
    colors: theme.colors,
    getColor: (colorKey) => theme.colors[colorKey] || colorKey,
    isDark: theme.darkMode,
    isAuto: theme.autoTheme,
    
    // Common style generators
    cardStyle: {
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      borderColor: theme.colors.border,
    },
    
    buttonStyle: (variant = 'primary') => ({
      backgroundColor: theme.colors[variant],
      color: variant === 'primary' ? '#ffffff' : theme.colors.text,
    }),
    
    inputStyle: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      color: theme.colors.text,
    },
  };
};

export default useTheme;