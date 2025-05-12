# MDX 局部組件解決方案

## 問題

在 Next.js 15 和 MDX 整合中，我們遇到了以下挑戰：

1. **局部導入問題**：MDX 文件中使用 `import` 語句導入同目錄下的組件時遇到了解析問題
2. **組件渲染失敗**：頁面顯示「載入中...」，表示 MDX 內容沒有成功序列化或渲染
3. **開發體驗不佳**：希望每篇文章可以有自己的獨特組件，但標準方法不適用

## 可能的解決方案

### 方案 1：內聯 JSX（即時修復）

最簡單的方法是直接在 MDX 文件中使用內聯 JSX，而不是引用外部組件。

**示例**：
```mdx
## 版本比較

<div className="my-8">
  <div className="overflow-x-auto rounded-lg shadow">
    <table className="min-w-full">
      <thead>
        <tr>
          <th>功能</th>
          <th>舊版</th>
          <th>新版</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>特性 A</td>
          <td>基本</td>
          <td>增強</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

**優點**：
- 立即可用，不需要複雜配置
- 與 MDX 完全兼容
- 不依賴外部文件

**缺點**：
- 無法重用組件邏輯
- 對於複雜組件，代碼會變得冗長
- 不能使用 React hooks 和狀態管理

### 方案 2：全局組件註冊

註冊全局可用的組件，並為每篇文章創建不同版本。

**步驟**：
1. 在 `components/mdx/` 目錄下建立文章專屬組件，如 `NextjsVersionTable.tsx`, `ReactHooksTable.tsx` 等
2. 在 `MDXComponents.tsx` 文件中全局註冊這些組件
3. 在 MDX 文件中直接使用組件名稱，不需要導入

**優點**：
- 不需要在 MDX 中使用 import
- 組件可以使用完整的 React 功能
- 較好的代碼組織

**缺點**：
- 需要為每篇文章創建全局命名的組件
- 可能會導致命名沖突
- 組件管理較複雜

### 方案 3：自定義 MDX 加載器（最佳長期解決方案）

通過自定義 MDX 加載器和編譯配置來支持局部導入。

**步驟**：
1. 修改 Next.js 配置以自定義 MDX 加載方式
2. 實現自定義 webpack 加載器或使用更高級的 MDX 集成
3. 設置正確的模塊解析規則

**優點**：
- 完整支持 MDX 的所有功能
- 真正的組件化和模塊化
- 最佳開發體驗

**缺點**：
- 配置較複雜
- 可能需要深入了解 webpack 和 Next.js 的構建系統
- 升級 Next.js 版本時可能需要重新配置

## 推薦的即時解決方案

目前，我們建議使用**方案 1：內聯 JSX**作為即時修復，這是最簡單且保證工作的方法。我們已經將 `<VersionComparisonTable />` 轉換為內聯 JSX 表格，這樣可以確保內容正確顯示，同時保持良好的用戶體驗。

## 長期改進計劃

為了長期解決這個問題，我們建議：

1. 研究並實現**方案 3：自定義 MDX 加載器**
2. 參考 [MDX 官方文檔](https://mdxjs.com/guides/nextjs/) 中關於 Next.js 整合的最新指南
3. 考慮使用 [Contentlayer](https://contentlayer.dev/) 或類似工具來管理 MDX 內容和組件
4. 創建一個專門的 MDX 組件庫，可以根據需要按需導入

## 其他建議

如果您有大量需要自定義的內容，考慮以下替代方法：

1. **使用 CMS**：如 TinaCMS、Sanity 等，它們提供更結構化的內容管理
2. **採用其他文檔框架**：如 Docusaurus、Nextra 等專門為文檔和博客設計的框架
3. **開發自定義編輯器**：針對您特定需求的富文本編輯和渲染系統

## 參考資源

- [Next.js MDX 文檔](https://nextjs.org/docs/advanced-features/using-mdx)
- [MDX 官方網站](https://mdxjs.com/)
- [next-mdx-remote 庫](https://github.com/hashicorp/next-mdx-remote)
- [Contentlayer](https://contentlayer.dev/)
