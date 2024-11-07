import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/_error', '/_app', '/_document', '/_metadata'],
    },
    //sitemap: 'https://polis.digifinland.fi/sitemap.xml',
  }
}