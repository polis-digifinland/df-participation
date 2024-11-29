import type { Config } from "tailwindcss";

const config: Config = {
  content: [
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
      spacing: {
        xl: '40px',
        lg: '32px',
        md: '24px',
        sm: '16px',
        xs: '12px',
        xxs: '8px',
        xxxs:'4px',
      },
      colors: {
        'primary': "var(--text-primary)",
        'placeholder': "var(--text-placeholder)",
        'invert': "var(--text-invert)",
        'error': "var(--text-error)",
        'footer': "var(--text-footer)",
        'theme-surface-primary': "var(--surface-primary)",
        'theme-surface-secondary': "var(--surface-secondary)",
        'theme-surface-brand': "var(--surface-brand)",
        'theme-surface-card-1': "var(--surface-card-1)",
        'theme-surface-card-2': "var(--surface-card-2)",
        'theme-surface-card-3': "var(--surface-card-3)",
        'theme-surface-card-4': "var(--surface-card-4)",
        'theme-surface-graph-primary': "var(--surface-graph-primary)",
        'theme-surface-graph-secondary': "var(--surface-graph-secondary)",
        'theme-border-primary': "var(--border-primary)",
        'theme-border-error': "var(--border-error)",
        'theme-logo-primary': "var(--logo-primary)",
        'theme-logo-secondary': "var(--logo-secondary)",
        'theme-footer-background': "var(--footer-background)",
        'theme-progress-bar': "var(--progress-bar)",
        'theme-progress-background': "var(--progress-background)",
        'theme-modal-background': "var(--modal-background)",
      },
    },
  },
  plugins: [],
};
export default config;

