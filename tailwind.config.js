/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },

      letterSpacing: {
        tighter: '-0.025em',
        tight: '-0.015em',
        normal: '0.18px',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },

      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        DEFAULT: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },

      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}