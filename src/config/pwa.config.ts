// PWA configuration
export const pwaConfig = {
  name: "Properties point 1",
  shortName: 'Ppoint1',
  description: "Premium Property Platform",
  backgroundColor: '#ffffff',
  themeColor: '#000000',
  display: 'standalone',
  scope: '/',
  startUrl: '/',
  icons: [
    {
      src: '/image/plogo.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable'
    },
    {
      src: '/image/plogo.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};

