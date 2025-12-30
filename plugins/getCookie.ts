// plugins/getCookie.ts
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("getCookie", (cookieName: string) => {
    // Access cookies securely (adapted from responses A and B)
    const cookieValue = document.cookie
      .split("; ")
      .find((pair) => pair.startsWith(`${cookieName}=`))
      ?.split("=")[1];

    if (cookieValue) {
      // Decode cookie value if necessary (adapted from response B)
      try {
        return decodeURIComponent(cookieValue);
      } catch (error) {
        console.error("Error decoding cookie:", error);
        return cookieValue; // Return raw value if decoding fails
      }
    } else {
      return null; // Cookie not found
    }
  });
});

// export default function getCookie(cookieName: string) {
//     const cookieValue = document.cookie.split('; ')
//       .find((pair) => pair.startsWith(`${cookieName}=`))
//       ?.split('=')[1];

//     if (cookieValue) {
//       // Decode cookie value if necessary (adapted from response B)
//       try {
//         return decodeURIComponent(cookieValue);
//       } catch (error) {
//         console.error('Error decoding cookie:', error);
//         return cookieValue; // Return raw value if decoding fails
//       }
//     } else {
//       return null; // Cookie not found
//     }
// }
