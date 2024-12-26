import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Calendar',
    short_name: 'Calendar',
    description: 'A minimal calendar app',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-500x500.png',
        sizes: '500x500',
        type: 'image/png',
      }
    ],
  }
}