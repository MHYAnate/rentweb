// import webpush, { PushSubscription as WebPushSubscription } from 'web-push';

// // This file is PURELY for server-side logic.
// // It will never be imported into a client component.

// if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
//   console.error('VAPID keys are not defined in environment variables.');
// }

// webpush.setVapidDetails(
//   'mailto:mhibnyusufanate@gmail.com',
//   process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
//   process.env.VAPID_PRIVATE_KEY!
// );

// // In a real app, you would use a database (e.g., Redis, PostgreSQL) instead of an in-memory variable.
// let savedSubscription: WebPushSubscription | null = null;

// export function storeSubscription(sub: WebPushSubscription): { success: boolean } {
//   savedSubscription = sub;
//   console.log('Subscription stored on server.');
//   return { success: true };
// }

// export function clearSubscription(): { success: boolean } {
//   savedSubscription = null;
//   console.log('Subscription cleared on server.');
//   return { success: true };
// }

// export async function sendPushNotification(message: string): Promise<{ success: boolean, error?: string }> {
//   if (!savedSubscription) {
//     console.error('Cannot send notification, no subscription available.');
//     return { success: false, error: 'No subscription available' };
//   }

//   try {
//     await webpush.sendNotification(
//       savedSubscription,
//       JSON.stringify({
//         title: 'RentWeb Notification',
//         body: message,
//         icon: '/favicon-16x16.png',
//       })
//     );
//     console.log('Notification sent successfully.');
//     return { success: true };
//   } catch (error) {
//     // Handle expired subscriptions
//     if (error instanceof Error && 'statusCode' in error && error.statusCode === 410) {
//       console.log('Subscription expired, removing.');
//       clearSubscription();
//     } else {
//       console.error('Error sending push notification:', error);
//     }
//     return { success: false, error: 'Failed to send notification' };
//   }
// }