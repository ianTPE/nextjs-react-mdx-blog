# 貢獻指南

感謝您有興趣為本項目做出貢獻！在開始之前，請花幾分鐘閱讀本指南。

## 開發規範

### 1. 響應式設計

#### 斷點與佈局
- **移動優先**：所有樣式從移動端開始，逐步增強
- **斷點策略**：
  - `sm`: 640px
  - `md`: 768px  
  - `lg`: 1024px
  - `xl`: 1280px
- **觸摸優化**：確保交互元素最小 44×44px

#### 圖表優化
- 移動端最小字體 14px
- 使用 Tailwind 響應式前綴（`sm:`, `md:`, `lg:`）
- 必要時減少數據點
- 部署前必須在手機視圖測試

### 2. 組件結構

#### 文件組織
- `/components` 目錄下按功能模塊劃分子目錄
- 組件文件使用 PascalCase 命名（如 `MyChart.jsx`）
- 每個組件保持單一職責

#### 命名規範
- 使用清晰描述性的名稱
- 高階組件使用 `with` 前綴（如 `withAuth`）
- 容器組件使用 `Container` 後綴

### 3. 代碼風格

#### JavaScript/TypeScript
- 使用 ES6+ 特性（箭頭函數、解構等）
- 函數組件 + Hooks
- 新組件使用 TypeScript
- 為所有組件定義 PropTypes 或 TypeScript 接口

#### 樣式
- 優先使用 Tailwind CSS
- 複雜樣式使用 CSS Modules（`.module.css`）
- 遵循 BEM 命名規範
- 保持樣式作用域局部化

### 4. 性能優化

#### 圖片
- 使用 Next.js `Image` 組件
- 必須指定 `width` 和 `height`
- 使用現代圖片格式（WebP/AVIF）
- 實現懶加載：`loading="lazy"`

#### 代碼分割
- 路由級代碼分割：`React.lazy()`
- 組件級代碼分割：`next/dynamic`
- 按需加載重型組件

### 5. 可訪問性

#### 語義化 HTML
- 使用合適的 HTML5 語義標籤
- 確保正確的標題層級（h1 > h2 > h3）
- 所有圖片必須有 `alt` 屬性
- 必要時使用 ARIA 標籤

#### 鍵盤導航
- 確保所有交互元素可通過鍵盤訪問
- 實現可見的焦點狀態
- 測試 Tab 鍵導航順序

### 6. 文檔與示例

#### 組件文檔
- 使用 TypeScript 接口或 PropTypes 文檔化組件屬性
- 在 Storybook 或 MDX 中包含使用示例
- 記錄已知限制和注意事項

#### 項目文檔
- 保持 `README.md` 更新
- 在 `.env.example` 中記錄環境變量
- 提供新手上手指南

### 7. Git 工作流

#### 分支策略
- `main`: 生產環境代碼
- `develop`: 開發主分支
- `feature/*`: 新功能開發
- `bugfix/*`: 問題修復
- `hotfix/*`: 緊急修復

#### 提交信息
- 使用 [Conventional Commits](https://www.conventionalcommits.org/) 規範
- 類型：`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- 範圍（可選）：`(button)`, `(api)`, `(docs)`
- 描述：簡明扼要，使用現在時

### 8. 測試

#### 單元測試
- 為所有工具函數編寫測試
- 測試組件渲染和交互
- 目標測試覆蓋率 ≥ 80%

#### 端到端測試
- 測試關鍵用戶流程
- 包含移動端和桌面端測試用例
- 在 CI 中運行

### 9. 代碼審查

#### PR 模板
```markdown
## 變更描述

## 測試步驟
- [ ] 在桌面端測試
- [ ] 在移動端測試
- [ ] 測試可訪問性
- [ ] 檢查性能影響

## 截圖/錄屏（如適用）

## 其他說明
```

### 10. 安全與合規

#### 依賴管理
- 定期更新依賴
- 使用 `npm audit` 檢查漏洞
- 敏感信息使用環境變量

#### 輸入驗證
- 驗證所有用戶輸入
- 防範 XSS、CSRF 等攻擊
- 實現適當的身份驗證和授權

### 11. 性能預算與監控

#### 性能預算
- 打包大小 ≤ 200 KB（gzip）
- LCP < 2.5 秒
- TTI < 5 秒（3G 網絡）

#### 監控
- 實現錯誤跟蹤（Sentry）
- 監控關鍵性能指標
- 設置性能預算告警

## 開發環境設置

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建生產版本
npm run build

# 啟動生產服務器
npm start

# 運行測試
npm test

# 運行 ESLint
npm run lint

# 運行 Storybook
npm run storybook
```

## 貢獻流程

1. Fork 倉庫
2. 創建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 許可證

[MIT](LICENSE)
