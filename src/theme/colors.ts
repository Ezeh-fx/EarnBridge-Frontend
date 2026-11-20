/**
 * Design system color tokens
 * Based on the Enbridge design theme
 */

export const colors = {
  // Primary brand color
  primary: {
    DEFAULT: '#16A34A',
    light: '#22C55E',
    dark: '#16A34A',
  },

  // Text colors
  text: {
    DEFAULT: '#4B5563',
    heading: '#111827',
    muted: '#6B7280',
  },

  // Background colors
  background: {
    DEFAULT: '#ffffff',
    secondary: 'rgba(229, 231, 235, 0.35)',
    tertiary: 'rgba(229, 231, 235, 0.5)',
  },

  // Border colors
  border: {
    DEFAULT: '#E5E7EB',
    light: '#E5E7EB',
  },

  // Accent colors
  accent: {
    DEFAULT: '#16A34A',
    background: '#DCFCE7',
    border: '#86EFAC',
  },

  // Semantic colors
  success: '#16A34A',
  warning: '#EAB308',
  error: '#DC2626',
  info: '#2563EB',
} as const;
