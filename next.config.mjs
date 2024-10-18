/** @type {import('next').NextConfig} */
const nextConfig = {

  // Output as a standalone app
  output: 'standalone',
  
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  async rewrites() {
     return [
       {
         // Rewrite URL without theme to DigiFinland theme
         source: "/:zid",
         destination: "/:zid/df",
       },
     ];
   },
  
  //compiler: {
  //   //Remove `console.*` output except `console.error`
  //   removeConsole: true,
  //   removeConsole: {
  //    exclude: ["error"],
  //  },
  //},
};

export default nextConfig;
