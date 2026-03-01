import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a5f',
          dark: '#1e3a5f',
          light: '#2f5b8a',
          50: '#e8eef5',
          100: '#c5d4e8',
          200: '#9fb8d9',
          300: '#799cc9',
          400: '#5c87be',
          500: '#1e3a5f',
          600: '#1e3a5f',
          700: '#182f4d',
          800: '#12243a',
          900: '#0c1828',
        },
        steel: '#2f5b8a',
        gray: {
          light: '#f3f4f6',
          medium: '#6b7280',
        },
        accent: {
          red: '#b91c1c',
          'red-hover': '#991b1b',
        },
        brand: {
          black: '#111111',
          white: '#ffffff',
          whatsapp: '#25D366',
          telegram: '#0088cc',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
