// // // // 'use server'
 
// // // // import webpush from 'web-push'
 
// // // // webpush.setVapidDetails(
// // // //   // '<mailto:your-email@example.com>',
// // // //   'mailto:mhibnyusufanate@gmail.com',
// // // //   process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
// // // //   process.env.VAPID_PRIVATE_KEY!
// // // // )
 
// // // // let subscription: webpush.PushSubscription | null = null
 
// // // // export async function subscribeUser(sub: PushSubscription) {
// // // //   subscription = {
// // // //     endpoint: sub.endpoint,
// // // //     expirationTime: sub.expirationTime,
// // // //     keys: {
// // // //       p256dh: sub.getKey('p256dh') ? Buffer.from(sub.getKey('p256dh')!).toString('base64') : '',
// // // //       auth: sub.getKey('auth') ? Buffer.from(sub.getKey('auth')!).toString('base64') : '',
// // // //     },
// // // //   }
// // // //   // In a production environment, you would want to store the subscription in a database
// // // //   // For example: await db.subscriptions.create({ data: sub })
// // // //   return { success: true }
// // // // }
 
// // // // export async function unsubscribeUser() {
// // // //   subscription = null
// // // //   // In a production environment, you would want to remove the subscription from the database
// // // //   // For example: await db.subscriptions.delete({ where: { ... } })
// // // //   return { success: true }
// // // // }
 
// // // // export async function sendNotification(message: string) {
// // // //   if (!subscription) {
// // // //     throw new Error('No subscription available')
// // // //   }
 
// // // //   try {
// // // //     await webpush.sendNotification(
// // // //       subscription,
// // // //       JSON.stringify({
// // // //         title: 'Test Notification',
// // // //         body: message,
// // // //         icon: '/plogo.png',
// // // //       })
// // // //     )
// // // //     return { success: true }
// // // //   } catch (error) {
// // // //     console.error('Error sending push notification:', error)
// // // //     return { success: false, error: 'Failed to send notification' }
// // // //   }
// // // // }

// // // 'use server'
 
// // // import webpush from 'web-push'
 
// // // webpush.setVapidDetails(
// // //   'mailto:mhibnyusufanate@gmail.com',
// // //   process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
// // //   process.env.VAPID_PRIVATE_KEY!
// // // )
 
// // // let subscription: PushSubscription | null = null
 
// // // export async function subscribeUser(sub: PushSubscription) {
// // //   subscription = sub
// // //   // In a production environment, you would want to store the subscription in a database
// // //   // For example: await db.subscriptions.create({ data: sub })
// // //   return { success: true }
// // // }
 
// // // export async function unsubscribeUser() {
// // //   subscription = null
// // //   // In a production environment, you would want to remove the subscription from the database
// // //   // For example: await db.subscriptions.delete({ where: { ... } })
// // //   return { success: true }
// // // }
 
// // // export async function sendNotification(message: string) {
// // //   if (!subscription) {
// // //     throw new Error('No subscription available')
// // //   }
 
// // //   try {
// // //     await webpush.sendNotification(
// // //       subscription,
// // //       JSON.stringify({
// // //         title: 'Test Notification',
// // //         body: message,
// // //         icon: '/favicon-16x16.png',
// // //       })
// // //     )
// // //     return { success: true }
// // //   } catch (error) {
// // //     console.error('Error sending push notification:', error)
// // //     return { success: false, error: 'Failed to send notification' }
// // //   }
// // // }

// // // 'use server'

// // import webpush, { PushSubscription as WebPushSubscription } from 'web-push'

// // // Type check: Ensure environment variables are strings. 
// // // The '!' non-null assertion is okay here if you've set them up in your .env,
// // // but a runtime check is safer for production.
// // if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
// //   throw new Error('VAPID keys must be defined in environment variables.');
// // }

// // webpush.setVapidDetails(
// //   'mailto:mhibnyusufanate@gmail.com',
// //   process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
// //   process.env.VAPID_PRIVATE_KEY
// // )

