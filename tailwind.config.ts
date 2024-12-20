import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ui-main-background": "var(--background)",
        "ui-main-foreground": "var(--foreground)",
        "ui-card": "#1b1c30",
        "ui-accent-primary": "#252740",
        "ui-accent-secondary": "#1F2037",
        "tx-primary": "#FBFBFB",
        "tx-secondary": "#8283A3",
      },
    },
  },
  daisyui: {
    themes: ["night", "dim"],
  },
  plugins: [require("daisyui")],
} satisfies Config;
