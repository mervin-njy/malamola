import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla"],
      },
      colors: {
        primary: "#333333", // off-black
        secondary: "#4D6A6D", // tealish
        accent: "#DE8139", // orange
        neutral: "#CA986C", // brown
        background: "#F3EEE1", // off-white
        "logo-bg": "#F2EDDF",
      },
      screens: {
        mobile: "360px", // => @media (min-width: 360px) { ... } => change to 768px for mobile-first
        tablet: "720px", // => @media (min-width: 640px) { ... } => change to 1024px for tablet
        laptop: "1024px", // => @media (min-width: 1366px) { ... }
        desktop: "1366px", // => @media (min-width: 1920px) { ... }
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        molaTheme: {
          primary: "#333333",
          secondary: "#4d6a6d",
          accent: "#de8139",
          neutral: "#ca986c",
          "base-100": "#f3eee1",
          info: "#A1BBE3",
          success: "#39B986",
          warning: "#ECE17F",
          error: "#F47878",
        },
      },
    ],
  },
};
export default config;
