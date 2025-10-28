// // import type { NextConfig } from "next";


// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// // export default nextConfig;

// // Import withSerwistInit (a pattern commonly used when the default export
// // needs to be initialized first).
// import withSerwistInit from "@serwist/next";
// import type { NextConfig } from "next";

// // 1. Define the Serwist options *outside* the NextConfig object.
// // The swSrc and swDest properties are required here.
// const withSerwist = withSerwistInit({
//   // These are the Serwist options that TypeScript was complaining were missing
//   swSrc: "app/sw.ts",
//   swDest: "public/sw.js",
//   disable: process.env.NODE_ENV === "development",
//   // You can also add your custom runtimeCaching here if you prefer a single config file
//   // cacheOnNavigation: true, // You can leave this out if you use serwist.config.ts
// });

// /** @type {import('next').NextConfig} */
// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   // ... your other next.js options
// };

// // 2. Export the result of wrapping the Next.js config with the initialized withSerwist.
// // This is the correct argument order and usage.
// export default withSerwist(nextConfig);

// Import withSerwistInit (the default export)
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

// 1. Initialize the withSerwist wrapper with Serwist-specific options
const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  // Optional: Set to false if you handle navigation caching manually in sw.ts/serwist.config.ts
  cacheOnNavigation: true, 
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // reactStrictMode is OPTIONAL, but good practice
  reactStrictMode: true, 
  // ... your other Next.js configuration settings
};

// 2. Wrap and export your Next.js configuration
export default withSerwist(nextConfig);