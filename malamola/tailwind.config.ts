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
        "off-black": "333333",
        "tealish-blue": "4D6A6D",
        "accent-orange": "DE8139",
        "brownish-orange": "CA986C",
        "off-white": "F3EEE1",
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
};
export default config;
