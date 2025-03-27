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
        background: 'rgb(var(--background-end-rgb))',
        foreground: 'rgb(var(--foreground-rgb))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config; 