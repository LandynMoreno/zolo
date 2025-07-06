/**
 * Global theme configuration with Zen Browser inspired colors
 * Supports custom user themes and dark/light mode switching
 */

export const THEME_PRESETS = {
  zen: {
    name: 'Zen Browser',
    colors: {
      primary: '#E8A87C',     // Soft orange
      secondary: '#8B9AAF',   // Soft grey-blue
      background: '#FEFCF8',  // Off-white/cream
      surface: '#F5F2ED',     // Warm white
      accent: '#D4B896',      // Warm brown
      text: '#2C3E50',        // Dark grey
      textLight: '#6B7280',   // Light grey
      border: '#E5E7EB',      // Light border
      success: '#10B981',     // Green
      warning: '#F59E0B',     // Amber
      error: '#EF4444',       // Red
      info: '#3B82F6',        // Blue
    }
  },
  
  dark: {
    name: 'Dark Mode',
    colors: {
      primary: '#FF6B4A',     // Vibrant orange
      secondary: '#4A5568',   // Dark grey
      background: '#1A1A1A',  // Dark background
      surface: '#2D2D2D',     // Dark surface
      accent: '#38A169',      // Green accent
      text: '#F7FAFC',        // Light text
      textLight: '#A0AEC0',   // Light grey text
      border: '#4A5568',      // Dark border
      success: '#68D391',     // Light green
      warning: '#F6AD55',     // Light amber
      error: '#FC8181',       // Light red
      info: '#63B3ED',        // Light blue
    }
  },
  
  ocean: {
    name: 'Ocean Breeze',
    colors: {
      primary: '#4299E1',     // Ocean blue
      secondary: '#68D391',   // Mint green
      background: '#F0F8FF',  // Light blue
      surface: '#E6F3FF',     // Soft blue
      accent: '#38B2AC',      // Teal
      text: '#2D3748',        // Dark blue-grey
      textLight: '#4A5568',   // Medium grey
      border: '#CBD5E0',      // Light blue-grey
      success: '#48BB78',     // Green
      warning: '#ED8936',     // Orange
      error: '#E53E3E',       // Red
      info: '#4299E1',        // Blue
    }
  },
  
  sunset: {
    name: 'Sunset Glow',
    colors: {
      primary: '#FF5722',     // Orange-red
      secondary: '#795548',   // Brown
      background: '#FFF8E1',  // Cream
      surface: '#FFECB3',     // Light amber
      accent: '#FF9800',      // Orange
      text: '#3E2723',        // Dark brown
      textLight: '#6D4C41',   // Medium brown
      border: '#FFCC02',      // Golden border
      success: '#8BC34A',     // Light green
      warning: '#FF9800',     // Orange
      error: '#F44336',       // Red
      info: '#2196F3',        // Blue
    }
  }
};

export const DESIGN_TOKENS = {
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  
  transitions: {
    fast: '200ms ease-in-out',
    medium: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  typography: {
    fontFamilies: {
      primary: ['Roboto', 'sans-serif'],
      secondary: ['Poppins', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

/**
 * Default theme configuration
 */
export const DEFAULT_THEME = {
  preset: 'zen',
  colors: THEME_PRESETS.zen.colors,
  darkMode: false,
  autoTheme: false,
  customColors: {},
};

/**
 * Helper function to apply theme to CSS custom properties
 */
export const applyThemeToDocument = (theme) => {
  const root = document.documentElement;
  
  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Apply design tokens
  Object.entries(DESIGN_TOKENS.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });
  
  Object.entries(DESIGN_TOKENS.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });
  
  Object.entries(DESIGN_TOKENS.transitions).forEach(([key, value]) => {
    root.style.setProperty(`--transition-${key}`, value);
  });
  
  Object.entries(DESIGN_TOKENS.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });
  
  // Set theme attribute for CSS selectors
  root.setAttribute('data-theme', theme.preset);
  root.setAttribute('data-dark-mode', theme.darkMode.toString());
};

/**
 * Helper function to generate CSS classes from theme
 */
export const getThemeClasses = (theme) => {
  return {
    bg: {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      surface: 'bg-surface',
      background: 'bg-background',
    },
    text: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      default: 'text-text',
      light: 'text-text-light',
    },
    border: {
      default: 'border-border',
      primary: 'border-primary-500',
      secondary: 'border-secondary-500',
    },
  };
};

/**
 * Accessibility helpers
 */
export const checkColorContrast = (foreground, background) => {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd use a proper contrast ratio formula
  const getRelativeLuminance = (color) => {
    // Convert hex to RGB and calculate relative luminance
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const sRGB = [r, g, b].map(c => 
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };
  
  const l1 = getRelativeLuminance(foreground);
  const l2 = getRelativeLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  return {
    ratio,
    aa: ratio >= 4.5,      // WCAG AA standard
    aaa: ratio >= 7,       // WCAG AAA standard
  };
};