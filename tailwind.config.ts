import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './content/**/*.{js,ts,jsx,tsx,md,mdx}',
    // 若使用 app/ 或 src/ 目錄，也要加上
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // 移除表格的預設樣式限制
            table: {
              width: '100%',
              'table-layout': 'auto',
            },
            th: {
                height: 'auto',
                padding: '0.5rem',
            },
            td: {
                height: 'auto',
                padding: '0.5rem',
            },
            // 移除最大寬度限制
              maxWidth: 'none',
            // 繁體中文字體堆疊
            fontFamily: [
              'Noto Sans TC', 
              'PingFang TC', 
              'Microsoft JhengHei',
              'sans-serif'
            ].join(','),
            // 增加行高，使繁體中文更易閱讀
            lineHeight: '1.8',
            // 段落樣式優化
            'p, li': {
              letterSpacing: '0.01em', // 輕微增加字距
              fontWeight: '400',
            },
            // 標題樣式優化
            'h1, h2, h3, h4': {
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            // 更好的手機顯示效果
            fontSize: {
              base: '16px',
              lg: '18px',
              xl: '20px',
            },
            // 優化引用塊樣式
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '4px',
              borderLeftColor: 'rgba(142, 142, 160, 0.4)',
              fontWeight: '400',
            },
          },
        },
        // 深色模式特別調整
        dark: {
          css: {
            color: '#E9E9E9',
            'h1, h2, h3, h4': {
              color: '#FFFFFF',
            },
            blockquote: {
              borderLeftColor: 'rgba(142, 142, 160, 0.6)',
              color: '#D1D1D1',
            },
            'a, strong': {
              color: '#FFFFFF',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}

export default config
