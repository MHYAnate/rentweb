// // import { defaultCache } from "@serwist/next/worker";
// // import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
// // import { Serwist } from "serwist";

// // // This declares the type of self as a SerwistGlobalConfig
// // declare global {
// //   interface WorkerGlobalScope extends SerwistGlobalConfig {}
// // }

// // declare const self: ServiceWorkerGlobalScope;

// // // Basic Serwist setup
// // const serwist = new Serwist({
// //   precacheEntries: (self.__SW_MANIFEST_REVISION as unknown as PrecacheEntry[]) || [],
// //   precacheOptions: {
// //     // Ignores search parameters for precached assets
// //     ignoreURLParametersMatching: [/.*/],
// //   },
// //   // DefaultCache handles all the Next.js routes and static assets
// //   // cacheOnNavigation: true,
// //   runtimeCaching: defaultCache,
  
// //   // These are good defaults from Workbox
// //   skipWaiting: true,
// //   clientsClaim: true,
// // });

// // serwist.addEventListeners();

// import { defaultCache } from "@serwist/next/worker";
// import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
// import { Serwist } from "serwist";

// // Declare the standard ServiceWorkerGlobalScope and extend it
// // with Serwist/Workbox's injected properties.
// declare global {
//   interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
//     /**
//      * The array of precache entries injected by Serwist/Workbox.
//      * This is the specific property causing the error.
//      */
//     __SW_MANIFEST_REVISION: PrecacheEntry[] | undefined;
//   }
// }

// // Explicitly use the ServiceWorkerGlobalScope with the extended type
// declare const self: ServiceWorkerGlobalScope;

// const serwist = new Serwist({
//   // Cast self.__SW_MANIFEST_REVISION to the expected PrecacheEntry[]
//   // The 'as unknown as PrecacheEntry[]' is still necessary for type safety 
//   // with how Serwist processes the manifest array.
//   precacheEntries: (self.__SW_MANIFEST_REVISION as unknown as PrecacheEntry[]) || [],
//   precacheOptions: {
//     ignoreURLParametersMatching: [/.*/],
//   },
//   runtimeCaching: defaultCache,
//   skipWaiting: true,
//   clientsClaim: true,
// });

// serwist.addEventListeners();

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// --- FIX for 'Property __SW_MANIFEST_REVISION does not exist' ---
// Extend the global scope with Serwist's injected property
declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST_REVISION: PrecacheEntry[] | undefined;
  }
}

// Explicitly define the self object with the extended type
declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  // Use the correctly typed global variable
  precacheEntries: (self.__SW_MANIFEST_REVISION as unknown as PrecacheEntry[]) || [],
  precacheOptions: {
    ignoreURLParametersMatching: [/.*/],
  },
  // runtimeCaching handles all uncached requests based on defined strategies
  runtimeCaching: defaultCache,
  
  skipWaiting: true,
  clientsClaim: true,
});

serwist.addEventListeners();