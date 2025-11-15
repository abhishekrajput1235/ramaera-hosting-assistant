export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ramaera-blue': '#0ea5e9',
        'ramaera-indigo': '#6366f1',
        'ramaera-light': '#e0f2fe',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'scale-in': 'scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'message-in': 'message-in 0.4s ease-out',
        'typing': 'typing 1.4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'gradient': 'gradient 4s ease infinite',
      },
      keyframes: {
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9) translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        'message-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'typing': {
          '0%, 60%, 100%': {
            transform: 'translateY(0)',
            opacity: '0.6',
          },
          '30%': {
            transform: 'translateY(-8px)',
            opacity: '1',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.5',
          },
          '50%': {
            opacity: '0.8',
          },
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.6',
          },
        },
        'gradient': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
};