// // // This variable will hold the subscription object that is compatible with the web-push library.
// // // We use the imported and aliased type to be explicit.
// // let subscription: WebPushSubscription | null = null

// // /**
// //  * Stores the user's subscription object.
// //  * The 'sub' parameter should be the result of calling .toJSON() on the
// //  * PushSubscription object from the browser.
// //  */
// // export async function subscribeUser(sub: WebPushSubscription) {
// //   // Now the 'sub' parameter is correctly typed, matching what web-push expects.
// //   subscription = sub
// //   console.log('User subscribed:', subscription);
// //   // In a production environment, you would save this 'sub' object to your database.
// //   // For example: await db.subscriptions.create({ data: sub })
// //   return { success: true }
// // }

// // /**
// //  * Clears the stored subscription.
// //  */
// // export async function unsubscribeUser() {
// //   subscription = null
// //   console.log('User unsubscribed.');
// //   // In a production environment, you would remove the subscription from the database.
// //   // For example: await db.subscriptions.delete({ where: { endpoint: ... } })
// //   return { success: true }
// // }

// // /**
// //  * Sends a push notification to the stored subscription.
// //  */
// // export async function sendNotification(message: string) {
// //   if (!subscription) {
// //     console.error('Cannot send notification, no subscription available.');
// //     throw new Error('No subscription available')
// //   }

// //   try {
// //     console.log('Sending notification to:', subscription.endpoint);
// //     await webpush.sendNotification(
// //       subscription, // This now has the correct type.
// //       JSON.stringify({
// //         title: 'RentWeb Notification',
// //         body: message,
// //         icon: '/favicon-16x16.png', // Make sure this icon is in your /public folder
// //       })
// //     )
// //     console.log('Notification sent successfully.');
// //     return { success: true }
// //   } catch (error) {
// //     // If the subscription is expired or invalid, the push service will return an error.
// //     // You should handle this by removing the subscription from your database.
// //     if (error instanceof Error && 'statusCode' in error && error.statusCode === 410) {
// //       console.log('Subscription has expired or is no longer valid. Unsubscribing user.');
// //       await unsubscribeUser();
// //     } else {
// //       console.error('Error sending push notification:', error)
// //     }
// //     return { success: false, error: 'Failed to send notification' }
// //   }
// // }
// 'use server';

// // Import the specific type from 'web-push'. Type-only imports are safe
// // because they are erased at compile time and don't create a runtime dependency.
// import type { PushSubscription as WebPushSubscription } from 'web-push';

// /**
//  * Stores the user's subscription.
//  * This function dynamically imports the server-only logic, ensuring it's never
//  * bundled on the client.
//  */
// export async function subscribeUser(sub: WebPushSubscription) {
//   // Dynamically import the implementation ONLY when the action is executed.
//   const { storeSubscription } = await import('@/lib/notifications'); // Adjust path if needed
//   return storeSubscription(sub);
// }

// /**
//  * Clears the stored subscription.
//  */
// export async function unsubscribeUser() {
//   const { clearSubscription } = await import('@/lib/notifications'); // Adjust path if needed
//   return clearSubscription();
// }

// /**
//  * Sends a push notification to the stored subscription.
//  */
// export async function sendNotification(message: string) {
//   const { sendPushNotification } = await import('@/lib/notifications'); // Adjust path if needed
//   return sendPushNotification(message);
// }

'use server'
 
import webpush from 'web-push'
 
webpush.setVapidDetails(
  'mailto:mhibnyusufanate@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)
 
let subscription: webpush.PushSubscription | null = null
 
export async function subscribeUser(sub: PushSubscription) {
  subscription = {
    endpoint: sub.endpoint,
    expirationTime: sub.expirationTime,
    keys: {
      p256dh: sub.getKey('p256dh') ? Buffer.from(sub.getKey('p256dh')!).toString('base64') : '',
      auth: sub.getKey('auth') ? Buffer.from(sub.getKey('auth')!).toString('base64') : '',
    },
  }
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true }
}
 
export async function unsubscribeUser() {
  subscription = null
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}
 
export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }
 
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/icon.png',
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}