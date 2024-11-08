import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBg: "#d9e2e7", // 自定义背景颜色
        customFg: "#97cbe5", // 自定义主题颜色1
        customFg2: "#4798c7", // 自定义主题颜色2
        customFg3: "#538bb5", // 自定义主题颜色3
        customFg4: "#afc9db", // 自定义主题颜色4
        // 你可以添加更多自定义颜色
      },
      fontFamily: {
        custom: ["Consolas", "sans-serif"], // 'YourCustomFont' 是你定义的字体名称
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "shimmer-slide":
          "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
      },
      keyframes: {
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
