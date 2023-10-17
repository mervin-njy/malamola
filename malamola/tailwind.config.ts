import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#333333", // off-black
        secondary: "#4D6A6D", // tealish
        accent: "#DE8139", // orange
        neutral: "#CA986C", // brown
        background: "#F3EEE1", // off-white
        "logo-bg": "#F2EDDF",
      },
      screens: {
        mobile: "360px", // => @media (min-width: 360px) { ... }
        tablet: "640px", // => @media (min-width: 640px) { ... }
        laptop: "1024px", // => @media (min-width: 1024px) { ... }
        desktop: "1280px", // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        molaTheme: {
          primary: "#333333",
          secondary: "#4D6A6D",
          accent: "#DE8139",
          neutral: "#CA986C",
          "base-100": "#F3EEE1",
        },
      },
    ],
  },
};
export default config;
