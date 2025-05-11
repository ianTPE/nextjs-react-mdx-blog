import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    // 若使用 app/ 或 src/ 目錄，也要加上
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
