import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      'base':   '1.000rem', /* 16px */
      'xl':     '1.250rem', /* 20px */
      '2xl':    '1.438rem', /* 23px */
      '3xl':    '1.624rem', /* 26px */
    },
    extend: {
      fontFamily: {
        tthoves: ['var(--font-tt-hoves)'],
        dmserif: ['var(--font-dm-serif)'],
        raleway: ['var(--font-raleway)'],
      },
      colors: {
        'primary': "var(--text-primary)",
        'placeholder': "var(--text-placeholder)",
        'invert': "var(--text-invert)",
        'theme-surface-primary': "var(--surface-primary)",
        'theme-surface-brand': "var(--surface-brand)",
        'theme-surface-card-1': "var(--surface-card-1)",
        'theme-surface-card-2': "var(--surface-card-2)",
        'theme-surface-card-3': "var(--surface-card-3)",
        'theme-surface-card-4': "var(--surface-card-4)",
        'theme-surface-graph-primary': "var(--surface-graph-primary)",
        'theme-surface-graph-secondary': "var(--surface-graph-secondary)",
        'theme-border-primary': "var(--border-primary)",
      },
    },
  },
  plugins: [],
};
export default config;
