/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Telemons Brand Colors
        telemons: {
          blue: {
            50: '#f0f4f8',
            100: '#d9e2ec',
            200: '#bcccdc',
            300: '#9fb3c8',
            400: '#829ab1',
            500: '#627d98',
            600: '#486581',
            700: '#334e68',
            800: '#2d3748',
            900: '#1a202c',
            primary: '#144F89', // Yale Blue
            dark: '#0f3a6b',
            light: '#1e5ba3'
          },
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
            primary: '#F58320', // Princeton Orange
            dark: '#e67300',
            light: '#ff9933'
          }
        },
        // Legacy support
        primary: '#144F89',
        'primary-dark': '#0f3a6b',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // Custom gradients for Telemons brand
      backgroundImage: {
        'telemons-gradient': 'linear-gradient(135deg, #144F89 0%, #F58320 100%)',
        'telemons-gradient-blue': 'linear-gradient(135deg, #144F89 0%, #1e5ba3 100%)',
        'telemons-gradient-orange': 'linear-gradient(135deg, #F58320 0%, #ff9933 100%)',
        'telemons-gradient-subtle': 'linear-gradient(135deg, #f0f4f8 0%, #fff7ed 100%)',
      },
      // Custom animations
      animation: {
        'telemons-pulse': 'telemons-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'telemons-bounce': 'telemons-bounce 1s infinite',
      },
      keyframes: {
        'telemons-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        'telemons-bounce': {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
      },
    },
  },
  plugins: [],
} 