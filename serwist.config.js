/** @type {import('@serwist/next').SerwistNextOptions} */
module.exports = {
  swSrc: "app/sw.ts",        // Source file
  swDest: "public/sw.js",     // Output file
  disable: process.env.NODE_ENV === "development", // Disable PWA in 'dev' mode
};