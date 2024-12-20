# DigiFinland Polis participation

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/[id]/df/page.tsx`. 
The page auto-updates as you edit the file. 
Only the DigiFinland theme's `page.tsx` should be manually edited; others will be copied from it.

## Building and running the Project

This project is meant to be part of a Polis-DigiFinland deployment.
For more information on how to build and run the project, please refer to the [Polis-DigiFinland documentation](https://github.com/polis-digifinland/polis-digifinland).

## Theming

Themes are determined by the last folder in the URL. For example, `/df` refers to the DigiFinland theme. To create a new theme, follow these steps:

1. Create a new folder for the theme.
2. Update the `scripts/copy-pages.sh` script to include the new theme.

Each theme folder should contain two files: `page.tsx` and `theme.css`. The `page.tsx` file is identical across all themes, df folder `page.tsx` is used as the source for copying by the script, while `theme.css` contains theme-specific definitions for colors, fonts, etc.

### Color Customization

Color changes do not require code modifications. The following files manage color definitions:

- `global.css`: Defines color names and hex codes.
- `[locale]/[id]/THEME/theme.css`: Specifies the colors used by the theme.
- `tailwind.config.ts`: Converts color names from `theme.css` into Tailwind CSS variables.
- Tailwind CSS variables are then used throughout the code.

By following this structure, you can easily manage and customize themes without altering the codebase.
Themes are explained more in detail in the brandbook.

### Internationalization

Translations are made for Finnish, Swedish, and English. The translation files are located in the `src/app/locales` directory. For example:
- `src/app/locales/fi/common.json` for Finnish
- `src/app/locales/sv/common.json` for Swedish
- `src/app/locales/en/common.json` for English

