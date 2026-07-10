/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ─── Cat 10 canonical palette ─── */
        primary: {
          DEFAULT: '#F57C20',
          dark: '#D96A12',
          fold: '#B35A00',
          soft: '#FEF1E7',
        },
        ink: '#0D0F14',        // Deep Charcoal
        slate: '#475467',      // Slate Gray (body / secondary text)
        gray: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E5E7EB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#687280',
        },
        success: '#22C55E',
        info: '#3B82F6',
        warning: '#F59E0B',
        error: '#EF4444',

        /* ─── Backward-compatible aliases (remapped to Cat 10) ─── */
        brand: {
          black: '#0D0F14',
          orange: '#F57C20',
          'orange-dark': '#D96A12',
          'orange-fold': '#B35A00',
          cream: '#F8F9FA',
          muted: '#475467',
          border: '#E5E7EB',
          white: '#FFFFFF',
          surface: '#F1F3F5',
        },
      },
      fontFamily: {
        /* Plus Jakarta Sans everywhere; legacy aliases point to the same var */
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        sora: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        archivo: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        /* Cat 10 type scale */
        'h1': ['3rem', { lineHeight: '3.5rem', fontWeight: '800', letterSpacing: '-0.02em' }],
        'h2': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h3': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600', letterSpacing: '-0.01em' }],
        'h4': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'h5': ['1.125rem', { lineHeight: '1.625rem', fontWeight: '500' }],
        'small': ['0.875rem', { lineHeight: '1.25rem' }],
        /* legacy display sizes retained */
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading': ['2rem', { lineHeight: '1.25' }],
        'subheading': ['1.5rem', { lineHeight: '1.35' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'brand': '16px',   // legacy alias → Cat 10 card radius
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'ds-sm': '0 1px 2px rgba(13,15,20,0.05)',
        'ds-md': '0 4px 12px rgba(13,15,20,0.08)',
        'ds-lg': '0 10px 24px rgba(13,15,20,0.10)',
        'ds-xl': '0 20px 40px rgba(13,15,20,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
