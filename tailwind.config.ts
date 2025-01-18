/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"], // Keep this one
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-down": "slideDown 0.3s ease-out",
      },
      colors: {
   
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        darkMainBg: "#111827", 
        darkPrimaryBg:"#1E293B",
        darkButtonBg:"#313d4a",

      },
 
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "20px": "20px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addComponents }) {
      addComponents({
        // Light mode (default)
        ".table-container": {
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#D8ECFD #f5f5f5",
          "&::-webkit-scrollbar": {
            width: "8px",
            borderRadius: "20px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f5f5f5",
            borderRadius: "20px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#D8ECFD",
            borderRadius: "20px",
            border: "2px solid #f5f5f5",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#D8ECFD",
          },
        },
    
        // Dark mode
        ".dark .table-container": {
          scrollbarWidth: "thin",
          scrollbarColor: "#2C3E50 #34495E",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2C3E50",
            borderRadius: "20px",
            border: "2px solid #34495E",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#34495E",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#2C3E50",
          },
        },
    
        // Sidebar Light mode (default)
        ".sidebar-container": {
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#D8ECFD #f5f5f5",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#D8ECFD",
            borderRadius: "20px",
            border: "2px solid #f5f5f5",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f5f5f5",
          },
        },
    
        // Sidebar Dark mode
        ".dark .sidebar-container": {
          scrollbarWidth: "thin",
          scrollbarColor: "#2C3E50 #34495E",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2C3E50",
            borderRadius: "20px",
            border: "2px solid #34495E",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#34495E",
          },
        },
      });
    }),
    
    
  ],
} satisfies Config;
