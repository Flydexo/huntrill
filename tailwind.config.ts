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
        paper: "#F5F5F5",
        carbon: "#1A1A1A",
        signal: "#FF5F00",
        concrete: "#A0A0A0",
        night: "#0D1117",
      },
    },
  },
  plugins: [],
};

export default config;
