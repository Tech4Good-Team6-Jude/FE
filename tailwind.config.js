/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFA800',
          bg: '#FFF3E0',
          dark: '#E36F00',
        },
        success: {
          DEFAULT: '#00C471',
          bg: '#E7F9F1',
        },
        warning: {
          DEFAULT: '#FF9500',
          bg: '#FFF3E0',
        },
        danger: {
          DEFAULT: '#F04452',
          bg: '#FDECEC',
        },
        gray: {
          900: '#191F28',
          700: '#4E5968',
          600: '#6B7684',
          500: '#8B95A1',
          400: '#B0B8C1',
          300: '#D1D6DB',
          200: '#E5E8EB',
          100: '#F2F4F6',
          50: '#F9FAFB',
        },
        mascot: {
          yolk: '#FFD54A',
          beak: '#FF8A00',
          blush: '#FF9E7A',
        },
        surface: {
          canvas: '#FFFAF2',
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      boxShadow: {
        card: '0 4px 10px rgb(114 94 75 / 10%)',
        floating: '0 6px 16px rgb(25 31 40 / 16%)',
      },
      fontFamily: {
        sans: 'Pretendard',
      },
      fontSize: {
        'home-hero': ['46px', { lineHeight: '56px', letterSpacing: '-1px' }],
        'home-greeting': ['27px', { lineHeight: '36px', letterSpacing: '-0.4px' }],
        'feature-title': ['26px', { lineHeight: '34px', letterSpacing: '-0.4px' }],
        'feature-description': ['20px', { lineHeight: '28px', letterSpacing: '-0.2px' }],
        'feature-action': ['20px', { lineHeight: '28px' }],
        display: ['28px', { lineHeight: '36px', letterSpacing: '-0.6px' }],
        title: ['22px', { lineHeight: '30px', letterSpacing: '-0.4px' }],
        heading: ['19px', { lineHeight: '28px', letterSpacing: '-0.3px' }],
        subtitle: ['17px', { lineHeight: '24px', letterSpacing: '-0.2px' }],
        body: ['16px', { lineHeight: '24px', letterSpacing: '-0.1px' }],
        label: ['14px', { lineHeight: '20px' }],
        caption: ['13px', { lineHeight: '18px' }],
      },
    },
  },
  plugins: [],
};
