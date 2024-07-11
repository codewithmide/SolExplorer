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
        whiteBg: "#f5f5f5",
        "white-primary": "#007bff",
        "white-secondary": "#ffc107",
        "white-text": "#333",
        darkBg: "#182F47",
        "dark-primary": "#007bff",
        "dark-secondary": "#ffc107",
        "dark-text": "#fff",
        overlay: "#00000033",
        success: "#027A48",
        "success-secondary": "#ECFDF3",
        failed: "#B42318",
        "failed-secondary": "#FEF3F2",
        outline: "#E7EFFF",
        "table-head": "#EAECF0",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
