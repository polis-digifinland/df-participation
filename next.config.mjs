/** @type {import('next').NextConfig} */
const nextConfig = {

  // Output as a standalone app
  output: 'standalone',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  async headers() {
    return [
      {
        // Apply security headers to Next.js optimized font files
        source: '/_next/static/media/:path*.(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Rewrite URL without theme to DigiFinland theme
        source: "/:lang/:zid",
        destination: "/:lang/:zid/df",
      },
    ];
  },
  async redirects() {
    return [
      {
        // Redirect root to DigiFinland website Polis page
        source: "/",
        destination: "https://digifinland.fi/toimintamme/polis-kansalaiskeskustelualusta/",
        permanent: false,
      },
    ];
  },

  compiler: {
    // Remove `console.*` output except `console.error` only in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ["error"],
    } : false,
  },
};

export default nextConfig;
