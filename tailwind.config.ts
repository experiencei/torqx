// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: {
//         DEFAULT: "1rem",
//         md: "2rem",
//         lg: "4rem",
//       },
//     },
//     extend: {
//       colors: {
//         brand: {
//           green: "#C6FE1E",   // Accent / highlight
//           blue: "#1264FF",    // Primary brand blue
//           dark: "#0D0D0D",    // Deep dark background
//           light: "#F6F7F9",   // Light gray background
//           white: "#FFFFFF",   // White
//           "red-orange": {
//             500: 'color-mix(in srgb, theme("colors.red.500") 50%, theme("colors.orange.500") 50%',
//          },
//         },
//       },
//       fontFamily: {
//         sans: ["Hanken Grotesk", "sans-serif"],
//       },
//       screens: {
//         sm: "375px",
//         md: "768px",
//         lg: "1200px",
//       },
//       animation: {
//         'ping-large': "ping-large 1s ease-in-out infinite",
//         'move-left' : 'move-left 1s linear infinite',
//         'move-right' : 'move-right 1s linear infinite',
//       },
//       keyframes: {
//         'ping-large': {
//           '75% , 100%': {
//             transform: 'scale(3)',
//             opacity: '0',
//           },
//         },

//         'move-left': {
//             '0%' : {
//               transform : 'translateX(0%)',
//             },
//             '100%' : {
//               transform : 'translateX(-50%)',
//             }
//         },
//         'move-right': {
//             '0%' : {
//               transform : 'translateX(-50%)',
//             },
//             '100%' : {
//               transform : 'translateX(0%)',
//             }
//         }
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;

/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/registry/**/*.{js,ts,jsx,tsx,mdx}", // if you use shadcn/ui registry
  ],
  theme: {
    // container: {
    //   center: true,
    //   padding: {
    //     DEFAULT: "1rem",
    //     md: "2rem",
    //     lg: "4rem",
    //   },
    // },
    extend: {
    
      // colors: {
      //   brand: {
      //     green: "#C6FE1E",   // Accent / highlight
      //     blue: "#1264FF",    // Primary brand blue
      //     dark: "#0D0D0D",    // Deep dark background
      //     light: "#F6F7F9",   // Light gray background
      //     white: "#FFFFFF",   // White
      
      //     redorange: "#FF5722", // define a hex for "red-orange"
      //   },
      // },
      fontFamily: {
        sans: ["Hanken Grotesk", "sans-serif"],
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1200px",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        'ping-large': "ping-large 1s ease-in-out infinite",
        'move-left': 'move-left 1s linear infinite',
        'move-right': 'move-right 1s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        'ping-large': {
          '75%, 100%': {
            transform: 'scale(3)',
            opacity: '0',
          },
        },
        'move-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'move-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
